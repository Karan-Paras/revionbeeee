"use client";

import { getStudentUnreadCount } from "@/features/user/api/get-notifications";
import { paths } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";

export function NotificationBell() {
  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["student-notifications-unread-count"],
    queryFn: getStudentUnreadCount,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });

  return (
    <Link
      href={paths.studentNotifications()}
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
      className="relative mr-2 rounded-full p-2 text-[#505050] transition hover:bg-[#f0f0f0] hover:text-[#53A2EB]"
    >
      <Bell size={20} strokeWidth={1.7} />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-white bg-[#ff3d4d] px-1 text-[10px] font-bold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
