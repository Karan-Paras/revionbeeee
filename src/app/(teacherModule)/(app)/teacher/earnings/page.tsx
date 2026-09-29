"use client";

import {
  getTeacherEarnings,
  type PaymentStatus,
} from "@/features/teacher/api/get-earnings";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CircleDollarSign, Search, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type PaymentFilter = "All" | PaymentStatus;

const filters: PaymentFilter[] = ["All", "Active", "Lead", "Inactive"];

const statusColor: Record<PaymentStatus, string> = {
  Active: "text-[#18bd55]",
  Lead: "text-[#ff8e2b]",
  Inactive: "text-[#ff4552]",
};

function currency(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function TeacherEarningsPage() {
  const [activeFilter, setActiveFilter] = useState<PaymentFilter>("All");
  const [search, setSearch] = useState("");

  const { data, isPending, error } = useQuery({
    queryKey: ["teacher-earnings"],
    queryFn: getTeacherEarnings,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const payments = useMemo(() => data?.payments ?? [], [data?.payments]);
  const stats = data?.stats;

  const visiblePayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesStatus =
        activeFilter === "All" || payment.status === activeFilter;
      const matchesSearch =
        !normalizedSearch ||
        payment.client.toLowerCase().includes(normalizedSearch) ||
        payment.email.toLowerCase().includes(normalizedSearch) ||
        payment.topic.toLowerCase().includes(normalizedSearch) ||
        payment.date.toLowerCase().includes(normalizedSearch);
      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, search, payments]);

  const statCards = [
    {
      value: stats ? currency(stats.availablePayout) : "$0",
      label: "Available Payout",
      icon: CircleDollarSign,
      iconStyle: "bg-[#edf7ff] text-[#53a2eb]",
    },
    {
      value: stats ? currency(stats.pendingClearing) : "$0",
      label: "Pending Clearing",
      icon: AlertTriangle,
      iconStyle: "bg-[#fff2e7] text-[#ff922f]",
    },
    {
      value: stats ? currency(stats.totalEarnings) : "$0",
      label: "Total Earning",
      icon: CircleDollarSign,
      iconStyle: "bg-[#eaf9ee] text-[#29c764]",
    },
  ] as const;

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-[22px] font-bold leading-tight text-[#111]">
          Earnings &amp; Payments
        </h1>
        <p className="mt-2 text-xs text-[#6f7378] sm:text-sm">
          Track payouts, inspect Stripe Connect status, and view detailed lesson
          commission receipts.
        </p>

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          {statCards.map(({ value, label, icon: Icon, iconStyle }) => (
            <article
              key={label}
              className="flex min-h-[88px] items-center justify-between rounded-xl bg-white px-4 py-3 shadow-[0_1px_3px_rgba(20,30,40,0.03)]"
            >
              <div>
                <p className="text-xl font-bold leading-none text-[#111]">
                  {value}
                </p>
                <p className="mt-2 text-xs text-[#a0a3a6]">{label}</p>
              </div>
              <span
                className={`grid h-10 w-10 place-items-center rounded-lg ${iconStyle}`}
              >
                <Icon size={21} strokeWidth={1.8} />
              </span>
            </article>
          ))}
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full rounded-lg bg-[#e7e8ea] p-1 sm:w-[365px]">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 rounded-md px-2 py-2 text-[11px] font-medium transition ${activeFilter === filter ? "bg-white text-[#242424] shadow-sm" : "text-[#999] hover:text-[#555]"}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-[#8e9296] bg-white px-3 text-[#777] focus-within:border-[#53a2eb] sm:w-[275px]">
            <Search size={16} strokeWidth={1.8} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              placeholder="Search..."
              aria-label="Search payments"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#222] outline-none placeholder:text-[#777]"
            />
          </label>
        </div>

        <section className="mt-4 overflow-hidden rounded-[22px] bg-white px-4 py-2 shadow-[0_1px_2px_rgba(20,30,40,0.02)] sm:px-6">
          <div className="hidden grid-cols-[.9fr_1.2fr_2.1fr_.8fr_.55fr_.7fr] gap-5 border-b border-[#e9ecef] py-4 text-xs font-medium text-[#999] lg:grid">
            <span>Date</span>
            <span>Client Details</span>
            <span>Topic</span>
            <span>Session Time</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Status</span>
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
            <div className="grid min-h-56 place-items-center text-center">
              <div>
                <X className="mx-auto mb-3 text-[#bbb]" />
                <p className="text-sm font-medium text-[#555]">
                  Unable to load earnings
                </p>
                <p className="mt-1 text-xs text-[#999]">
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong."}
                </p>
              </div>
            </div>
          )}

          {!isPending && !error && (
            <div className="divide-y divide-[#e9ecef]">
              {visiblePayments.map((payment) => (
                <article
                  key={payment.id}
                  className="grid gap-4 py-4 lg:grid-cols-[.9fr_1.2fr_2.1fr_.8fr_.55fr_.7fr] lg:items-center lg:gap-5"
                >
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Date
                    </span>
                    <span className="text-xs text-[#303338]">
                      {payment.date}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-center gap-3">
                    {payment.image ? (
                      <Image
                        src={payment.image}
                        alt=""
                        width={36}
                        height={36}
                        unoptimized
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f1fb] text-xs font-semibold text-[#3994e7]">
                        {getInitials(payment.client)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <h2 className="truncate text-xs font-semibold text-[#252525]">
                        {payment.client}
                      </h2>
                      <p className="truncate text-[10px] text-[#a0a0a0]">
                        {payment.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Topic
                    </span>
                    <p className="text-xs leading-5 text-[#303338]">
                      {payment.topic}
                    </p>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Session Time
                    </span>
                    <span className="text-xs text-[#303338]">
                      {payment.sessionTime}
                    </span>
                  </div>
                  <div className="lg:text-right">
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Amount
                    </span>
                    <span className="text-xs text-[#252525]">
                      {payment.amount}
                    </span>
                  </div>
                  <div className="lg:text-right">
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Status
                    </span>
                    <span
                      className={`text-xs font-medium ${statusColor[payment.status]}`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isPending && !error && visiblePayments.length === 0 && (
            <div className="grid min-h-56 place-items-center text-center">
              <div>
                <Search className="mx-auto mb-3 text-[#bbb]" />
                <p className="text-sm font-medium text-[#555]">
                  No payments found
                </p>
                <p className="mt-1 text-xs text-[#999]">
                  Try another search or filter.
                </p>
              </div>
            </div>
          )}

          {!isPending && !error && (
            <footer className="flex items-center justify-between border-t border-[#e9ecef] py-5 text-[10px] text-[#777] sm:text-xs">
              <span>
                Viewing {visiblePayments.length} out of {payments.length}
              </span>
            </footer>
          )}
        </section>
      </div>
    </main>
  );
}
