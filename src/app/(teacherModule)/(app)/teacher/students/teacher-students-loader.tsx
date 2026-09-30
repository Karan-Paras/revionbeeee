"use client";

import dynamic from "next/dynamic";

const TeacherStudentsContent = dynamic(
  () =>
    import("./teacher-students-content").then(
      (module) => module.TeacherStudentsContent
    ),
  {
    loading: () => (
      <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
        <div className="mx-auto max-w-[1440px]">
          <div className="h-8 w-32 animate-pulse rounded bg-[#e9ecef]" />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-[#e9ecef]" />
          <section className="mt-7 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[82px] animate-pulse rounded-xl bg-white"
              />
            ))}
          </section>
          <div className="mt-8 h-10 w-full max-w-[300px] animate-pulse rounded-lg bg-[#e9ecef]" />
          <section className="mt-4 h-[520px] animate-pulse rounded-[22px] bg-white" />
        </div>
      </main>
    ),
    ssr: false,
  }
);

export function TeacherStudentsLoader() {
  return <TeacherStudentsContent />;
}
