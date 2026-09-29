"use client";

import dynamic from "next/dynamic";

const TeacherDashboardContent = dynamic(
  () =>
    import("@/features/teacher/components/teacher-dashboard").then(
      (module) => module.TeacherDashboardContent
    ),
  {
    loading: () => (
      <main className="p-5 sm:p-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="h-8 w-36 animate-pulse rounded bg-[#e9ecef]" />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-[#e9ecef]" />
          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[92px] animate-pulse rounded-xl bg-white"
              />
            ))}
          </section>
          <div className="mt-7 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
            <section className="h-[360px] animate-pulse rounded-2xl bg-white" />
            <section className="h-[360px] animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </main>
    ),
    ssr: false,
  }
);

export function TeacherDashboardLoader() {
  return <TeacherDashboardContent />;
}
