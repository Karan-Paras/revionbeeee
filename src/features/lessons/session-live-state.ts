"use client";

type LessonLiveStatus = "live" | "ended";

const liveStatePrefix = "revision-bee:lesson-live:";

function keyForLesson(lessonID: string | number) {
  return `${liveStatePrefix}${lessonID}`;
}

export function markLessonLive(lessonID: string | number) {
  try {
    localStorage.setItem(
      keyForLesson(lessonID),
      JSON.stringify({
        status: "live" satisfies LessonLiveStatus,
        at: Date.now(),
      })
    );
  } catch {}
}

export function markLessonEnded(lessonID: string | number) {
  try {
    localStorage.setItem(
      keyForLesson(lessonID),
      JSON.stringify({
        status: "ended" satisfies LessonLiveStatus,
        at: Date.now(),
      })
    );
  } catch {}
}

export function isLessonLiveLocally(lessonID: string | number) {
  try {
    const value = JSON.parse(
      localStorage.getItem(keyForLesson(lessonID)) ?? "null"
    ) as {
      status?: unknown;
    } | null;
    return value?.status === "live";
  } catch {
    return false;
  }
}

export function isLiveSessionValue(value: unknown) {
  if (value === true || value === 1) return true;
  if (typeof value !== "string" && typeof value !== "number") return false;

  return [
    "live",
    "started",
    "start",
    "ongoing",
    "inprogress",
    "in_progress",
    "running",
    "active",
  ].includes(String(value).trim().toLowerCase());
}
