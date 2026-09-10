"use client";

import {
  getWhiteboardSession,
  type WhiteboardSessionCredentials,
} from "@/features/lessons/api/get-whiteboard-session";

import {
  createFastboard,
  Fastboard,
  type FastboardApp,
  type RoomPhase,
} from "@netless/fastboard-react";

import { AlertCircle, LoaderCircle, PenTool, RefreshCw, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";

type CollaborativeWhiteboardProps = {
  lessonID: string | number;
  participantName: string;
  onClose: () => void;
};

/* =========================================================
   WHITEBOARD ROOM
========================================================= */

function WhiteboardCanvas({
  app,
  onMount,
}: {
  app: FastboardApp;
  onMount: (app: FastboardApp) => void;
}) {
  useEffect(() => onMount(app), [app, onMount]);

  return <Fastboard app={app} />;
}

function WhiteboardRoom({
  credentials,
  participantName,
  onError,
}: {
  credentials: WhiteboardSessionCredentials;
  participantName: string;
  onError: (message: string) => void;
}) {
  const [app, setApp] = useState<FastboardApp | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isContainerReady, setIsContainerReady] = useState(false);
  const [phase, setPhase] = useState<RoomPhase>("connecting");
  const [hasConnected, setHasConnected] = useState(false);
  const [mountedApp, setMountedApp] = useState<FastboardApp | null>(null);
  const shutdownRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let disposed = false;
    let joinedApp: FastboardApp | null = null;
    let unsubscribe: (() => void) | undefined;

    const reportError = (message: string) => {
      if (!disposed) onError(message);
    };

    const destroyApp = async (board: FastboardApp) => {
      try {
        await board.destroy();
      } catch {
        // Closing a disconnected room must not create an unhandled rejection.
        console.warn("Whiteboard connection could not be cleanly closed.");
      }
    };

    setApp(null);
    setPhase("connecting");
    setHasConnected(false);
    setMountedApp(null);

    const joinTimeout = window.setTimeout(() => {
      reportError("Whiteboard connection timed out. Please try again.");
    }, 30_000);

    // Defer the join until after React's StrictMode effect cleanup. The SDK's
    // useFastboard hook neither catches join failures nor reliably cleans up
    // rooms when a whiteboard is closed before joining finishes.
    const previousShutdown = shutdownRef.current;
    const joinTask = Promise.resolve().then(async () => {
      await previousShutdown;
      if (disposed) return;

      try {
        const board = await createFastboard({
          sdkConfig: {
            appIdentifier: credentials.appIdentifier,
            region: credentials.region,
            loggerOptions: { localLog: { enabled: false } },
          },
          joinRoom: {
            uid: credentials.uid,
            uuid: credentials.roomUUID,
            roomToken: credentials.roomToken,
            userPayload: { nickName: participantName },
            isWritable: credentials.writable,
            disableDeviceInputs: false,
            callbacks: {
              onDisconnectWithError: () => {
                reportError(
                  "The whiteboard connection was lost. Please retry."
                );
              },
              onKickedWithReason: () => {
                reportError(
                  "This whiteboard connection was closed. Please retry."
                );
              },
            },
          },
          managerConfig: { cursor: true },
        });

        window.clearTimeout(joinTimeout);

        if (disposed) {
          await destroyApp(board);
          return;
        }

        joinedApp = board;
        unsubscribe = board.phase.subscribe((nextPhase) => {
          if (disposed) return;
          setPhase(nextPhase);
          if (nextPhase === "connected") setHasConnected(true);
          if (nextPhase === "disconnected") {
            reportError("The whiteboard connection was closed. Please retry.");
          }
        });
        setApp(board);
      } catch {
        window.clearTimeout(joinTimeout);
        reportError("Unable to join the whiteboard. Please retry.");
      }
    });

    return () => {
      disposed = true;
      window.clearTimeout(joinTimeout);
      unsubscribe?.();
      shutdownRef.current = joinedApp ? destroyApp(joinedApp) : joinTask;
    };
  }, [credentials, participantName, onError]);

  useEffect(() => {
    if (!wrapRef.current) return;

    const el = wrapRef.current;
    let rafId = 0;
    let disposed = false;

    const checkDimensions = () => {
      window.cancelAnimationFrame(rafId);
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        rafId = window.requestAnimationFrame(() => {
          if (!disposed) setIsContainerReady(true);
        });
      }
    };

    const observer = new ResizeObserver(checkDimensions);
    observer.observe(el);

    // Kick off an immediate check in case the element already has dimensions.
    checkDimensions();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      !app ||
      !isContainerReady ||
      phase !== "connected" ||
      !wrapRef.current
    ) {
      return;
    }

    let disposed = false;
    let frame = 0;

    const refreshBoardSize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!disposed && app.phase.value === "connected") {
          app.room.refreshViewSize();
        }
      });
    };

    // The room can still become read-only if the server overrides the join
    // preference. Ask the SDK for write access again and surface a real error
    // instead of leaving apparently clickable but ineffective tools onscreen.
    void (async () => {
      try {
        if (credentials.writable && !app.room.isWritable) {
          await app.room.setWritable(true);
        }
        if (!disposed) refreshBoardSize();
      } catch {
        if (!disposed) {
          onError(
            "This whiteboard session is read-only. Please refresh the lesson or ask the server administrator to issue a writable room token."
          );
        }
      }
    })();

    const resizeObserver = new ResizeObserver(refreshBoardSize);
    resizeObserver.observe(wrapRef.current);
    const refreshTimer = window.setTimeout(refreshBoardSize, 250);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.clearTimeout(refreshTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [app, credentials.writable, isContainerReady, phase, onError]);

  // Bind only while connected, then preserve the canvas during reconnection.
  // Recreating Fastboard at every phase change loses its mounted container.
  const showBoard = Boolean(
    app && isContainerReady && (phase === "connected" || mountedApp === app)
  );

  return (
    <div ref={wrapRef} className="relative flex h-full min-h-0 w-full flex-col">
      {!credentials.writable && (
        <p
          role="status"
          className="shrink-0 bg-amber-50 px-3 py-2 text-xs text-amber-800"
        >
          This whiteboard is view-only. Editing access is required to use the
          tools.
        </p>
      )}
      <div className="relative min-h-0 flex-1">
        {showBoard && app && (
          <WhiteboardCanvas app={app} onMount={setMountedApp} />
        )}
        {(!showBoard || phase !== "connected") && (
          <div
            role="status"
            className="absolute inset-0 grid h-full w-full place-items-center bg-white/90 text-slate-500"
          >
            <div className="text-center">
              <LoaderCircle
                className="mx-auto animate-spin text-[#348edc]"
                size={24}
              />
              <p className="mt-2 text-sm font-medium">
                {hasConnected
                  ? "Reconnecting to whiteboard..."
                  : "Connecting to whiteboard..."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   COLLABORATIVE WHITEBOARD
========================================================= */

export function CollaborativeWhiteboard({
  lessonID,
  participantName,
  onClose,
}: CollaborativeWhiteboardProps) {
  const [attempt, setAttempt] = useState(0);

  const [credentials, setCredentials] =
    useState<WhiteboardSessionCredentials | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;

    setCredentials(null);
    setError(null);

    void getWhiteboardSession(lessonID)
      .then((session) => {
        if (disposed) return;

        setCredentials(session);
      })
      .catch((requestError: unknown) => {
        if (disposed) return;

        console.error("Get whiteboard session error:", requestError);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Whiteboard is not available yet."
        );
      });

    return () => {
      disposed = true;
    };
  }, [attempt, lessonID]);

  return (
    <div
      className="
        absolute
        inset-0
        z-[9999]
        flex
        flex-col
        overflow-hidden
        bg-white
        text-slate-900
      "
      style={{
        pointerEvents: "auto",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          h-12
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-3
          shadow-sm
          sm:h-14
          sm:px-5
        "
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="
              grid
              h-8
              w-8
              shrink-0
              place-items-center
              rounded-lg
              bg-blue-50
              text-[#348edc]
            "
          >
            <PenTool size={16} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold sm:text-sm">
              Collaborative Whiteboard
            </p>

            <p className="hidden text-[10px] text-slate-400 sm:block">
              Changes sync live for teacher and student
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close whiteboard"
          className="
            grid
            h-8
            w-8
            place-items-center
            rounded-lg
            border
            border-slate-200
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          <X size={17} />
        </button>
      </div>

      {/* =====================================================
          WHITEBOARD AREA
      ===================================================== */}

      <div
        className="
          relative
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        {error ? (
          /* =================================================
             ERROR STATE
          ================================================= */

          <div className="grid h-full place-items-center bg-slate-50 p-6 text-center">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-50 text-amber-600">
                <AlertCircle size={23} />
              </span>

              <h2 className="mt-4 text-base font-semibold">
                Whiteboard is unavailable
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                {error}
              </p>

              <div className="mt-5 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setAttempt((current) => current + 1)}
                  className="
                    inline-flex
                    h-9
                    items-center
                    gap-2
                    rounded-lg
                    bg-[#348edc]
                    px-4
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#247bc4]
                  "
                >
                  <RefreshCw size={14} />
                  Retry
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    h-9
                    rounded-lg
                    border
                    border-slate-200
                    px-4
                    text-xs
                    font-semibold
                    text-slate-600
                    transition
                    hover:bg-slate-50
                  "
                >
                  Back to video
                </button>
              </div>
            </div>
          </div>
        ) : credentials ? (
          /* =================================================
             FASTBOARD
          ================================================= */

          <WhiteboardRoom
            key={`${lessonID}:${attempt}`}
            credentials={credentials}
            participantName={participantName}
            onError={setError}
          />
        ) : (
          /* =================================================
             LOADING
          ================================================= */

          <div className="grid h-full place-items-center bg-slate-50 text-slate-500">
            <div className="text-center">
              <LoaderCircle
                className="mx-auto animate-spin text-[#348edc]"
                size={28}
              />

              <p className="mt-3 text-sm font-medium">
                Preparing whiteboard...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
