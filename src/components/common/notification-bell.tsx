"use client";

import { useNotificationUnreadCount } from "@/hooks/use-notification-unread-count";
import { paths } from "@/routes";
import { Bell } from "lucide-react";
import Link from "next/link";

export function NotificationBell() {
  const { unreadCount, isMarkingRead, markAllRead } =
    useNotificationUnreadCount("student");

  return (
    <Link
      href={paths.studentNotifications()}
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
      className="relative mr-2 inline-grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#505050] transition hover:bg-[#f0f0f0] hover:text-[#53A2EB]"
      onClick={markAllRead}
    >
      <Bell
        size={20}
        strokeWidth={1.7}
        className={isMarkingRead ? "opacity-50" : ""}
      />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex h-[18px] min-w-[18px] translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full border border-white bg-[#ff3d4d] px-1 text-[10px] leading-none font-bold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
