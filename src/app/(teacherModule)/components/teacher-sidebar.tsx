"use client";

import { RevisionBee } from "@/assets/icons";
import { logout } from "@/features/auth/actions/logout";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import {
  BookOpenCheck,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const navigation = [
  { label: "Dashboard", href: paths.teacherDashboard(), icon: LayoutDashboard },
  { label: "Students", href: "/teacher/students", icon: UsersRound },
  { label: "Bookings", href: "/teacher/bookings", icon: CalendarDays },
  {
    label: "Earnings & Payments",
    href: "/teacher/earnings",
    icon: WalletCards,
  },
  { label: "My Profile", href: "/teacher/profile", icon: UserRound },
  { label: "Settings", href: "/teacher/settings", icon: Settings },
] as const;

type TeacherSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
};

export function TeacherSidebar({
  isOpen = false,
  onClose,
  isCollapsed: controlledCollapsed,
  onToggleCollapse: controlledToggleCollapse,
}: TeacherSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isCollapsed = controlledCollapsed ?? internalCollapsed;
  const handleToggleCollapse =
    controlledToggleCollapse ?? (() => setInternalCollapsed((prev) => !prev));

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const result = await logout();

    if (!result.success) {
      toast.error(result.error);
      setIsLoggingOut(false);
      return;
    }

    router.replace(paths.home());
    router.refresh();
  }

  const renderSidebarNav = (collapsed: boolean) => (
    <nav
      className={cn(
        "flex h-[calc(100%-86px)] flex-col py-6 transition-all",
        collapsed ? "px-2" : "px-5"
      )}
    >
      <ul className="space-y-2">
        {navigation.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={label}>
              <Link
                href={href}
                onClick={onClose}
                title={collapsed ? label : undefined}
                className={cn(
                  "flex min-h-12 items-center rounded-lg text-sm font-medium text-[#30343a] transition hover:bg-[#edf6ff] hover:text-[#3994e7]",
                  collapsed
                    ? "mx-auto w-12 h-12 justify-center px-0"
                    : "gap-3 px-3.5 py-2.5",
                  isActive &&
                    "bg-[#53a2eb] text-white hover:bg-[#53a2eb] hover:text-white"
                )}
              >
                <Icon size={20} strokeWidth={1.8} className="shrink-0" />
                {!collapsed && (
                  <span className="min-w-0 flex-1 leading-tight">{label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-2 border-t border-[#edf0f3] pt-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          title={
            collapsed
              ? isLoggingOut
                ? "Logging Out..."
                : "Log Out"
              : undefined
          }
          className={cn(
            "flex h-12 items-center rounded-lg bg-[#fff0f0] text-sm font-medium text-[#ff3c45] transition hover:bg-[#ffe4e4] disabled:cursor-not-allowed disabled:opacity-60",
            collapsed
              ? "mx-auto w-12 justify-center px-0"
              : "w-full gap-3 px-3.5"
          )}
        >
          <LogOut size={20} strokeWidth={1.8} className="shrink-0" />
          {!collapsed && (
            <span className="truncate">
              {isLoggingOut ? "Logging Out..." : "Log Out"}
            </span>
          )}
        </button>
      </div>

      {!collapsed ? (
        <div className="mt-auto rounded-xl bg-[#f6faff] p-3 text-xs text-[#678]">
          <BookOpenCheck size={19} className="mb-2 text-[#53a2eb]" />
          Manage lessons and help students succeed.
        </div>
      ) : (
        <div
          title="Manage lessons and help students succeed."
          className="mt-auto flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-[#f6faff] text-[#53a2eb]"
        >
          <BookOpenCheck size={19} />
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on lg+, collapsible */}
      <aside
        className={cn(
          "hidden h-dvh shrink-0 border-r border-[#e5e8ec] bg-white transition-[width] duration-300 ease-in-out lg:block",
          isCollapsed ? "w-[76px]" : "w-[230px]"
        )}
      >
        <div
          className={cn(
            "flex h-[86px] items-center border-b border-[#edf0f3] transition-all",
            isCollapsed ? "justify-center px-2" : "justify-between px-5"
          )}
        >
          {!isCollapsed && (
            <Link
              href={paths.teacherDashboard()}
              aria-label="Revision Bee dashboard"
            >
              <RevisionBee width={44} height={54} />
            </Link>
          )}
          <button
            type="button"
            onClick={handleToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#333] transition hover:bg-[#edf6ff] hover:text-[#3994e7]"
          >
            <Menu size={21} />
          </button>
        </div>
        {renderSidebarNav(isCollapsed)}
      </aside>

      {/* Mobile overlay sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 flex h-dvh w-[230px] flex-col border-r border-[#e5e8ec] bg-white lg:hidden">
            <div className="flex h-[86px] items-center justify-between border-b border-[#edf0f3] px-5">
              <Link
                href={paths.teacherDashboard()}
                aria-label="Revision Bee dashboard"
                onClick={onClose}
              >
                <RevisionBee width={44} height={54} />
              </Link>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#333] transition hover:bg-[#f2f4f7]"
              >
                <X size={21} />
              </button>
            </div>
            {renderSidebarNav(false)}
          </aside>
        </>
      )}
    </>
  );
}
