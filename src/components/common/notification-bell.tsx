"use client";

import {
  getStudentUnreadCount,
  markAllStudentNotificationsRead,
  type StudentNotification,
} from "@/features/user/api/get-notifications";
import { paths } from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";

const NOTIFICATION_REFETCH_INTERVAL = 15_000;

export function NotificationBell() {
  const queryClient = useQueryClient();

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["student-notifications-unread-count"],
    queryFn: () => getStudentUnreadCount().catch(() => 0),
    staleTime: 0,
    refetchInterval: NOTIFICATION_REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });

  const { mutate: markRead, isPending: isMarkingRead } = useMutation({
    mutationFn: markAllStudentNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-notifications-unread-count"],
      });
    },
  });

  function handleBellClick() {
    if (unreadCount > 0) {
      queryClient.setQueryData(["student-notifications-unread-count"], 0);
      queryClient.setQueriesData<StudentNotification[]>(
        { queryKey: ["student-notifications"] },
        (current) => current?.map((n) => ({ ...n, unread: false }))
      );
      markRead();
    }
  }

  return (
    <Link
      href={paths.studentNotifications()}
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
      className="relative mr-2 inline-grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#505050] transition hover:bg-[#f0f0f0] hover:text-[#53A2EB]"
      onClick={handleBellClick}
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
