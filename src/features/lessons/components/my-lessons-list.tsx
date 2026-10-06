"use client";

import { Modal } from "@/components/common/modal";
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
import {
  isLessonLiveLocally,
  markLessonLive,
} from "@/features/lessons/session-live-state";
import { fetchClient } from "@/lib/fetch-client";
import { isSessionWindowOpen } from "@/lib/session-time";
import { paths } from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  Flag,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const tabs: Array<{ label: string; value: MyBookingFilter }> = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending Approval", value: "pending" },
  { label: "Approved", value: "accepted" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Completed", value: "completed" },
];

const reportCategories = [
  { label: "Teacher no show", value: "teacher_no_show" },
  { label: "Inappropriate behavior", value: "inappropriate_behavior" },
  { label: "Technical issue", value: "technical_issue" },
  { label: "Poor lesson quality", value: "poor_lesson_quality" },
  { label: "Billing issue", value: "billing_issue" },
  { label: "Other", value: "other" },
];

const reportLessonUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/report";

const tabValues = tabs.map((tab) => tab.value);

const paidLessonRedirectKey = "revision-bee:paid-lesson-redirects";
const LESSON_STATUS_REFETCH_INTERVAL = 10_000;

function readPaidLessonRedirects() {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(paidLessonRedirectKey) ?? "[]"
    );
    return new Set(Array.isArray(value) ? value.map(String) : []);
  } catch {
    return new Set<string>();
  }
}

function savePaidLessonRedirects(lessonIDs: Set<string>) {
  try {
    if (!lessonIDs.size) {
      localStorage.removeItem(paidLessonRedirectKey);
      return;
    }
    localStorage.setItem(paidLessonRedirectKey, JSON.stringify([...lessonIDs]));
  } catch {}
}

async function reportLesson({
  lessonID,
  category,
  description,
}: {
  lessonID: string | number;
  category: string;
  description: string;
}) {
  const formData = new FormData();
  formData.append("lessonID", String(lessonID));
  formData.append("category", category);
  formData.append("description", description);

  return fetchClient<unknown>(reportLessonUrl, "POST", formData);
}

export function MyLessonsList() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab = tabValues.includes(requestedTab as MyBookingFilter)
    ? (requestedTab as MyBookingFilter)
    : "upcoming";
  const [activeTab, setActiveTab] = useState<MyBookingFilter>(initialTab);
  const [query, setQuery] = useState("");
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [reportLessonTarget, setReportLessonTarget] =
    useState<MyBooking | null>(null);
  const [reportCategory, setReportCategory] = useState(
    reportCategories[0].value
  );
  const [reportDescription, setReportDescription] = useState("");
  const [reportDescriptionError, setReportDescriptionError] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const approvedNotifications = useQuery({
    queryKey: ["my-booking-notifications", "accepted"],
    queryFn: () =>
      getMyBookings({ filter: "accepted", search: "", perPage: 100 }),
    staleTime: 60 * 1000,
    refetchInterval: activeTab === "accepted" ? false : 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (readPaidLessonRedirects().size) setActiveTab("upcoming");
  }, []);

  useEffect(() => {
    if (tabValues.includes(requestedTab as MyBookingFilter)) {
      setActiveTab(requestedTab as MyBookingFilter);
    }
  }, [requestedTab]);

  // Tick every second so Join button activates exactly on time
  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function changeTab(tab: MyBookingFilter) {
    setActiveTab(tab);
  }

  const payment = useMutation({
    mutationFn: payForLesson,
    onSuccess: ({ checkoutUrl }) => {
      window.location.assign(checkoutUrl);
    },
    onError: (error) => toast.error(error.message),
  });

  const report = useMutation({
    mutationFn: reportLesson,
    onSuccess: () => {
      toast.success("Report submitted successfully.");
      const reportedLessonID = reportLessonTarget?.paymentLessonID;
      if (reportedLessonID !== undefined) {
        queryClient.setQueriesData<MyBooking[] | undefined>(
          { queryKey: ["my-bookings"] },
          (current) =>
            current?.map((lesson) =>
              String(lesson.paymentLessonID) === String(reportedLessonID)
                ? { ...lesson, canReport: false }
                : lesson
            )
        );
      }
      setReportLessonTarget(null);
      setReportCategory(reportCategories[0].value);
      setReportDescription("");
      setReportDescriptionError("");
      setReportSubmitted(false);
    },
    onError: (error) => toast.error(error.message),
  });

  function openReportModal(lesson: MyBooking) {
    setReportLessonTarget(lesson);
    setReportCategory(reportCategories[0].value);
    setReportDescription("");
    setReportDescriptionError("");
    setReportSubmitted(false);
  }

  function closeReportModal() {
    if (report.isPending) return;
    setReportLessonTarget(null);
    setReportCategory(reportCategories[0].value);
    setReportDescription("");
    setReportDescriptionError("");
    setReportSubmitted(false);
  }

  function validateReportDescription(value: string) {
    if (!value.trim()) return "Please describe the issue.";
    if (value.trim().length < 10)
      return "Description must be at least 10 characters.";
    return "";
  }

  function handleReportDescriptionChange(value: string) {
    setReportDescription(value);
    if (reportSubmitted) {
      setReportDescriptionError(validateReportDescription(value));
    }
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reportLessonTarget) return;

    setReportSubmitted(true);
    const description = reportDescription.trim();
    const descriptionError = validateReportDescription(description);
    setReportDescriptionError(descriptionError);
    if (descriptionError) {
      return;
    }

    report.mutate({
      lessonID: reportLessonTarget.paymentLessonID,
      category: reportCategory,
      description,
    });
  }

  const joinSession = useMutation({
    mutationFn: joinLessonSession,
    onSuccess: (credentials) => {
      markLessonLive(credentials.lessonID);
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
        )
          throw new Error("Session storage verification failed.");
      } catch {
        toast.error(
          "The call details could not be saved. Enable browser storage and try again."
        );
        return;
      }
      window.dispatchEvent(new Event(activeLessonSessionReadyEvent));
      const fallback = window.setTimeout(() => {
        if (window.location.pathname !== "/session")
          window.location.replace("/session");
      }, 1_200);
      try {
        window.location.assign("/session");
      } catch {
        window.clearTimeout(fallback);
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
      getMyBookings({ filter: activeTab, search: query.trim(), perPage: 8 }),
    staleTime: activeTab === "upcoming" ? 0 : 2 * 60 * 1000,
    refetchInterval:
      activeTab === "upcoming" ? LESSON_STATUS_REFETCH_INTERVAL : false,
    refetchIntervalInBackground: false,
    refetchOnMount: activeTab === "upcoming" ? "always" : false,
    refetchOnWindowFocus: activeTab === "upcoming",
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const paidLessonIDs = readPaidLessonRedirects();
    if (!paidLessonIDs.size || !approvedNotifications.data?.length) return;

    const paidLessons = approvedNotifications.data.filter((lesson) =>
      paidLessonIDs.has(String(lesson.paymentLessonID))
    );
    if (!paidLessons.length) return;

    setActiveTab("upcoming");

    paidLessons.forEach((lesson) =>
      paidLessonIDs.delete(String(lesson.paymentLessonID))
    );
    savePaidLessonRedirects(paidLessonIDs);
  }, [approvedNotifications.data]);

  const isRejected = (status: string) =>
    ["rejected", "cancelled", "canceled"].includes(status.trim().toLowerCase());

  const getCancelledStatusLabel = () => "Cancelled";

  // On the upcoming tab, hide any lesson the teacher has rejected
  const lessons =
    activeTab === "upcoming"
      ? fetchedLessons.filter((l) => !isRejected(l.status))
      : fetchedLessons;

  return (
    <section className="min-h-[500px] bg-white px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1240px]">
        <Link
          href={paths.lessons()}
          className="mb-5 inline-flex h-10 items-center gap-2 rounded-lg border border-[#53a2eb] px-4 text-xs font-semibold text-[#388edc] transition hover:bg-[#eaf4fd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#348edc]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Lessons
        </Link>

        {/* Tab bar + search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full rounded-lg bg-[#f0f0f0] p-1 sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => changeTab(tab.value)}
                className={`relative flex-1 rounded-md px-5 py-2 text-[11px] transition sm:flex-none ${
                  activeTab === tab.value
                    ? "bg-white font-semibold text-[#111] shadow-sm"
                    : "text-[#929292]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <label className="flex h-10 w-full items-center rounded-lg border border-[#777] px-3 sm:w-[285px]">
            <Search size={16} className="text-[#777]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none"
            />
          </label>
        </div>

        {/* Lesson cards */}
        {isPending ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
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
              const isInstant =
                lesson.bookingType.trim().toLowerCase() === "instant";
              const cancelledStatusLabel = getCancelledStatusLabel();
              const canJoin =
                !isRejected(lesson.status) &&
                isSessionWindowOpen({
                  sessionDate: lesson.sessionDate,
                  sessionStartTime: lesson.sessionStartTime,
                  sessionEndTime: lesson.sessionEndTime,
                  durationMinutes: lesson.durationMinutes,
                  isInstant,
                  nowMs,
                });
              const isLive =
                lesson.isLive || isLessonLiveLocally(lesson.paymentLessonID);

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
                    {isLive && (
                      <span className="flex shrink-0 items-center gap-1 rounded border border-[#ffb8be] bg-[#fff0f1] px-2 py-1 text-[9px] font-semibold text-[#ff3543]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff3543]" />
                        Live
                      </span>
                    )}
                    {activeTab !== "upcoming" && (
                      <span
                        className={`flex shrink-0 items-center gap-1 rounded border px-2 py-1 text-[9px] font-medium ${
                          activeTab === "cancelled"
                            ? "border-[#ffccd0] bg-[#fff0f1] text-[#ff4c59]"
                            : activeTab === "completed"
                              ? "border-[#b8d7ff] bg-[#eef6ff] text-[#348edc]"
                              : activeTab === "accepted"
                                ? "border-[#a7e8bd] bg-[#eefbf2] text-[#25b95a]"
                                : "border-[#ffd46f] bg-[#fff8df] text-[#f4ad00]"
                        }`}
                      >
                        {activeTab === "cancelled" ? (
                          <>
                            <X size={11} /> {cancelledStatusLabel}
                          </>
                        ) : activeTab === "accepted" ? (
                          <>
                            <CheckCircle2 size={11} /> Approved
                          </>
                        ) : activeTab === "completed" ? (
                          <>
                            <CheckCircle2 size={11} /> Completed
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
                        Reason for cancellation
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-[#7c5559]">
                        {lesson.rejectionReason ||
                          "No rejection reason was provided."}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-md bg-[#f1f6fa] text-[10px] text-[#748096]">
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
                    <Detail
                      label="Amount"
                      value={lesson.amount}
                      className="col-span-2 border-r-0"
                    />
                  </div>

                  {activeTab === "upcoming" && (
                    <button
                      type="button"
                      disabled={!canJoin || joinSession.isPending}
                      title={
                        canJoin
                          ? "Join lesson"
                          : "Available 30 min before the session starts"
                      }
                      onClick={() => joinSession.mutate(lesson.paymentLessonID)}
                      className={`mt-4 flex h-10 w-full items-center justify-center rounded-lg text-xs font-semibold transition ${
                        canJoin && !joinSession.isPending
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

                  {activeTab !== "pending" && (
                    <button
                      type="button"
                      disabled={!lesson.canReport}
                      onClick={() => openReportModal(lesson)}
                      className={`mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-xs font-semibold transition ${
                        lesson.canReport
                          ? "border-[#ffccd0] bg-[#fff7f8] text-[#d93645] hover:border-[#ff9ca5] hover:bg-[#fff0f1]"
                          : "cursor-not-allowed border-[#e3e6e8] bg-[#f4f5f6] text-[#9aa1a8]"
                      }`}
                    >
                      <Flag size={15} />
                      {lesson.canReport ? "Report" : "Reported"}
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
                ? `No lessons found for "${query}".`
                : `You don't have any ${activeTab} lessons yet.`
            }
          />
        )}
      </div>

      {reportLessonTarget && (
        <Modal
          title="Report Lesson"
          onClose={closeReportModal}
          className="max-w-[520px] rounded-2xl"
        >
          <form onSubmit={submitReport} className="space-y-4 p-5">
            <div className="rounded-lg bg-[#f5f8fb] p-3 text-xs text-[#5f6b76]">
              <p className="font-semibold text-[#202734]">
                {reportLessonTarget.teacherName}
              </p>
              <p className="mt-1">
                {reportLessonTarget.subject} | {reportLessonTarget.sessionDate}{" "}
                | {reportLessonTarget.sessionTime}
              </p>
            </div>

            <label className="block text-xs font-semibold text-[#202734]">
              Category
              <select
                value={reportCategory}
                onChange={(event) => setReportCategory(event.target.value)}
                disabled={report.isPending}
                className="mt-2 h-11 w-full rounded-lg border border-[#d7e0e8] bg-white px-3 text-xs font-medium text-[#202734] outline-none transition focus:border-[#53a2eb]"
              >
                {reportCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#202734]">
              Description
              <textarea
                value={reportDescription}
                onChange={(event) =>
                  handleReportDescriptionChange(event.target.value)
                }
                disabled={report.isPending}
                rows={5}
                placeholder="Describe what happened in this session."
                aria-invalid={Boolean(reportDescriptionError)}
                aria-describedby={
                  reportDescriptionError
                    ? "report-description-error"
                    : undefined
                }
                className={`mt-2 w-full resize-none rounded-lg border bg-white px-3 py-3 text-xs leading-5 text-[#202734] outline-none transition placeholder:text-[#9aa4ad] ${
                  reportDescriptionError
                    ? "border-[#d93645] focus:border-[#d93645]"
                    : "border-[#d7e0e8] focus:border-[#53a2eb]"
                }`}
              />
              {reportDescriptionError && (
                <p
                  id="report-description-error"
                  className="mt-1.5 text-[11px] font-medium text-[#d93645]"
                >
                  {reportDescriptionError}
                </p>
              )}
            </label>

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={closeReportModal}
                disabled={report.isPending}
                className="h-10 rounded-lg border border-[#d7e0e8] px-4 text-xs font-semibold text-[#66717b] transition hover:bg-[#f5f8fb] disabled:cursor-wait disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={report.isPending}
                className="h-10 rounded-lg bg-[#d93645] px-5 text-xs font-semibold text-white transition hover:bg-[#c22f3d] disabled:cursor-wait disabled:opacity-60"
              >
                {report.isPending ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}

function Detail({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`border-r border-b border-[#d7e0e8] px-3 py-2 ${className}`}
    >
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
