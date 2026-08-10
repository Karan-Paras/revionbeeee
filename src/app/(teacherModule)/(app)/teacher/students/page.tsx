"use client";

import { Camille, Jisso, ProfileJordan, Yara } from "@/assets/images";
import { CalendarDays, Search, UserRoundCheck, UsersRound } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useMemo, useState } from "react";

type StudentStatus = "Active" | "Lead" | "Inactive";
type StudentFilter = "All" | "Active" | "Leads" | "Inactive";

type Student = {
  id: number;
  name: string;
  email: string;
  image: StaticImageData;
  phone: string;
  status: StudentStatus;
  sessions: number;
  spend: string;
};

const students: Student[] = [
  {
    id: 1,
    name: "Robert Fox",
    email: "robert.fox@example.com",
    image: ProfileJordan,
    phone: "(308) 555-0121",
    status: "Active",
    sessions: 120,
    spend: "$120",
  },
  {
    id: 2,
    name: "Theresa Webb",
    email: "theresa.webb@example.com",
    image: Jisso,
    phone: "(217) 555-0113",
    status: "Lead",
    sessions: 50,
    spend: "$120",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    image: Camille,
    phone: "(302) 555-0107",
    status: "Inactive",
    sessions: 4,
    spend: "$120",
  },
  {
    id: 4,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    image: Yara,
    phone: "(704) 555-0127",
    status: "Active",
    sessions: 150,
    spend: "$120",
  },
  {
    id: 5,
    name: "Albert Flores",
    email: "albert.flores@example.com",
    image: Jisso,
    phone: "(316) 555-0116",
    status: "Active",
    sessions: 200,
    spend: "$120",
  },
  {
    id: 6,
    name: "Robert Fox",
    email: "robert.fox@example.com",
    image: ProfileJordan,
    phone: "(208) 555-0112",
    status: "Active",
    sessions: 100,
    spend: "$120",
  },
  {
    id: 7,
    name: "Theresa Webb",
    email: "theresa.webb@example.com",
    image: Jisso,
    phone: "(415) 555-0198",
    status: "Lead",
    sessions: 75,
    spend: "$120",
  },
  {
    id: 8,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    image: Camille,
    phone: "(646) 555-0134",
    status: "Inactive",
    sessions: 18,
    spend: "$120",
  },
];

const filters: StudentFilter[] = ["All", "Active", "Leads", "Inactive"];

const statusColors: Record<StudentStatus, string> = {
  Active: "text-[#18bd55]",
  Lead: "text-[#f39818]",
  Inactive: "text-[#ff4552]",
};

const stats = [
  {
    value: "1000",
    label: "Total Students",
    icon: UsersRound,
    iconStyle: "bg-[#edf7ff] text-[#53a2eb]",
  },
  {
    value: "500",
    label: "Active Students",
    icon: UserRoundCheck,
    iconStyle: "bg-[#eaf9ee] text-[#27c65e]",
  },
  {
    value: "$12000",
    label: "Total Sessions",
    icon: CalendarDays,
    iconStyle: "bg-[#fff2e7] text-[#ff8e2b]",
  },
] as const;

export default function TeacherStudentsPage() {
  const [activeFilter, setActiveFilter] = useState<StudentFilter>("All");
  const [search, setSearch] = useState("");

  const visibleStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return students.filter((student) => {
      const statusMatches =
        activeFilter === "All" ||
        student.status === (activeFilter === "Leads" ? "Lead" : activeFilter);
      const searchMatches =
        !normalizedSearch ||
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.email.toLowerCase().includes(normalizedSearch) ||
        student.phone.includes(normalizedSearch);
      return statusMatches && searchMatches;
    });
  }, [activeFilter, search]);

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
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 rounded-md px-2 py-2 text-[11px] font-medium transition ${activeFilter === filter ? "bg-white text-[#242424] shadow-sm" : "text-[#999] hover:text-[#555]"}`}
              >
                {filter}
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

          <div className="divide-y divide-[#e9ecef]">
            {visibleStudents.map((student) => (
              <article
                key={student.id}
                className="grid gap-4 py-4 lg:grid-cols-[1.5fr_1.45fr_1fr_1.25fr_.8fr] lg:items-center lg:gap-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Image
                    src={student.image}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h2 className="truncate text-xs font-semibold text-[#252525]">
                      {student.name}
                    </h2>
                    <p className="truncate text-[10px] text-[#a0a0a0]">
                      {student.email}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                    Contact
                  </span>
                  <p className="text-xs text-[#303338]">{student.phone}</p>
                </div>
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
                <div>
                  <span className="mb-1 block text-[10px] text-[#999] lg:hidden">
                    Total Sessions
                  </span>
                  <span className="text-xs text-[#252525]">
                    {student.sessions}
                  </span>
                </div>
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

          {visibleStudents.length === 0 && (
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
            <span>Viewing {visibleStudents.length} out of 12</span>
            <div className="flex items-center gap-4">
              <button type="button" className="hover:text-[#53a2eb]">
                Previous
              </button>
              <button
                type="button"
                className="grid h-7 w-7 place-items-center rounded-md bg-[#53a2eb] font-semibold text-white"
              >
                1
              </button>
              <button type="button" className="hover:text-[#53a2eb]">
                2
              </button>
              <button type="button" className="hover:text-[#53a2eb]">
                Next
              </button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
