"use client";

import {
  getBookings,
  type BookingStatus,
  type TeacherBooking,
} from "@/features/lessons/api/get-bookings";
import {
  respondToLesson,
  type RespondToLessonParams,
} from "@/features/lessons/api/respond-to-lesson";
import { startLessonSession } from "@/features/lessons/api/start-session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const tabs = ["All", "Accepted", "Pending", "Completed"] as const;
type Tab = (typeof tabs)[number];

const statusColor: Record<BookingStatus, string> = {
  Pending: "text-[#f39a1e]",
  Accepted: "text-[#00c98d]",
  Rejected: "text-[#ff3d4d]",
  Completed: "text-[#777]",
};

function parseSessionDateUtc(dateStr: string): {
  year: number;
  month: number;
  day: number;
} | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    return {
      year: Number(isoMatch[1]),
      month: Number(isoMatch[2]),
      day: Number(isoMatch[3]),
    };
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return {
      year: parsed.getUTCFullYear(),
      month: parsed.getUTCMonth() + 1,
      day: parsed.getUTCDate(),
    };
  }
  return null;
}

function parseTimeToMinutes(timeStr: string): number | null {
  if (!timeStr) return null;
  const trimmed = timeStr.trim().toLowerCase();
  if (trimmed === "instant") return 0;

  const isoTimeMatch = trimmed.match(/t(\d{1,2}):(\d{2})/);
  if (isoTimeMatch) {
    return Number(isoTimeMatch[1]) * 60 + Number(isoTimeMatch[2]);
  }

  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hours < 12) {
    hours += 12;
  } else if (meridiem === "am" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

function getSessionUtcTimeRange(booking: TeacherBooking): {
  startMs: number;
  endMs: number;
} | null {
  const dateParts = parseSessionDateUtc(booking.sessionDate);
  if (!dateParts) return null;

  const startMinutes = parseTimeToMinutes(booking.sessionStartTime);
  if (startMinutes === null) return null;

  let endMinutes = parseTimeToMinutes(booking.sessionEndTime);
  if (endMinutes === null) {
    endMinutes = startMinutes + 60;
  }

  const startHour = Math.floor(startMinutes / 60);
  const startMin = startMinutes % 60;
  const startMs = new Date(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
    startHour,
    startMin,
    0,
    0
  ).getTime();

  let endMs: number;
  if (endMinutes < startMinutes) {
    const nextDay = new Date(
      dateParts.year,
      dateParts.month - 1,
      dateParts.day + 1
    );
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;
    endMs = new Date(
      nextDay.getFullYear(),
      nextDay.getMonth(),
      nextDay.getDate(),
      endHour,
      endMin,
      59,
      999
    ).getTime();
  } else {
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;
    endMs = new Date(
      dateParts.year,
      dateParts.month - 1,
      dateParts.day,
      endHour,
      endMin,
      59,
      999
    ).getTime();
  }

  return { startMs, endMs };
}

function isSessionActiveNow(
  booking: TeacherBooking,
  currentTimestampMs = Date.now()
) {
  const isInstant =
    booking.bookingType.trim().toLowerCase() === "instant" ||
    booking.sessionStartTime.trim().toLowerCase() === "instant";

  // Instant lessons can be managed immediately, regardless of their date.
  if (isInstant) return true;

  const range = getSessionUtcTimeRange(booking);
  if (!range) return false;

  return (
    currentTimestampMs >= range.startMs && currentTimestampMs <= range.endMs
  );
}

export default function TeacherBookingsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const routeTab: Tab =
    pathname === "/teacher/bookings/pending"
      ? "Pending"
      : pathname === "/teacher/bookings/accepted"
        ? "Accepted"
        : "All";
  const [activeTab, setActiveTab] = useState<Tab>(routeTab);
  const {
    data: fetchedBookings = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["teacher-bookings", activeTab],
    queryFn: () =>
      getBookings({
        filter: activeTab.toLowerCase(),
        search: "",
        perPage: 8,
      }),
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
  });
  const [localStatuses, setLocalStatuses] = useState<
    Record<string, BookingStatus>
  >({});
  const [rejectingLessonID, setRejectingLessonID] = useState<
    TeacherBooking["id"] | null
  >(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [nowUtc, setNowUtc] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNowUtc(Date.now());
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const bookings = useMemo(
    () =>
      fetchedBookings.map((booking) => ({
        ...booking,
        status: localStatuses[String(booking.id)] ?? booking.status,
      })),
    [fetchedBookings, localStatuses]
  );

  const visibleBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => activeTab === "All" || booking.status === activeTab
      ),
    [activeTab, bookings]
  );

  function updateStatus(id: TeacherBooking["id"], status: BookingStatus) {
    setLocalStatuses((current) => ({ ...current, [String(id)]: status }));
  }

  const respondMutation = useMutation({
    mutationFn: respondToLesson,
    onSuccess: async (_, variables) => {
      updateStatus(
        variables.lessonID,
        variables.action === "accept" ? "Accepted" : "Rejected"
      );
      await queryClient.invalidateQueries({ queryKey: ["teacher-bookings"] });
      toast.success(
        variables.action === "accept"
          ? "Lesson approved successfully."
          : "Lesson rejected successfully."
      );
      if (variables.action === "reject") {
        setRejectingLessonID(null);
        setRejectionReason("");
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const startSessionMutation = useMutation({
    mutationFn: startLessonSession,
    onSuccess: (credentials) => {
      sessionStorage.setItem(
        "revision-bee:active-lesson-session",
        JSON.stringify({
          ...credentials,
          expiresAt: Date.now() + credentials.expiresIn * 1000,
          sessionRole: "teacher",
        })
      );
      router.push("/teacher/session");
    },
    onError: (error) => toast.error(error.message),
  });

  function respondToBooking(
    lessonID: TeacherBooking["id"],
    action: RespondToLessonParams["action"],
    reason?: string
  ) {
    if (action === "accept") {
      respondMutation.mutate({ lessonID, action });
      return;
    }

    respondMutation.mutate({
      lessonID,
      action,
      rejectionReason: reason?.trim() ?? "",
    });
  }

  function changeTab(tab: Tab) {
    const tabRoutes: Partial<Record<Tab, string>> = {
      All: "/teacher/bookings",
      Accepted: "/teacher/bookings/accepted",
      Pending: "/teacher/bookings/pending",
    };
    const destination = tabRoutes[tab];

    if (destination && destination !== pathname) {
      router.push(destination);
      return;
    }

    setActiveTab(tab);
  }

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <h1 className="text-[22px] font-bold leading-tight text-[#111]">
              Student Booking Requests
            </h1>
            <p className="mt-2 text-xs text-[#6f7378] sm:text-sm">
              Review lesson requests from students, check session details, and
              respond promptly.
            </p>
          </div>

          <div className="flex w-full rounded-lg bg-[#e9eaec] p-1 md:w-[390px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => changeTab(tab)}
                className={`flex-1 rounded-md px-3 py-2 text-[11px] font-medium transition sm:text-xs ${activeTab === tab ? "bg-white text-[#242424] shadow-sm" : "text-[#999] hover:text-[#555]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-[22px] bg-white px-4 py-2 shadow-[0_1px_2px_rgba(20,30,40,0.02)] sm:px-6">
          <div className="hidden grid-cols-[1.2fr_.9fr_.8fr_1fr_.85fr_.6fr_.7fr_1fr] gap-4 border-b border-[#e9ecef] py-4 text-xs font-medium text-[#999] lg:grid">
            <span>Client Details</span>
            <span>Session</span>
            <span>Session Type</span>
            <span>Topic</span>
            <span>Status</span>
            <span>Amount</span>
            <span className="text-center">Payment</span>
            <span className="text-right">Action</span>
          </div>

          {isPending && (
            <div className="space-y-3 py-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 animate-pulse rounded-lg bg-[#f1f3f5]"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="grid min-h-64 place-items-center text-center text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Unable to load bookings."}
            </div>
          )}

          <div className="divide-y divide-[#e9ecef]">
            {visibleBookings.map((booking) => {
              const isPaid = Boolean(booking.paidAt);
              const canManageSession = isPaid && isSessionActiveNow(booking);
              const unavailableActionTitle = isPaid
                ? "Available during the session time"
                : "Payment is required before starting the session";

              return (
                <article
                  key={booking.id}
                  className="grid gap-4 py-4 lg:grid-cols-[1.2fr_.9fr_.8fr_1fr_.85fr_.6fr_.7fr_1fr] lg:items-center lg:gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src={booking.image}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <h2 className="truncate text-xs font-semibold text-[#252525]">
                        {booking.name}
                      </h2>
                      <p className="truncate text-[10px] text-[#a0a0a0]">
                        {booking.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Session
                    </span>
                    <p className="text-xs text-[#333]">{booking.date}</p>
                    <p className="mt-0.5 text-[10px] text-[#999]">
                      {booking.time}
                    </p>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Session Type
                    </span>
                    <p className="text-xs text-[#303338]">
                      {booking.bookingType}
                    </p>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Topic
                    </span>
                    <p className="text-xs leading-5 text-[#303338]">
                      {booking.topic}
                    </p>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Status
                    </span>
                    <span
                      className={`text-xs font-medium ${statusColor[booking.status]}`}
                    >
                      {booking.status === "Accepted"
                        ? "Approved"
                        : booking.status}
                    </span>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Amount
                    </span>
                    <span className="text-xs text-[#252525]">
                      {booking.amount}
                    </span>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Payment
                    </span>
                    {booking.paidAt ? (
                      <span className="block lg:text-center">
                        <span className="block text-xs font-medium text-[#23b865]">
                          Paid
                        </span>
                        <span className="block text-[10px] text-[#999]">
                          {booking.paidAt}
                        </span>
                      </span>
                    ) : (
                      <span className="block text-xs font-medium text-[#ff3d4d] lg:text-center">
                        Not Paid
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 lg:justify-end">
                    {booking.status === "Pending" && (
                      <>
                        <button
                          disabled={respondMutation.isPending}
                          onClick={() =>
                            respondToBooking(booking.lessonID, "accept")
                          }
                          className="rounded-full border border-[#97e3b0] bg-[#e9fbed] px-3 py-1.5 text-[11px] font-medium text-[#29bd59] hover:bg-[#dcf7e3] disabled:cursor-wait disabled:opacity-50"
                        >
                          Accept
                        </button>
                        <button
                          disabled={respondMutation.isPending}
                          onClick={() => {
                            setRejectingLessonID(booking.lessonID);
                            setRejectionReason("");
                          }}
                          className="rounded-full border border-[#ffadb3] bg-[#fff0f1] px-3 py-1.5 text-[11px] font-medium text-[#ff3d4d] hover:bg-[#ffe5e7] disabled:cursor-wait disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status === "Accepted" && (
                      <>
                        <button
                          disabled={
                            !canManageSession || startSessionMutation.isPending
                          }
                          title={
                            canManageSession
                              ? "Start session"
                              : unavailableActionTitle
                          }
                          onClick={() =>
                            startSessionMutation.mutate(booking.lessonID)
                          }
                          className="rounded-full bg-[#53a2eb] px-4 py-1.5 text-[11px] font-medium text-white hover:bg-[#4295df] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#53a2eb]"
                        >
                          {startSessionMutation.isPending &&
                          startSessionMutation.variables === booking.lessonID
                            ? "Starting..."
                            : "Start"}
                        </button>
                        <button
                          disabled={!canManageSession}
                          title={
                            canManageSession
                              ? "Cancel session"
                              : unavailableActionTitle
                          }
                          onClick={() => updateStatus(booking.id, "Rejected")}
                          className="rounded-full bg-[#ff3543] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-[#ed2937] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#ff3543]"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "Rejected" && (
                      <>
                        <button
                          disabled
                          className="rounded-full bg-[#dedfe1] px-3 py-1.5 text-[11px] text-[#aaa]"
                        >
                          Accept
                        </button>
                        <button
                          disabled
                          className="rounded-full bg-[#dedfe1] px-3 py-1.5 text-[11px] text-[#aaa]"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status === "Completed" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#23b865]">
                        <Check size={14} /> Completed
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {!isPending && !error && visibleBookings.length === 0 && (
            <div className="grid min-h-64 place-items-center text-center">
              <div>
                <X className="mx-auto mb-3 text-[#bbb]" />
                <p className="text-sm font-medium text-[#555]">
                  No {activeTab.toLowerCase()} bookings
                </p>
              </div>
            </div>
          )}

          {!isPending && !error && (
            <footer className="border-t border-[#e9ecef] py-5 text-[10px] text-[#777] sm:text-xs">
              Viewing {visibleBookings.length} out of {bookings.length}
            </footer>
          )}
        </section>
      </div>

      {rejectingLessonID !== null && (
        <div className="fixed inset-0 z-[100000] grid place-items-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-lesson-title"
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 id="reject-lesson-title" className="text-base font-bold">
                Reject Lesson
              </h2>
              <button
                type="button"
                aria-label="Close rejection dialog"
                onClick={() => setRejectingLessonID(null)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-[#f1f3f5]"
              >
                <X size={17} />
              </button>
            </div>
            <label className="mt-4 block text-xs font-medium text-[#444]">
              Rejection reason
              <textarea
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                placeholder="Enter a reason for rejecting this lesson"
                rows={4}
                className="mt-2 w-full resize-none rounded-lg border border-[#d7dde3] p-3 text-sm outline-none focus:border-[#53a2eb]"
              />
            </label>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setRejectingLessonID(null)}
                className="h-10 rounded-lg border border-[#d7dde3] px-4 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!rejectionReason.trim() || respondMutation.isPending}
                onClick={() =>
                  respondToBooking(rejectingLessonID, "reject", rejectionReason)
                }
                className="h-10 rounded-lg bg-[#ff3d4d] px-4 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {respondMutation.isPending ? "Rejecting..." : "Reject Lesson"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
