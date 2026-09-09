"use client";

import {
  getMyBookings,
  type MyBooking,
  type MyBookingFilter,
} from "@/features/lessons/api/get-my-bookings";
import { joinLessonSession } from "@/features/lessons/api/join-session";
import { payForLesson } from "@/features/lessons/api/pay-for-lesson";
import {
  activeLessonSessionReadyEvent,
  activeLessonSessionStorageKey,
} from "@/features/lessons/components/active-lesson-session-guard";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const tabs: Array<{ label: string; value: MyBookingFilter }> = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending Approval", value: "pending" },
  { label: "Approved", value: "accepted" },
  { label: "Cancelled", value: "cancelled" },
];

const notificationTabs = ["accepted", "cancelled"] as const;
type NotificationTab = (typeof notificationTabs)[number];

const upcomingLessonsCacheKey = "revision-bee:student-upcoming-lessons";
const upcomingLessonCacheLifetime = 6 * 60 * 60 * 1000;

type CachedUpcomingLessons = {
  savedAt: number;
  lessons: MyBooking[];
};

function readCachedUpcomingLessons() {
  try {
    const value = JSON.parse(
      localStorage.getItem(upcomingLessonsCacheKey) ?? "null"
    ) as CachedUpcomingLessons | null;
    if (
      !value ||
      !Array.isArray(value.lessons) ||
      Date.now() - value.savedAt > upcomingLessonCacheLifetime
    ) {
      localStorage.removeItem(upcomingLessonsCacheKey);
      return [];
    }
    return value.lessons;
  } catch {
    return [];
  }
}

function saveCachedUpcomingLessons(lessons: MyBooking[]) {
  try {
    localStorage.setItem(
      upcomingLessonsCacheKey,
      JSON.stringify({ savedAt: Date.now(), lessons })
    );
  } catch {
    // A storage failure must not prevent the student from using the list.
  }
}

function seenBookingsKey(tab: NotificationTab) {
  return `revision-bee:seen-my-bookings:${tab}`;
}

function bookingIds(bookings: { id: string | number }[]) {
  return bookings.map((booking) => String(booking.id));
}

function parseUtcSessionDate(value: string) {
  const isoMatch = value.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    return {
      year: Number(isoMatch[1]),
      month: Number(isoMatch[2]),
      day: Number(isoMatch[3]),
    };
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return {
    year: parsed.getUTCFullYear(),
    month: parsed.getUTCMonth() + 1,
    day: parsed.getUTCDate(),
  };
}

function parseTimeToMinutes(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const meridiem = match[3]?.toLowerCase();
  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  return hours * 60 + Number(match[2]);
}

function canJoinLessonAtUtc(lesson: MyBooking, nowMs: number) {
  if (lesson.bookingType.trim().toLowerCase() === "instant") return true;

  const date = parseUtcSessionDate(lesson.sessionDate);
  const startMinutes = parseTimeToMinutes(lesson.sessionStartTime);
  if (!date || startMinutes === null) return false;

  const endMinutes =
    parseTimeToMinutes(lesson.sessionEndTime) ??
    startMinutes + (lesson.durationMinutes || 60);
  const startMs = Date.UTC(
    date.year,
    date.month - 1,
    date.day,
    Math.floor(startMinutes / 60),
    startMinutes % 60
  );
  const endMs = Date.UTC(
    date.year,
    date.month - 1,
    date.day + (endMinutes < startMinutes ? 1 : 0),
    Math.floor(endMinutes / 60),
    endMinutes % 60,
    59,
    999
  );

  return nowMs >= startMs && nowMs <= endMs;
}

function readSeenBookings(tab: NotificationTab) {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(seenBookingsKey(tab)) ?? "[]"
    );
    return new Set(Array.isArray(value) ? value.map(String) : []);
  } catch {
    return new Set<string>();
  }
}

export function MyLessonsList() {
  const [activeTab, setActiveTab] = useState<MyBookingFilter>("pending");
  const [query, setQuery] = useState("");
  const [nowUtc, setNowUtc] = useState(() => Date.now());
  const [cachedUpcomingLessons, setCachedUpcomingLessons] = useState<
    MyBooking[]
  >([]);
  const [hasNewBookings, setHasNewBookings] = useState<
    Record<NotificationTab, boolean>
  >({ accepted: false, cancelled: false });
  const approvedNotifications = useQuery({
    queryKey: ["my-booking-notifications", "accepted"],
    queryFn: () =>
      getMyBookings({ filter: "accepted", search: "", perPage: 100 }),
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: "always",
  });
  const cancelledNotifications = useQuery({
    queryKey: ["my-booking-notifications", "cancelled"],
    queryFn: () =>
      getMyBookings({ filter: "cancelled", search: "", perPage: 100 }),
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: "always",
  });
  const notificationBookings: Record<NotificationTab, MyBooking[]> = {
    accepted: approvedNotifications.data ?? [],
    cancelled: cancelledNotifications.data ?? [],
  };

  useEffect(() => {
    setCachedUpcomingLessons(readCachedUpcomingLessons());
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNowUtc(Date.now()), 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setHasNewBookings((current) => {
      const next = { ...current };
      const latestBookings: Record<NotificationTab, MyBooking[]> = {
        accepted: approvedNotifications.data ?? [],
        cancelled: cancelledNotifications.data ?? [],
      };

      notificationTabs.forEach((tab) => {
        const bookings = latestBookings[tab];
        if (!bookings.length) {
          next[tab] = false;
          return;
        }

        const seenIds = readSeenBookings(tab);
        next[tab] = bookings.some(
          (booking) => !seenIds.has(String(booking.id))
        );
      });

      return next;
    });
  }, [approvedNotifications.data, cancelledNotifications.data]);

  function changeTab(tab: MyBookingFilter) {
    setActiveTab(tab);

    if (tab !== "accepted" && tab !== "cancelled") return;

    localStorage.setItem(
      seenBookingsKey(tab),
      JSON.stringify(bookingIds(notificationBookings[tab]))
    );
    setHasNewBookings((current) => ({ ...current, [tab]: false }));
  }
  const payment = useMutation({
    mutationFn: payForLesson,
    onSuccess: ({ checkoutUrl }) => {
      window.location.assign(checkoutUrl);
    },
    onError: (error) => toast.error(error.message),
  });
  const joinSession = useMutation({
    mutationFn: joinLessonSession,
    onSuccess: (credentials) => {
      const storedSession = JSON.stringify({
        ...credentials,
        expiresAt: Date.now() + credentials.expiresIn * 1000,
        sessionRole: "student",
      });

      try {
        sessionStorage.setItem(activeLessonSessionStorageKey, storedSession);
        if (
          sessionStorage.getItem(activeLessonSessionStorageKey) !==
          storedSession
        ) {
          throw new Error("Session storage verification failed.");
        }
      } catch {
        toast.error(
          "The call details could not be saved. Enable browser storage and try again."
        );
        return;
      }

      setCachedUpcomingLessons((current) => {
        const next = current.filter(
          (lesson) =>
            String(lesson.paymentLessonID) !== String(credentials.lessonID)
        );
        saveCachedUpcomingLessons(next);
        return next;
      });

      window.dispatchEvent(new Event(activeLessonSessionReadyEvent));
      const navigationFallback = window.setTimeout(() => {
        if (window.location.pathname !== "/session") {
          window.location.replace("/session");
        }
      }, 1_200);

      try {
        window.location.assign("/session");
      } catch {
        window.clearTimeout(navigationFallback);
        window.location.replace("/session");
      }
    },
    onError: (error) => toast.error(error.message),
  });
  const {
    data: fetchedLessons = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["my-bookings", activeTab, query.trim()],
    queryFn: () =>
      getMyBookings({
        filter: activeTab,
        search: query.trim(),
        perPage: 8,
      }),
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
  });

  useEffect(() => {
    if (activeTab !== "upcoming" || query.trim() || !fetchedLessons.length) {
      return;
    }

    setCachedUpcomingLessons((current) => {
      const merged = new Map(
        current.map((lesson) => [String(lesson.paymentLessonID), lesson])
      );
      fetchedLessons.forEach((lesson) => {
        merged.set(String(lesson.paymentLessonID), lesson);
      });
      const next = Array.from(merged.values());
      saveCachedUpcomingLessons(next);
      return next;
    });
  }, [activeTab, fetchedLessons, query]);

  const cancelledLessonIds = new Set(
    (cancelledNotifications.data ?? []).map((lesson) =>
      String(lesson.paymentLessonID)
    )
  );
  const fetchedLessonIds = new Set(
    fetchedLessons.map((lesson) => String(lesson.paymentLessonID))
  );
  const retainedUpcomingLessons = cachedUpcomingLessons.filter(
    (lesson) =>
      !fetchedLessonIds.has(String(lesson.paymentLessonID)) &&
      !cancelledLessonIds.has(String(lesson.paymentLessonID))
  );
  const lessons =
    activeTab === "upcoming" && !query.trim()
      ? [...fetchedLessons, ...retainedUpcomingLessons]
      : fetchedLessons;

  return (
    <section className="min-h-[500px] bg-white px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full rounded-lg bg-[#f0f0f0] p-1 sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => changeTab(tab.value)}
                className={`relative flex-1 rounded-md px-5 py-2 text-[11px] transition sm:flex-none ${activeTab === tab.value ? "bg-white font-semibold text-[#111] shadow-sm" : "text-[#929292]"}`}
              >
                {tab.label}
                {(tab.value === "accepted" || tab.value === "cancelled") &&
                  hasNewBookings[tab.value] && (
                    <span
                      aria-label={`New ${tab.label.toLowerCase()} request`}
                      className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-[#ff3547] ring-2 ring-white"
                    />
                  )}
              </button>
            ))}
          </div>

          <label className="flex h-10 w-full items-center rounded-lg border border-[#777] px-3 sm:w-[285px]">
            <Search size={16} className="text-[#777]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none"
            />
            <SlidersHorizontal size={17} className="text-[#555]" />
          </label>
        </div>

        {isPending ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[174px] animate-pulse rounded-xl bg-[#eef2f5]"
              />
            ))}
          </div>
        ) : error && !lessons.length ? (
          <EmptyState
            message={
              error instanceof Error
                ? error.message
                : "Unable to load your lessons."
            }
          />
        ) : lessons.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => {
              const canJoinSession = canJoinLessonAtUtc(lesson, nowUtc);

              return (
                <article
                  key={lesson.id}
                  className="rounded-xl border border-[#dedede] bg-white p-4 shadow-[0_12px_28px_rgba(37,65,92,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={lesson.teacherImage}
                      alt={lesson.teacherName}
                      width={46}
                      height={46}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-[#111]">
                        {lesson.teacherName}
                      </h3>
                      <p className="truncate text-[10px] text-[#6f7b87]">
                        {lesson.professionalTitle}
                      </p>
                      <p
                        className={`mt-0.5 flex items-center gap-1 text-[10px] ${lesson.isOnline ? "text-[#19bd57]" : "text-[#90979e]"}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${lesson.isOnline ? "bg-[#19bd57]" : "bg-[#aab0b5]"}`}
                        />
                        {lesson.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                    {activeTab !== "upcoming" && (
                      <span
                        className={`flex shrink-0 items-center gap-1 rounded border px-2 py-1 text-[9px] font-medium ${activeTab === "cancelled" ? "border-[#ffccd0] bg-[#fff0f1] text-[#ff4c59]" : activeTab === "accepted" ? "border-[#a7e8bd] bg-[#eefbf2] text-[#25b95a]" : "border-[#ffd46f] bg-[#fff8df] text-[#f4ad00]"}`}
                      >
                        {activeTab === "cancelled" ? (
                          <>
                            <X size={11} /> Rejected
                          </>
                        ) : activeTab === "accepted" ? (
                          <>
                            <CheckCircle2 size={11} /> Approved
                          </>
                        ) : (
                          <>
                            <Clock3 size={11} /> Pending Approval
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 line-clamp-2 text-[10px] leading-4 text-[#77808f]">
                    {lesson.teacherBio}
                  </p>
                  {activeTab === "cancelled" && (
                    <div className="mt-3 rounded-md border border-[#ffd1d5] bg-[#fff5f6] px-3 py-2">
                      <p className="text-[10px] font-semibold text-[#d93645]">
                        Reason for rejection
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-[#7c5559]">
                        {lesson.rejectionReason ||
                          "No rejection reason was provided."}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-md bg-[#f1f6fa] text-[10px] text-[#748096]">
                    <Detail label="Topic" value={lesson.subject} />
                    <Detail label="Type" value={lesson.bookingType} />
                    <Detail label="Date" value={lesson.sessionDate} />
                    <Detail label="Time" value={lesson.sessionTime} />
                    <Detail
                      label="Duration"
                      value={
                        lesson.durationMinutes
                          ? `${lesson.durationMinutes} minutes`
                          : "—"
                      }
                    />
                    <Detail label="Amount" value={lesson.amount} />
                  </div>
                  {activeTab === "upcoming" && (
                    <button
                      type="button"
                      disabled={!canJoinSession || joinSession.isPending}
                      title={
                        canJoinSession
                          ? "Join lesson"
                          : "The lesson is not open for joining yet"
                      }
                      onClick={() => joinSession.mutate(lesson.paymentLessonID)}
                      className={`mt-4 flex h-10 w-full items-center justify-center rounded-lg text-xs font-semibold transition ${
                        canJoinSession && !joinSession.isPending
                          ? "bg-[#53a2eb] text-white hover:bg-[#398fdc]"
                          : "cursor-not-allowed bg-[#53a2eb]/35 text-white/80"
                      }`}
                    >
                      {joinSession.isPending &&
                      joinSession.variables === lesson.paymentLessonID
                        ? "Joining..."
                        : "Join"}
                    </button>
                  )}
                  {activeTab === "accepted" && (
                    <button
                      type="button"
                      disabled={payment.isPending}
                      onClick={() => payment.mutate(lesson.paymentLessonID)}
                      className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#53a2eb] text-xs font-semibold text-white transition hover:bg-[#398fdc] disabled:cursor-wait disabled:opacity-60"
                    >
                      <CreditCard size={16} />
                      {payment.isPending &&
                      payment.variables === lesson.paymentLessonID
                        ? "Processing Payment..."
                        : `Make Payment · ${lesson.amount}`}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            message={
              query
                ? `No lessons found for “${query}”.`
                : `You don't have any ${activeTab} lessons yet.`
            }
          />
        )}
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-b border-[#d7e0e8] px-3 py-2">
      <span className="block text-[#748096]">{label}</span>
      <strong className="mt-0.5 block truncate text-[#202734]">{value}</strong>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[#cfd7df] py-20 text-center text-sm text-[#788493]">
      {message}
    </div>
  );
}
