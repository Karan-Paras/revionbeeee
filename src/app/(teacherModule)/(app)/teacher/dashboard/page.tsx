import { Camille, Jisso, ProfileJordan, Yara } from "@/assets/images";
import {
  AlertTriangle,
  CalendarDays,
  Clock3,
  DollarSign,
  Video,
} from "lucide-react";
import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";

export const metadata: Metadata = {
  title: "Teacher Dashboard - Revision Bee",
  description: "Manage lessons, bookings, and students.",
};

const stats = [
  {
    value: "2 Sessions",
    label: "Today's Lessons",
    icon: CalendarDays,
    color: "blue",
  },
  {
    value: "3 Pending",
    label: "Booking Requests",
    icon: AlertTriangle,
    color: "orange",
  },
  { value: "328 Hours", label: "Total Taught", icon: Clock3, color: "purple" },
  { value: "$12000", label: "Total Earning", icon: DollarSign, color: "green" },
] as const;

const lessons: Array<{
  name: string;
  topic: string;
  image: StaticImageData;
  active?: boolean;
}> = [
  {
    name: "Arlene McCoy",
    topic: "Vector Calculus & 3D Geometry Equations",
    image: Jisso,
    active: true,
  },
  {
    name: "Kathryn Murphy",
    topic: "Vector Calculus & 3D Geometry Equations",
    image: Yara,
  },
  {
    name: "Guy Hawkins",
    topic: "Vector Calculus & 3D Geometry Equations",
    image: ProfileJordan,
  },
  {
    name: "Devon Lane",
    topic: "Vector Calculus & 3D Geometry Equations",
    image: Camille,
  },
  {
    name: "Kathryn Murphy",
    topic: "Vector Calculus & 3D Geometry Equations",
    image: Yara,
  },
];

const requests = [
  { name: "Theresa Webb", image: Jisso },
  { name: "Bessie Cooper", image: Camille },
  { name: "Kathryn Murphy", image: Yara },
];

const statColors = {
  blue: "bg-[#eaf5ff] text-[#429bea]",
  orange: "bg-[#fff2e5] text-[#ff9b32]",
  purple: "bg-[#f1edff] text-[#8668ff]",
  green: "bg-[#e8faee] text-[#31c86b]",
};

export default function TeacherDashboard() {
  return (
    <main className="p-5 sm:p-8">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-2xl font-bold text-[#111]">Dashboard</h1>
        <p className="mt-1 text-xs text-[#666] sm:text-sm">
          Lorem ipsum dolor sit amet consectetur. Aenean facilisi adipiscing
          volutpat nisl id enim diam.
        </p>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ value, label, icon: Icon, color }) => (
            <article
              key={value}
              className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold">{value}</h2>
                <p className="mt-1 text-sm text-[#999]">{label}</p>
              </div>
              <span
                className={`grid h-11 w-11 place-items-center rounded-lg ${statColors[color]}`}
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
              <button className="text-sm font-medium text-[#429bea]">
                View All
              </button>
            </div>
            <div className="divide-y divide-[#edf0f2]">
              {lessons.map((lesson, index) => (
                <article
                  key={`${lesson.name}-${index}`}
                  className="flex items-center gap-3 py-4"
                >
                  <Image
                    src={lesson.image}
                    alt={lesson.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold">{lesson.name}</h3>
                    <p className="truncate text-xs text-[#999]">
                      {lesson.topic}
                    </p>
                    <p className="mt-1 flex gap-4 text-[11px] text-[#999]">
                      <span>▣ 2026-07-30 at 15:00</span>
                      <span>◷ 60 Minutes</span>
                    </p>
                  </div>
                  <button
                    className={`hidden items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white sm:flex ${lesson.active ? "bg-[#53a2eb]" : "bg-[#c9c9c9]"}`}
                  >
                    <Video size={17} />
                    Launch Session
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#edf0f2] pb-4">
              <h2 className="font-bold">
                Recent Requests{" "}
                <span className="ml-1 rounded-full bg-[#fff0d9] px-2 py-0.5 text-xs text-[#f5a623]">
                  4
                </span>
              </h2>
              <button className="text-sm font-medium text-[#429bea]">
                View All
              </button>
            </div>
            <div className="divide-y divide-[#edf0f2]">
              {requests.map(({ name, image }) => (
                <article key={name} className="py-4">
                  <div className="flex gap-3">
                    <Image
                      src={image}
                      alt={name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-semibold">{name}</h3>
                        <span className="text-sm font-semibold text-[#25c966]">
                          $850
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-[#3f9ee9]">
                        IB HL Physics
                      </p>
                      <p className="truncate text-[11px] text-[#999]">
                        Electromagnetism & Wave Mechanics Revision
                      </p>
                      <p className="mt-1 text-[11px] text-[#999]">
                        ▣ 2026-07-30 at 15:00　◷ 60 Minutes
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
                    <button className="rounded-md bg-[#2dcc66] py-2 text-xs font-semibold text-white">
                      Accept
                    </button>
                    <button className="rounded-md bg-[#e3e3e3] px-5 text-xs font-medium text-[#555]">
                      Decline
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
