"use client";

import type { StudentNotification } from "@/features/user/api/get-notifications";
import {
  getStudentNotifications,
  getStudentUnreadCount,
  markAllStudentNotificationsRead,
  markStudentNotificationsRead,
} from "@/features/user/api/get-notifications";
import { paths } from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bell,
  BellOff,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  Loader2,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PAGE_SIZE = 8;
const NOTIFICATION_REFETCH_INTERVAL = 10_000;

function notificationHref(notification: StudentNotification) {
  return `${paths.myLessons()}?tab=${notification.lessonTab}`;
}

function notificationIcon(type: StudentNotification["type"]) {
  switch (type) {
    case "payment":
      return { Icon: CircleDollarSign, cls: "bg-[#fff2e5] text-[#ff9b32]" };
    case "booking":
      return { Icon: UserRoundPlus, cls: "bg-[#eaf5ff] text-[#429bea]" };
    case "lesson":
      return { Icon: CalendarCheck2, cls: "bg-[#f1edff] text-[#8668ff]" };
    default:
      return { Icon: CheckCircle2, cls: "bg-[#e8faee] text-[#31c86b]" };
  }
}

export default function StudentNotificationsPage() {
  const queryClient = useQueryClient();

  const { mutate: markAllRead } = useMutation({
    mutationFn: markAllStudentNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-notifications-unread-count"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student-notifications"],
      });
    },
  });

  useEffect(() => {
    queryClient.setQueryData(["student-notifications-unread-count"], 0);
    queryClient.setQueriesData<StudentNotification[]>(
      { queryKey: ["student-notifications"] },
      (current) => current?.map((n) => ({ ...n, unread: false }))
    );
    markAllRead(undefined, {
      onError: () => {
        /* ignore mark-read API failure */
      },
    });
  }, [markAllRead, queryClient]);

  const {
    data: notifications = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["student-notifications"],
    queryFn: getStudentNotifications,
    staleTime: 0,
    refetchInterval: NOTIFICATION_REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["student-notifications-unread-count"],
    queryFn: getStudentUnreadCount,
    staleTime: 0,
    refetchInterval: NOTIFICATION_REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(notifications.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageItems = notifications.slice(pageStart, pageStart + PAGE_SIZE);

  const [readIds, setReadIds] = useState<Set<string | number>>(new Set());

  async function markRead(id: string | number) {
    if (readIds.has(id)) return;
    setReadIds((prev) => new Set(prev).add(id));
    try {
      await markStudentNotificationsRead([id]);
      queryClient.setQueriesData<number>(
        { queryKey: ["student-notifications-unread-count"] },
        (prev = 0) => Math.max(0, prev - 1)
      );
      queryClient.refetchQueries({
        queryKey: ["student-notifications-unread-count"],
      });
    } catch {
      setReadIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  //minor change is implemented
  function goToPage(page: number) {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }

  const pageNumbers: number[] = [];
  for (let page = 1; page <= totalPages; page++) {
    if (page === 1 || page === totalPages || Math.abs(page - safePage) <= 1) {
      pageNumbers.push(page);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] p-5 sm:p-8">
      <div className="mx-auto max-w-[950px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={paths.dashboard()}
              aria-label="Back to dashboard"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dce5ec] bg-white text-[#429bea] shadow-sm transition hover:border-[#429bea] hover:bg-[#edf6ff]"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#111]">Notifications</h1>
              <p className="mt-1 text-xs text-[#777] sm:text-sm">
                Stay updated with your lessons, requests, and more.
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <span className="rounded-full bg-[#eaf5ff] px-3 py-1.5 text-xs font-semibold text-[#429bea]">
              {unreadCount} New
            </span>
          )}
        </div>

        {/* Content */}
        <section className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#edf0f2] px-5 py-4">
            <Bell size={19} className="text-[#429bea]" />
            <h2 className="font-semibold text-[#222]">Recent Notifications</h2>
          </div>

          {/* Loading */}
          {isPending && (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#999]">
              <Loader2 size={18} className="animate-spin text-[#429bea]" />
              Loading notifications...
            </div>
          )}

          {/* Error */}
          {error && !isPending && (
            <div className="py-16 text-center text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Unable to load notifications."}
            </div>
          )}

          {/* Empty */}
          {!isPending && !error && notifications.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-[#999]">
              <BellOff size={36} strokeWidth={1.4} />
              <p className="text-sm">No notifications yet.</p>
            </div>
          )}

          {/* List */}
          {!isPending && notifications.length > 0 && (
            <div className="divide-y divide-[#edf0f2]">
              {pageItems.map((notification) => {
                const { Icon, cls } = notificationIcon(notification.type);
                const isUnread =
                  notification.unread && !readIds.has(notification.id);
                return (
                  <Link
                    key={notification.id}
                    href={notificationHref(notification)}
                    onClick={() => void markRead(notification.id)}
                    className={`relative flex gap-4 px-5 py-5 transition hover:bg-[#f9fbfd] ${
                      isUnread ? "bg-[#f7fbff]" : "bg-white"
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${cls}`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-sm font-semibold text-[#222]">
                          {notification.title}
                        </h3>
                        <div className="flex shrink-0 items-center gap-2">
                          <time className="text-[10px] text-[#999] sm:text-xs">
                            {notification.time}
                          </time>
                          {isUnread && (
                            <span
                              aria-label="Unread"
                              className="h-2 w-2 rounded-full bg-[#429bea]"
                            />
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-[#747b83] sm:text-sm">
                        {notification.message}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Pagination */}
        {!isPending && notifications.length > 0 && totalPages > 1 && (
          <div className="sticky bottom-0 z-10 mt-10 flex items-center justify-center gap-1.5 border-t border-[#edf0f2] bg-[#f5f6f8] py-5 shadow-[0_-4px_12px_-6px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => goToPage(safePage - 1)}
              className="rounded-lg border border-[#dce5ec] bg-white px-3 py-1.5 text-xs font-medium text-[#429bea] transition hover:bg-[#edf6ff] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            {pageNumbers.map((page, index) => {
              const isEllipsis =
                index > 0 && page !== pageNumbers[index - 1] + 1;
              return (
                <span key={page} className="flex items-center gap-1.5">
                  {isEllipsis && (
                    <span className="px-1 text-xs text-[#999]">…</span>
                  )}
                  <button
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-current={page === safePage ? "page" : undefined}
                    className={`min-w-8 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                      page === safePage
                        ? "bg-[#429bea] text-white"
                        : "border border-[#dce5ec] bg-white text-[#555] hover:bg-[#edf6ff]"
                    }`}
                  >
                    {page}
                  </button>
                </span>
              );
            })}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => goToPage(safePage + 1)}
              className="rounded-lg border border-[#dce5ec] bg-white px-3 py-1.5 text-xs font-medium text-[#429bea] transition hover:bg-[#edf6ff] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
