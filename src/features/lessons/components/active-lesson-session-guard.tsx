"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export const activeLessonSessionStorageKey =
  "revision-bee:active-lesson-session";
export const activeLessonSessionReadyEvent =
  "revision-bee:active-lesson-session-ready";

type StoredActiveSession = {
  appId?: unknown;
  channelName?: unknown;
  token?: unknown;
  uid?: unknown;
  lessonID?: unknown;
  expiresAt?: unknown;
  sessionRole?: unknown;
};

const LessonSessionPage = dynamic(
  () =>
    import("@/features/lessons/components/lesson-session-page").then(
      (module) => module.LessonSessionPage
    ),
  { ssr: false }
);

function hasValidActiveSession(role: "student" | "teacher") {
  try {
    const rawSession = sessionStorage.getItem(activeLessonSessionStorageKey);
    if (!rawSession) return false;

    const session = JSON.parse(rawSession) as StoredActiveSession;
    const isValid =
      typeof session.appId === "string" &&
      Boolean(session.appId) &&
      typeof session.channelName === "string" &&
      Boolean(session.channelName) &&
      typeof session.token === "string" &&
      Boolean(session.token) &&
      session.uid !== undefined &&
      session.lessonID !== undefined &&
      typeof session.expiresAt === "number" &&
      session.expiresAt > Date.now() &&
      (session.sessionRole === undefined || session.sessionRole === role);

    if (!isValid) sessionStorage.removeItem(activeLessonSessionStorageKey);
    return isValid;
  } catch {
    sessionStorage.removeItem(activeLessonSessionStorageKey);
    return false;
  }
}

export function ActiveLessonSessionGuard() {
  const { data: session, status } = useSession();
  const [hasActiveSession, setHasActiveSession] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") {
      setHasActiveSession(false);
      return;
    }

    const role = session.user.userType;
    if (role !== "student" && role !== "teacher") {
      setHasActiveSession(false);
      return;
    }

    const recoverActiveSession = () => {
      setHasActiveSession(hasValidActiveSession(role));
    };

    recoverActiveSession();
    window.addEventListener(
      activeLessonSessionReadyEvent,
      recoverActiveSession
    );
    window.addEventListener("focus", recoverActiveSession);
    window.addEventListener("pageshow", recoverActiveSession);
    const interval = window.setInterval(recoverActiveSession, 15_000);

    return () => {
      window.removeEventListener(
        activeLessonSessionReadyEvent,
        recoverActiveSession
      );
      window.removeEventListener("focus", recoverActiveSession);
      window.removeEventListener("pageshow", recoverActiveSession);
      window.clearInterval(interval);
    };
  }, [session?.user.userType, status]);

  return hasActiveSession ? <LessonSessionPage /> : null;
}
