import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { StrictMode, useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CollaborativeWhiteboard } from "./collaborative-whiteboard";

const { getSession, createBoard, canvasMounted, canvasUnmounted } = vi.hoisted(
  () => ({
    getSession: vi.fn(),
    createBoard: vi.fn(),
    canvasMounted: vi.fn(),
    canvasUnmounted: vi.fn(),
  })
);

vi.mock("@/features/lessons/api/get-whiteboard-session", () => ({
  getWhiteboardSession: getSession,
}));

vi.mock("@netless/fastboard-react", () => ({
  createFastboard: createBoard,
  Fastboard: function MockFastboard() {
    useEffect(() => {
      canvasMounted();
      return () => canvasUnmounted();
    }, []);
    return <div data-testid="whiteboard-canvas">Whiteboard tools</div>;
  },
}));

const credentials = {
  appIdentifier: "test-app",
  region: "in-mum",
  roomUUID: "test-room",
  roomToken: "test-token",
  uid: "teacher-1",
  writable: true,
};

function makeBoard(initialPhase = "connected", isWritable = true) {
  const listeners = new Set<(phase: string) => void>();
  const board = {
    phase: {
      value: initialPhase,
      subscribe: vi.fn((listener: (phase: string) => void) => {
        listeners.add(listener);
        listener(board.phase.value);
        return () => listeners.delete(listener);
      }),
    },
    room: {
      isWritable,
      setWritable: vi.fn().mockResolvedValue(undefined),
      refreshViewSize: vi.fn(),
    },
    destroy: vi.fn().mockResolvedValue(undefined),
    changePhase(phase: string) {
      board.phase.value = phase;
      for (const listener of listeners) listener(phase);
    },
  };
  return board;
}

function showWhiteboard(
  overrides: {
    isLocked?: boolean;
    isTeacher?: boolean;
    isOpener?: boolean;
    onLockChange?: (locked: boolean) => void;
  } = {}
) {
  return render(
    <CollaborativeWhiteboard
      lessonID="lesson-1"
      participantName={overrides.isTeacher ? "Teacher" : "Student"}
      isLocked={overrides.isLocked ?? false}
      isTeacher={overrides.isTeacher ?? false}
      isOpener={overrides.isOpener ?? true}
      onLockChange={overrides.onLockChange ?? vi.fn()}
      onClose={vi.fn()}
    />
  );
}

let width = 800;
let height = 400;
let resizeCallbacks: Set<() => void>;

beforeEach(() => {
  vi.clearAllMocks();
  width = 800;
  height = 400;
  resizeCallbacks = new Set();
  getSession.mockResolvedValue(credentials);

  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    () => ({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })
  );
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(performance.now()), 0)
  );
  vi.stubGlobal("cancelAnimationFrame", (id: number) =>
    window.clearTimeout(id)
  );
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(private callback: () => void) {}
      observe() {
        resizeCallbacks.add(this.callback);
      }
      disconnect() {
        resizeCallbacks.delete(this.callback);
      }
    }
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CollaborativeWhiteboard", () => {
  it("shows a retryable error when the SDK rejects the join", async () => {
    const board = makeBoard();
    createBoard
      .mockRejectedValueOnce(new Error("invalid token"))
      .mockResolvedValueOnce(board);

    showWhiteboard();
    expect(
      await screen.findByText("Unable to join the whiteboard. Please retry.")
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));

    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
    expect(getSession).toHaveBeenCalledTimes(2);
    expect(createBoard).toHaveBeenCalledTimes(2);
  });

  it("disconnects a room that finishes joining after the board has closed", async () => {
    const board = makeBoard();
    let resolveJoin!: (value: typeof board) => void;
    createBoard.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveJoin = resolve;
      })
    );

    const view = showWhiteboard();
    await waitFor(() => expect(createBoard).toHaveBeenCalledTimes(1));
    view.unmount();
    await act(async () => resolveJoin(board));

    expect(board.destroy).toHaveBeenCalledTimes(1);
    expect(canvasMounted).not.toHaveBeenCalled();
  });

  it("creates one connection and cleans it up under React StrictMode", async () => {
    const board = makeBoard();
    createBoard.mockResolvedValue(board);
    const view = render(
      <StrictMode>
        <CollaborativeWhiteboard
          lessonID="lesson-1"
          participantName="Teacher"
          isLocked={false}
          isTeacher={false}
          isOpener={true}
          onLockChange={vi.fn()}
          onClose={vi.fn()}
        />
      </StrictMode>
    );

    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
    expect(createBoard).toHaveBeenCalledTimes(1);
    view.unmount();
    expect(board.destroy).toHaveBeenCalledTimes(1);
  });

  it("preserves the canvas while reconnecting and refreshes it after reconnection", async () => {
    const board = makeBoard();
    createBoard.mockResolvedValue(board);
    showWhiteboard();
    const canvas = await screen.findByTestId("whiteboard-canvas");
    await waitFor(() => expect(board.room.refreshViewSize).toHaveBeenCalled());

    act(() => board.changePhase("reconnecting"));
    expect(screen.getByText("Reconnecting to whiteboard...")).toBeTruthy();
    expect(screen.getByTestId("whiteboard-canvas")).toBe(canvas);
    expect(canvasUnmounted).not.toHaveBeenCalled();

    board.room.refreshViewSize.mockClear();
    act(() => board.changePhase("connected"));
    await waitFor(() => expect(board.room.refreshViewSize).toHaveBeenCalled());
    expect(screen.queryByText("Reconnecting to whiteboard...")).toBeNull();
    expect(canvasMounted).toHaveBeenCalledTimes(1);
  });

  it("waits for dimensions and a connected room before binding the canvas", async () => {
    const board = makeBoard();
    width = 0;
    height = 0;
    createBoard.mockResolvedValue(board);
    showWhiteboard();
    await waitFor(() => expect(board.phase.subscribe).toHaveBeenCalled());
    expect(screen.queryByTestId("whiteboard-canvas")).toBeNull();

    act(() => board.changePhase("reconnecting"));
    width = 800;
    height = 300;
    await act(async () => {
      for (const callback of resizeCallbacks) callback();
      await new Promise((resolve) => window.setTimeout(resolve, 10));
    });
    expect(screen.queryByTestId("whiteboard-canvas")).toBeNull();

    act(() => board.changePhase("connected"));
    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
  });

  it("honors explicit view-only access without requesting write access", async () => {
    const board = makeBoard("connected", false);
    getSession.mockResolvedValue({ ...credentials, writable: false });
    createBoard.mockResolvedValue(board);
    showWhiteboard();

    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
    expect(screen.getByText(/This whiteboard is view-only/)).toBeTruthy();
    expect(createBoard.mock.calls[0][0].joinRoom.isWritable).toBe(false);
    expect(board.room.setWritable).not.toHaveBeenCalled();
  });

  it("surfaces denied editing access instead of leaving ineffective tools", async () => {
    const board = makeBoard("connected", false);
    board.room.setWritable.mockRejectedValue(new Error("permission denied"));
    createBoard.mockResolvedValue(board);
    showWhiteboard();

    expect(
      await screen.findByText(/This whiteboard session is read-only/)
    ).toBeTruthy();
    expect(board.room.setWritable).toHaveBeenCalledWith(true);
    expect(board.destroy).toHaveBeenCalledTimes(1);
  });

  it("lets the teacher lock the whiteboard so the student can only view", async () => {
    const board = makeBoard();
    createBoard.mockResolvedValue(board);
    const onLockChange = vi.fn();
    showWhiteboard({ isTeacher: true, onLockChange });

    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
    expect(
      screen.getByRole("button", {
        name: "Lock whiteboard so the student can only view",
      })
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Lock whiteboard so the student can only view",
      })
    );
    expect(onLockChange).toHaveBeenCalledWith(true);
  });

  it("hides the lock control from a student", async () => {
    createBoard.mockResolvedValue(makeBoard());
    showWhiteboard({ isTeacher: false });

    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /Lock whiteboard/ })
    ).toBeNull();
  });

  it("makes a locked student view-only and shows the lock status", async () => {
    const board = makeBoard();
    createBoard.mockResolvedValue(board);
    showWhiteboard({ isLocked: true, isTeacher: false });

    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
    expect(screen.getByText(/The teacher locked the whiteboard/)).toBeTruthy();
    expect(screen.getByText(/Whiteboard locked — view only/)).toBeTruthy();
    await waitFor(() =>
      expect(board.room.setWritable).toHaveBeenCalledWith(false)
    );
  });

  it("keeps the teacher writable while the board is locked", async () => {
    const board = makeBoard();
    createBoard.mockResolvedValue(board);
    showWhiteboard({ isLocked: true, isTeacher: true });

    expect(await screen.findByTestId("whiteboard-canvas")).toBeTruthy();
    expect(screen.getByText(/Whiteboard locked for the student/)).toBeTruthy();
    expect(screen.queryByText(/Whiteboard locked — view only/)).toBeNull();
    await waitFor(() => expect(board.room.refreshViewSize).toHaveBeenCalled());
    expect(board.room.setWritable).not.toHaveBeenCalledWith(false);
  });

  it("offers retry and releases the room after a terminal disconnect", async () => {
    const board = makeBoard();
    createBoard.mockResolvedValue(board);
    showWhiteboard();
    await screen.findByTestId("whiteboard-canvas");

    act(() => board.changePhase("disconnected"));

    expect(
      await screen.findByText(
        "The whiteboard connection was closed. Please retry."
      )
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Retry" })).toBeTruthy();
    expect(board.destroy).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("whiteboard-canvas")).toBeNull();
  });
});
