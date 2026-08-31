"use client";

import { getTeacherDashboard } from "@/features/teacher/api/get-dashboard";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  CalendarDays,
  Clock3,
  DollarSign,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const statColors = [
  "bg-[#eaf5ff] text-[#429bea]",
  "bg-[#fff2e5] text-[#ff9b32]",
  "bg-[#f1edff] text-[#8668ff]",
  "bg-[#e8faee] text-[#31c86b]",
];

export function TeacherDashboardContent() {
  const { data, isPending, error } = useQuery({
    queryKey: ["teacher-dashboard"],
    queryFn: getTeacherDashboard,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
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
        {
          value: `${data.totalTaughtHours} Hours`,
          label: "Total Taught",
          icon: Clock3,
        },
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

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[92px] animate-pulse rounded-xl bg-white"
                />
              ))
            : stats.map(({ value, label, icon: Icon }, index) => (
                <article
                  key={label}
                  className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
                >
                  <div>
                    <h2 className="text-xl font-bold">{value}</h2>
                    <p className="mt-1 text-sm text-[#999]">{label}</p>
                  </div>
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-lg ${statColors[index]}`}
                  >
                    <Icon size={22} />
                  </span>
                </article>
              ))}
        </section>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
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
              {data?.scheduledLessons.map((lesson) => (
                <article
                  key={lesson.id}
                  className="flex items-center gap-3 py-4"
                >
                  <Image
                    src={lesson.image}
                    alt={lesson.studentName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
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
                    disabled={!lesson.canLaunch}
                    className="hidden items-center gap-2 rounded-lg bg-[#53a2eb] px-4 py-2 text-xs font-semibold text-white disabled:bg-[#c9c9c9] sm:flex"
                  >
                    <Video size={17} /> Launch Session
                  </button>
                </article>
              ))}
              {!isPending && !error && !data?.scheduledLessons.length && (
                <p className="py-10 text-center text-sm text-[#999]">
                  No lessons scheduled for today.
                </p>
              )}
            </div>
          </section>

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
                  <Image
                    src={request.image}
                    alt={request.studentName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
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
