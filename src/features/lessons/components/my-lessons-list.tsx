"use client";

import { Clock3, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type LessonStatus = "upcoming" | "pending" | "cancelled";

const lessons = [
  { name: "Wade Warren", image: "/images/yara.png" },
  { name: "Robert Fox", image: "/images/jisso.png" },
  { name: "Albert Flores", image: "/images/profile_jordan.png" },
  { name: "Theresa Webb", image: "/images/camille.png" },
  { name: "Courtney Henry", image: "/images/pro_img.jpg" },
  { name: "Darrell Steward", image: "/images/jisso.png" },
  { name: "Bessie Cooper", image: "/images/profile_jordan.png" },
  { name: "Darlene Robertson", image: "/images/yara.png" },
  { name: "Jenny Wilson", image: "/images/camille.png" },
];

const tabs: Array<{ label: string; value: LessonStatus }> = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending Approval", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];

export function MyLessonsList() {
  const [activeTab, setActiveTab] = useState<LessonStatus>("pending");
  const [query, setQuery] = useState("");
  const visibleLessons = useMemo(
    () =>
      lessons.filter(({ name }) =>
        name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

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

        {activeTab !== "upcoming" ? (
          visibleLessons.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleLessons.map((lesson) => (
                <article
                  key={lesson.name}
                  className="rounded-xl border border-[#dedede] bg-white p-4 shadow-[0_12px_28px_rgba(37,65,92,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={lesson.image}
                      alt={lesson.name}
                      width={46}
                      height={46}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-[#111]">
                        {lesson.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#19bd57]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#19bd57]" />
                        Online
                      </p>
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded border px-2 py-1 text-[9px] font-medium ${activeTab === "cancelled" ? "border-[#ffccd0] bg-[#fff0f1] text-[#ff4c59]" : "border-[#ffd46f] bg-[#fff8df] text-[#f4ad00]"}`}
                    >
                      {activeTab === "cancelled" ? (
                        <>
                          <X size={11} /> Rejected
                        </>
                      ) : (
                        <>
                          <Clock3 size={11} /> Pending Approval
                        </>
                      )}
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-2 text-[10px] leading-4 text-[#77808f]">
                    We are seeking an experienced Instructional Designer to
                    create engaging and accessible learning materials for health
                    and education.
                  </p>
                  <div className="mt-4 grid grid-cols-2 rounded-md bg-[#f1f6fa] text-[10px] text-[#748096]">
                    <div className="border-r border-[#d7e0e8] px-3 py-2">
                      Subject:{" "}
                      <strong className="ml-2 text-[#202734]">Physics</strong>
                    </div>
                    <div className="flex justify-between px-3 py-2">
                      <span>
                        {activeTab === "cancelled" ? "Price:" : "Session Time:"}
                      </span>
                      <strong className="text-[#202734]">
                        {activeTab === "cancelled" ? "$10 per hour" : "1 hour"}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message={`No lessons found for “${query}”.`} />
          )
        ) : (
          <EmptyState
            message={`You don't have any ${activeTab} lessons yet.`}
          />
        )}
      </div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[#cfd7df] py-20 text-center text-sm text-[#788493]">
      {message}
    </div>
  );
}
