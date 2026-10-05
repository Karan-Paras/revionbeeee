import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TeacherSidebar } from "./teacher-sidebar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/teacher/dashboard",
  useRouter: () => ({
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/features/auth/actions/logout", () => ({
  logout: vi.fn().mockResolvedValue({ success: true }),
}));

function renderSidebar(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("TeacherSidebar", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders expanded desktop sidebar by default with logo and navigation labels", () => {
    renderSidebar(<TeacherSidebar />);

    const collapseButton = screen.getByRole("button", {
      name: /collapse sidebar/i,
    });
    expect(collapseButton).toBeDefined();

    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("Students")).toBeDefined();
    expect(screen.getByText("Bookings")).toBeDefined();
    expect(screen.getByText("Earnings & Payments")).toBeDefined();
    expect(screen.getByText("My Profile")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("toggles to collapsed state when the three-line button is clicked in uncontrolled mode", () => {
    renderSidebar(<TeacherSidebar />);

    const collapseButton = screen.getByRole("button", {
      name: /collapse sidebar/i,
    });
    fireEvent.click(collapseButton);

    const expandButton = screen.getByRole("button", {
      name: /expand sidebar/i,
    });
    expect(expandButton).toBeDefined();
    expect(expandButton.getAttribute("title")).toBe("Expand sidebar");

    expect(screen.queryByText("Students")).toBeNull();
    const studentsLink = screen.getByRole("link", { name: /students/i });
    expect(studentsLink.getAttribute("title")).toBe("Students");
  });

  it("calls onToggleCollapse when controlled prop is passed", () => {
    const onToggleCollapse = vi.fn();
    renderSidebar(
      <TeacherSidebar isCollapsed={false} onToggleCollapse={onToggleCollapse} />
    );

    const button = screen.getByRole("button", {
      name: /collapse sidebar/i,
    });
    fireEvent.click(button);

    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it("renders compact mode with title tooltips when isCollapsed is true", () => {
    renderSidebar(<TeacherSidebar isCollapsed={true} />);

    const expandButton = screen.getByRole("button", {
      name: /expand sidebar/i,
    });
    expect(expandButton).toBeDefined();

    expect(screen.queryByText("Dashboard")).toBeNull();
    expect(screen.queryByText("Bookings")).toBeNull();

    const bookingsLink = screen.getByRole("link", { name: /bookings/i });
    expect(bookingsLink.getAttribute("title")).toBe("Bookings");
  });
});
