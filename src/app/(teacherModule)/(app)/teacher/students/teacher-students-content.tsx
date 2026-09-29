"use client";

import {
  getTeacherStudents,
  type StudentFilter,
  type StudentStatus,
} from "@/features/teacher/api/get-students";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Search, UserRoundCheck, UsersRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const filters: Array<{ label: string; value: StudentFilter }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const statusColors: Record<StudentStatus, string> = {
  Active: "text-[#18bd55]",
  Inactive: "text-[#ff4552]",
};

/** Returns up to 2 uppercase initials from a name string */
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/** Avatar: shows photo if available, otherwise clean initials placeholder */
function StudentAvatar({ image, name }: { image: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <Image
        src={image}
        alt={name}
        width={36}
        height={36}
        unoptimized
        onError={() => setImgError(true)}
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      aria-label={name}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f1fb] text-xs font-semibold text-[#3994e7]"
    >
      {getInitials(name)}
    </span>
  );
}

export function TeacherStudentsContent() {
  const [activeFilter, setActiveFilter] = useState<StudentFilter>("all");
  const [search, setSearch] = useState("");
  const { data, isPending, error } = useQuery({
    queryKey: ["teacher-students", activeFilter, search.trim()],
    queryFn: () =>
      getTeacherStudents({
        filter: activeFilter,
        search: search.trim(),
        perPage: 8,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const students = data?.students ?? [];
  const summary = data?.summary;

  const stats = [
    {
      value: (summary?.totalStudents ?? students.length).toLocaleString(),
      label: "Total Students",
      icon: UsersRound,
      iconStyle: "bg-[#edf7ff] text-[#53a2eb]",
    },
    {
      value: (
        summary?.activeStudents ??
        students.filter((s) => s.status === "Active").length
      ).toLocaleString(),
      label: "Active Students",
      icon: UserRoundCheck,
      iconStyle: "bg-[#eaf9ee] text-[#27c65e]",
    },
    {
      value: students
        .reduce((total, student) => total + student.sessions, 0)
        .toLocaleString(),
      label: "Total Sessions",
      icon: CalendarDays,
      iconStyle: "bg-[#fff2e7] text-[#ff8e2b]",
    },
  ];

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-[22px] font-bold leading-tight text-[#111]">
          Students
        </h1>
        <p className="mt-2 text-xs text-[#6f7378] sm:text-sm">
          Manage your student directory, contact information, progress notes,
          and lesson history.
        </p>

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          {stats.map(({ value, label, icon: Icon, iconStyle }) => (
            <article
              key={label}
              className="flex min-h-[82px] items-center justify-between rounded-xl bg-white px-4 py-3 shadow-[0_1px_3px_rgba(20,30,40,0.03)]"
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
          <div className="flex w-full rounded-lg bg-[#e7e8ea] p-1 sm:w-[300px]">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`flex-1 rounded-md px-2 py-2 text-[11px] font-medium transition ${activeFilter === filter.value ? "bg-white text-[#242424] shadow-sm" : "text-[#999] hover:text-[#555]"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-[#8e9296] bg-white px-3 text-[#777] focus-within:border-[#53a2eb] sm:w-[230px]">
            <Search size={16} strokeWidth={1.8} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              placeholder="Search..."
              aria-label="Search students"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#222] outline-none placeholder:text-[#777]"
            />
          </label>
        </div>

        <section className="mt-4 overflow-hidden rounded-[22px] bg-white px-4 py-2 shadow-[0_1px_2px_rgba(20,30,40,0.02)] sm:px-6">
          <div className="hidden grid-cols-[1.5fr_1.45fr_1fr_1.25fr_.8fr] gap-5 border-b border-[#e9ecef] py-4 text-xs font-medium text-[#999] lg:grid">
            <span>Client Details</span>
            <span>Contact</span>
            <span>Status</span>
            <span>Total Sessions</span>
            <span className="text-right">Total Spend</span>
          </div>

          {isPending ? (
            <div className="space-y-3 py-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 animate-pulse rounded-lg bg-[#f1f3f5]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="grid min-h-56 place-items-center px-4 text-center text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Unable to load students."}
            </div>
          ) : (
            <div className="divide-y divide-[#e9ecef]">
              {students.map((student) => (
                <article
                  key={student.id}
                  className="grid gap-4 py-4 lg:grid-cols-[1.5fr_1.45fr_1fr_1.25fr_.8fr] lg:items-center lg:gap-5"
                >
                  {/* Client Details */}
                  <div className="flex min-w-0 items-center gap-3">
                    <StudentAvatar image={student.image} name={student.name} />
                    <div className="min-w-0">
                      <h2 className="truncate text-xs font-semibold text-[#252525]">
                        {student.name}
                      </h2>
                      <p className="truncate text-[10px] text-[#a0a0a0]">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  {/* Contact — phone + email + last session */}
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Contact
                    </span>
                    <p className="text-xs text-[#303338]">{student.phone}</p>
                    {student.email !== "—" && (
                      <p className="mt-0.5 truncate text-[10px] text-[#a0a0a0]">
                        {student.email}
                      </p>
                    )}
                    {student.lastSessionAt && (
                      <p className="mt-0.5 text-[10px] text-[#b0b3b8]">
                        Last: {student.lastSessionAt}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Status
                    </span>
                    <span
                      className={`text-xs font-medium ${statusColors[student.status]}`}
                    >
                      {student.status}
                    </span>
                  </div>

                  {/* Total Sessions */}
                  <div>
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Total Sessions
                    </span>
                    <span className="text-xs text-[#252525]">
                      {student.sessions}
                    </span>
                  </div>

                  {/* Total Spend */}
                  <div className="lg:text-right">
                    <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                      Total Spend
                    </span>
                    <span className="text-xs text-[#252525]">
                      {student.spend}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isPending && !error && students.length === 0 && (
            <div className="grid min-h-56 place-items-center text-center">
              <div>
                <Search className="mx-auto mb-3 text-[#bbb]" />
                <p className="text-sm font-medium text-[#555]">
                  No students found
                </p>
                <p className="mt-1 text-xs text-[#999]">
                  Try another search or filter.
                </p>
              </div>
            </div>
          )}

          <footer className="flex items-center justify-between border-t border-[#e9ecef] py-5 text-[10px] text-[#777] sm:text-xs">
            <span>Viewing {students.length} students</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
