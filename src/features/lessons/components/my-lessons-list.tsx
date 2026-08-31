"use client";

import {
  getMyBookings,
  type MyBookingFilter,
} from "@/features/lessons/api/get-my-bookings";
import { payForLesson } from "@/features/lessons/api/pay-for-lesson";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const tabs: Array<{ label: string; value: MyBookingFilter }> = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending Approval", value: "pending" },
  { label: "Approved", value: "accepted" },
  { label: "Cancelled", value: "cancelled" },
];

export function MyLessonsList() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<MyBookingFilter>("pending");
  const [query, setQuery] = useState("");
  const payment = useMutation({
    mutationFn: payForLesson,
    onSuccess: async ({ checkoutUrl, message }) => {
      if (checkoutUrl) {
        window.location.assign(checkoutUrl);
        return;
      }

      toast.success(message || "Payment completed successfully.");
      await queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    },
    onError: (error) => toast.error(error.message),
  });
  const {
    data: lessons = [],
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

  return (
    <section className="min-h-[500px] bg-white px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full rounded-lg bg-[#f0f0f0] p-1 sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 rounded-md px-5 py-2 text-[11px] transition sm:flex-none ${activeTab === tab.value ? "bg-white font-semibold text-[#111] shadow-sm" : "text-[#929292]"}`}
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
        ) : error ? (
          <EmptyState
            message={
              error instanceof Error
                ? error.message
                : "Unable to load your lessons."
            }
          />
        ) : lessons.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
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
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded border px-2 py-1 text-[9px] font-medium ${activeTab === "cancelled" ? "border-[#ffccd0] bg-[#fff0f1] text-[#ff4c59]" : activeTab === "accepted" || activeTab === "upcoming" ? "border-[#a7e8bd] bg-[#eefbf2] text-[#25b95a]" : "border-[#ffd46f] bg-[#fff8df] text-[#f4ad00]"}`}
                  >
                    {activeTab === "cancelled" ? (
                      <>
                        <X size={11} /> Rejected
                      </>
                    ) : activeTab === "accepted" ? (
                      <>
                        <CheckCircle2 size={11} /> Approved
                      </>
                    ) : activeTab === "upcoming" ? (
                      <>
                        <CheckCircle2 size={11} /> Upcoming
                      </>
                    ) : (
                      <>
                        <Clock3 size={11} /> Pending Approval
                      </>
                    )}
                  </span>
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
                {activeTab === "accepted" && (
                  <button
                    type="button"
                    disabled={payment.isPending}
                    onClick={() => payment.mutate(lesson.id)}
                    className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#53a2eb] text-xs font-semibold text-white transition hover:bg-[#398fdc] disabled:cursor-wait disabled:opacity-60"
                  >
                    <CreditCard size={16} />
                    {payment.isPending && payment.variables === lesson.id
                      ? "Processing Payment..."
                      : `Make Payment · ${lesson.amount}`}
                  </button>
                )}
              </article>
            ))}
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
