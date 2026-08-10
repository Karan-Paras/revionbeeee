"use client";

import { Camille, Jisso, ProfileJordan, Yara } from "@/assets/images";
import { Check, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Status = "Pending" | "Accepted" | "Rejected" | "Completed";

type Booking = {
  id: number;
  name: string;
  email: string;
  image: StaticImageData;
  date: string;
  time: string;
  topic: string;
  status: Status;
  amount: string;
};

const initialBookings: Booking[] = [
  {
    id: 1,
    name: "Robert Fox",
    email: "robert.fox@example.com",
    image: ProfileJordan,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Pending",
    amount: "$2,500",
  },
  {
    id: 2,
    name: "Theresa Webb",
    email: "theresa.webb@example.com",
    image: Jisso,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Pending",
    amount: "$750",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    image: Camille,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Accepted",
    amount: "$150",
  },
  {
    id: 4,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    image: Yara,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Rejected",
    amount: "$1,050",
  },
  {
    id: 5,
    name: "Albert Flores",
    email: "albert.flores@example.com",
    image: Jisso,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Accepted",
    amount: "$840",
  },
  {
    id: 6,
    name: "Robert Fox",
    email: "robert.fox@example.com",
    image: ProfileJordan,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Pending",
    amount: "$2,500",
  },
  {
    id: 7,
    name: "Theresa Webb",
    email: "theresa.webb@example.com",
    image: Jisso,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Accepted",
    amount: "$750",
  },
  {
    id: 8,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    image: Camille,
    date: "12 Jan 2026",
    time: "12:00 PM - 2:00 PM",
    topic: "Vector Calculus & 3D Geometry Equations",
    status: "Pending",
    amount: "$150",
  },
];

const tabs = ["All", "Accepted", "Pending", "Completed"] as const;
type Tab = (typeof tabs)[number];

const statusColor: Record<Status, string> = {
  Pending: "text-[#f39a1e]",
  Accepted: "text-[#00c98d]",
  Rejected: "text-[#ff3d4d]",
  Completed: "text-[#777]",
};

export default function TeacherBookingsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const routeTab: Tab =
    pathname === "/teacher/bookings/pending"
      ? "Pending"
      : pathname === "/teacher/bookings/accepted"
        ? "Accepted"
        : "All";
  const [bookings, setBookings] = useState(() =>
    routeTab !== "All"
      ? initialBookings.map((booking) => ({
          ...booking,
          status: routeTab,
        }))
      : initialBookings
  );
  const [activeTab, setActiveTab] = useState<Tab>(routeTab);

  const visibleBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => activeTab === "All" || booking.status === activeTab
      ),
    [activeTab, bookings]
  );

  function updateStatus(id: number, status: Status) {
    setBookings((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item))
    );
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
          <div className="hidden grid-cols-[1.35fr_1.05fr_2.65fr_.85fr_.7fr_1.15fr] gap-4 border-b border-[#e9ecef] py-4 text-xs font-medium text-[#999] lg:grid">
            <span>Client Details</span>
            <span>Session</span>
            <span>Topic</span>
            <span>Status</span>
            <span>Amount</span>
            <span className="text-right">Action</span>
          </div>

          <div className="divide-y divide-[#e9ecef]">
            {visibleBookings.map((booking) => (
              <article
                key={booking.id}
                className="grid gap-4 py-4 lg:grid-cols-[1.35fr_1.05fr_2.65fr_.85fr_.7fr_1.15fr] lg:items-center lg:gap-4"
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
                <div className="flex items-center gap-2 lg:justify-end">
                  {booking.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "Accepted")}
                        className="rounded-full border border-[#97e3b0] bg-[#e9fbed] px-3 py-1.5 text-[11px] font-medium text-[#29bd59] hover:bg-[#dcf7e3]"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        className="rounded-full border border-[#ffadb3] bg-[#fff0f1] px-3 py-1.5 text-[11px] font-medium text-[#ff3d4d] hover:bg-[#ffe5e7]"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {booking.status === "Accepted" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "Completed")}
                        className="rounded-full bg-[#53a2eb] px-4 py-1.5 text-[11px] font-medium text-white hover:bg-[#4295df]"
                      >
                        Start
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        className="rounded-full bg-[#ff3543] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-[#ed2937]"
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
            ))}
          </div>

          {visibleBookings.length === 0 && (
            <div className="grid min-h-64 place-items-center text-center">
              <div>
                <X className="mx-auto mb-3 text-[#bbb]" />
                <p className="text-sm font-medium text-[#555]">
                  No {activeTab.toLowerCase()} bookings
                </p>
              </div>
            </div>
          )}

          <footer className="flex items-center justify-between border-t border-[#e9ecef] py-5 text-[10px] text-[#777] sm:text-xs">
            <span>Viewing {visibleBookings.length} out of 12</span>
            <div className="flex items-center gap-4">
              <button className="hover:text-[#53a2eb]">Previous</button>
              <button className="grid h-7 w-7 place-items-center rounded-md bg-[#53a2eb] font-semibold text-white">
                1
              </button>
              <button className="hover:text-[#53a2eb]">2</button>
              <button className="hover:text-[#53a2eb]">Next</button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
