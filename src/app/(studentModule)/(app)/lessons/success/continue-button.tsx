"use client";

import { paths } from "@/routes";

const paidLessonRedirectKey = "revision-bee:paid-lesson-redirects";

function rememberPaidLesson(lessonID?: string) {
  if (!lessonID) return;

  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(paidLessonRedirectKey) ?? "[]"
    );
    const ids = Array.isArray(value) ? value.map(String) : [];
    localStorage.setItem(
      paidLessonRedirectKey,
      JSON.stringify(Array.from(new Set([...ids, String(lessonID)])))
    );
  } catch {
    localStorage.setItem(paidLessonRedirectKey, JSON.stringify([lessonID]));
  }
}

export function ContinueButton({ lessonID }: { lessonID?: string }) {
  const handleContinue = () => {
    rememberPaidLesson(lessonID);
    window.location.assign(paths.myLessons());
  };

  return (
    <button
      type="button"
      onClick={handleContinue}
      className="mt-6 grid h-12 w-full place-items-center rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-md hover:bg-[#398fdc]"
    >
      Continue
    </button>
  );
}
