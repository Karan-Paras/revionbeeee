import { paths } from "@/routes";
import {
  ArrowLeft,
  Bell,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  UserRoundPlus,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notifications - Revision Bee",
  description: "View your latest teaching notifications.",
};

const notifications = [
  {
    title: "New lesson request",
    message: "A student has requested a 40-minute Mathematics lesson.",
    time: "5 minutes ago",
    icon: UserRoundPlus,
    iconClass: "bg-[#eaf5ff] text-[#429bea]",
    unread: true,
  },
  {
    title: "Upcoming lesson reminder",
    message: "Your Physics lesson starts today at 3:00 PM.",
    time: "30 minutes ago",
    icon: CalendarCheck2,
    iconClass: "bg-[#f1edff] text-[#8668ff]",
    unread: true,
  },
  {
    title: "Booking accepted",
    message: "The lesson booking with Varun Singh has been confirmed.",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconClass: "bg-[#e8faee] text-[#31c86b]",
    unread: false,
  },
  {
    title: "Payment received",
    message: "Your payment of $120 for a completed lesson was received.",
    time: "Yesterday",
    icon: CircleDollarSign,
    iconClass: "bg-[#fff2e5] text-[#ff9b32]",
    unread: false,
  },
] as const;

export default function TeacherNotificationsPage() {
  return (
    <main className="min-h-full bg-[#f5f6f8] p-5 sm:p-8">
      <div className="mx-auto max-w-[950px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={paths.teacherDashboard()}
              aria-label="Back to dashboard"
              title="Back to Dashboard"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dce5ec] bg-white text-[#429bea] shadow-sm transition hover:border-[#429bea] hover:bg-[#edf6ff]"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#111]">Notifications</h1>
              <p className="mt-1 text-xs text-[#777] sm:text-sm">
                Stay updated with your lessons, requests, and payments.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-[#eaf5ff] px-3 py-1.5 text-xs font-semibold text-[#429bea]">
            2 New
          </span>
        </div>

        <section className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#edf0f2] px-5 py-4">
            <Bell size={19} className="text-[#429bea]" />
            <h2 className="font-semibold text-[#222]">Recent Notifications</h2>
          </div>

          <div className="divide-y divide-[#edf0f2]">
            {notifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <article
                  key={notification.title}
                  className={`relative flex gap-4 px-5 py-5 transition hover:bg-[#f9fbfd] ${notification.unread ? "bg-[#f7fbff]" : "bg-white"}`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${notification.iconClass}`}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-sm font-semibold text-[#222]">
                        {notification.title}
                      </h3>
                      <time className="shrink-0 text-[10px] text-[#999] sm:text-xs">
                        {notification.time}
                      </time>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[#747b83] sm:text-sm">
                      {notification.message}
                    </p>
                  </div>
                  {notification.unread && (
                    <span
                      aria-label="Unread"
                      className="absolute top-1/2 right-2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#429bea] sm:right-4"
                    />
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
