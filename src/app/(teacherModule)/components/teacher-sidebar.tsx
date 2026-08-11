"use client";

import { RevisionBee } from "@/assets/icons";
import { logoutTeacher } from "@/features/teacher/actions/logout";
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
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export function TeacherSidebar() {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const result = await logoutTeacher();

    if (!result.success) {
      toast.error(result.error);
      setIsLoggingOut(false);
      return;
    }

    await signOut({ redirectTo: paths.teacherLogin() });
  }

  return (
    <aside className="hidden h-dvh w-[230px] shrink-0 border-r border-[#e5e8ec] bg-white lg:block">
      <div className="flex h-[86px] items-center justify-between border-b border-[#edf0f3] px-5">
        <Link
          href={paths.teacherDashboard()}
          aria-label="Revision Bee dashboard"
        >
          <RevisionBee width={44} height={54} />
        </Link>
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="text-[#333]"
        >
          <Menu size={21} />
        </button>
      </div>

      <nav className="flex h-[calc(100%-86px)] flex-col px-5 py-6">
        <ul className="space-y-2">
          {navigation.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={cn(
                    "flex h-12 items-center gap-3 rounded-lg px-3.5 text-sm font-medium text-[#30343a] transition hover:bg-[#edf6ff] hover:text-[#3994e7]",
                    isActive &&
                      "bg-[#53a2eb] text-white hover:bg-[#53a2eb] hover:text-white"
                  )}
                >
                  <Icon size={20} strokeWidth={1.8} />
                  {label}
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
            className="flex h-12 w-full items-center gap-3 rounded-lg bg-[#fff0f0] px-3.5 text-sm font-medium text-[#ff3c45] transition hover:bg-[#ffe4e4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={20} strokeWidth={1.8} />
            {isLoggingOut ? "Logging Out..." : "Log Out"}
          </button>
        </div>

        <div className="mt-auto rounded-xl bg-[#f6faff] p-3 text-xs text-[#678]">
          <BookOpenCheck size={19} className="mb-2 text-[#53a2eb]" />
          Manage lessons and help students succeed.
        </div>
      </nav>
    </aside>
  );
}
