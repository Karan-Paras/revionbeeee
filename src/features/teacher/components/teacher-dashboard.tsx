"use client";

import { startLessonSession } from "@/features/lessons/api/start-session";
import { activeLessonSessionReadyEvent } from "@/features/lessons/components/active-lesson-session-guard";
import {
  connectTeacherStripe,
  getTeacherStripeOnboardingStatus,
} from "@/features/teacher/actions/connect-stripe";
import type { DashboardLesson } from "@/features/teacher/api/get-dashboard";
import { getTeacherDashboard } from "@/features/teacher/api/get-dashboard";
import { isSessionWindowOpen } from "@/lib/session-time";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  CalendarDays,
  DollarSign,
  UserRound,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const statColors = [
  "bg-[#eaf5ff] text-[#429bea]",
  "bg-[#fff2e5] text-[#ff9b32]",
  "bg-[#f1edff] text-[#8668ff]",
  "bg-[#e8faee] text-[#31c86b]",
];

function canLaunchNow(lesson: DashboardLesson, nowMs: number): boolean {
  return isSessionWindowOpen({
    sessionDate: lesson.rawDate,
    sessionStartTime: lesson.rawStartTime,
    durationMinutes: lesson.durationMinutes,
    isInstant: lesson.isInstant,
    nowMs,
  });
}

function StudentAvatar({ image, name }: { image?: string; name: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (image && !imageFailed) {
    return (
      <Image
        src={image}
        alt={name}
        width={48}
        height={48}
        onError={() => setImageFailed(true)}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={`${name} photo not available`}
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d7e3ec] bg-gradient-to-br from-[#edf6fd] to-[#dcecf8] text-[#7e9bb1]"
    >
      <UserRound size={22} strokeWidth={1.7} />
    </span>
  );
}

export function TeacherDashboardContent() {
  const router = useRouter();
  const [nowMs, setNowMs] = useState(() => Date.now());

  // Update every second so the button activates exactly on time
  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const { data, isPending, error } = useQuery({
    queryKey: ["teacher-dashboard"],
    queryFn: getTeacherDashboard,
    staleTime: 60 * 1000,
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

  const stripeOnboardingStatus = useQuery({
    queryKey: ["teacher-stripe-onboarding-status"],
    queryFn: getTeacherStripeOnboardingStatus,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60_000,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const stripeConfigurationBroken =
    stripeOnboardingStatus.data?.success === true &&
    stripeOnboardingStatus.data.configured === false;

  const stripeStatusMessage =
    stripeOnboardingStatus.data?.success === true
      ? stripeOnboardingStatus.data.message
      : undefined;

  const [isConnectingStripe, setIsConnectingStripe] = useState(false);

  async function handleStartOnboarding() {
    if (isConnectingStripe) return;
    setIsConnectingStripe(true);
    try {
      const result = await connectTeacherStripe();
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      window.location.assign(result.url);
    } finally {
      setIsConnectingStripe(false);
    }
  }

  const startSession = useMutation({
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
      window.dispatchEvent(new Event(activeLessonSessionReadyEvent));
      router.push("/teacher/session");
    },
    onError: (err) =>
      toast.error(
        err instanceof Error ? err.message : "Failed to start session"
      ),
  });

  const stats = data
    ? [
        {
          value: `${data.todayLessons} Sessions`,
          label: "Today's Lessons",
          icon: CalendarDays,
        },
        {
          value: `${data.pendingRequests} Pending`,
          label: "Booking Requests",
          icon: AlertTriangle,
        },
        // {
        //   value: `${data.totalTaughtHours} Hours`,
        //   label: "Total Taught",
        //   icon: Clock3,
        // },
        {
          value: `$${data.totalEarnings.toLocaleString("en-US")}`,
          label: "Total Earning",
          icon: DollarSign,
        },
      ]
    : [];

  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-2xl font-bold text-[#111]">Dashboard</h1>
        <p className="mt-1 text-xs text-[#666] sm:text-sm">
          Manage your lessons, booking requests, and teaching activity.
        </p>

        {error && (
          <div className="mt-7 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Unable to load dashboard."}
          </div>
        )}

        {stripeConfigurationBroken && (
          <div
            role="alert"
            className="mt-7 rounded-xl border-l-4 border-red-600 bg-red-50 p-4 text-red-700"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="whitespace-pre-line text-sm font-medium leading-5">
                {stripeStatusMessage}
              </p>
              <button
                type="button"
                onClick={handleStartOnboarding}
                disabled={isConnectingStripe}
                className="shrink-0 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
              >
                {isConnectingStripe ? "Redirecting..." : "Start onboarding"}
              </button>
            </div>
          </div>
        )}

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[92px] animate-pulse rounded-xl bg-white"
                />
              ))
            : stats.map(({ value, label, icon: Icon }, i) => (
                <article
                  key={label}
                  className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
                >
                  <div>
                    <h2 className="text-xl font-bold">{value}</h2>
                    <p className="mt-1 text-sm text-[#999]">{label}</p>
                  </div>
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-lg ${statColors[i]}`}
                  >
                    <Icon size={22} />
                  </span>
                </article>
              ))}
        </section>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
          {/* Today's Scheduled Lessons */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#edf0f2] pb-4">
              <h2 className="font-bold">Today&apos;s Scheduled Lessons</h2>
              <Link
                href="/teacher/bookings/accepted"
                className="text-sm font-medium text-[#429bea]"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-[#edf0f2]">
              {data?.scheduledLessons.map((lesson) => {
                const active = canLaunchNow(lesson, nowMs);
                return (
                  <article
                    key={lesson.id}
                    className="flex items-center gap-3 py-4"
                  >
                    <StudentAvatar
                      image={lesson.image}
                      name={lesson.studentName}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold">
                        {lesson.studentName}
                      </h3>
                      <p className="truncate text-xs text-[#999]">
                        {lesson.topic}
                      </p>
                      <p className="mt-1 flex gap-4 text-[11px] text-[#999]">
                        <span>{lesson.dateTime}</span>
                        <span>{lesson.duration}</span>
                      </p>
                    </div>
                    <button
                      disabled={!active || startSession.isPending}
                      title={
                        active
                          ? "Launch session"
                          : "Available 30 min before the scheduled start time"
                      }
                      onClick={() => startSession.mutate(lesson.id)}
                      className="hidden items-center gap-2 rounded-lg bg-[#53a2eb] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#c9c9c9] sm:flex"
                    >
                      <Video size={17} />
                      {startSession.isPending &&
                      startSession.variables === lesson.id
                        ? "Launching..."
                        : "Launch Session"}
                    </button>
                  </article>
                );
              })}
              {!isPending && !error && !data?.scheduledLessons.length && (
                <p className="py-10 text-center text-sm text-[#999]">
                  No lessons scheduled for today.
                </p>
              )}
            </div>
          </section>

          {/* Recent Requests */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#edf0f2] pb-4">
              <h2 className="font-bold">
                Recent Requests
                <span className="ml-1 rounded-full bg-[#fff0d9] px-2 py-0.5 text-xs text-[#f5a623]">
                  {data?.pendingRequests ?? 0}
                </span>
              </h2>
              <Link
                href="/teacher/bookings/pending"
                className="text-sm font-medium text-[#429bea]"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-[#edf0f2]">
              {data?.recentRequests.map((request) => (
                <article key={request.id} className="flex gap-3 py-4">
                  <StudentAvatar
                    image={request.image}
                    name={request.studentName}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold">
                        {request.studentName}
                      </h3>
                      <span className="text-sm font-semibold text-[#25c966]">
                        {request.amount}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs font-medium text-[#3f9ee9]">
                      {request.topic}
                    </p>
                    <p className="mt-1 text-[11px] text-[#999]">
                      {request.dateTime} · {request.duration}
                    </p>
                  </div>
                </article>
              ))}
              {!isPending && !error && !data?.recentRequests.length && (
                <p className="py-10 text-center text-sm text-[#999]">
                  No recent booking requests.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
