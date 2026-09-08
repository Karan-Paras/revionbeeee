"use client";

import { paths } from "@/routes";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

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
  const isRedirectingRef = useRef(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const role = session.user.userType;
    if (role !== "student" && role !== "teacher") return;

    const target = role === "teacher" ? "/teacher/session" : paths.session();

    const recoverActiveSession = () => {
      if (window.location.pathname === target) {
        isRedirectingRef.current = false;
        return;
      }

      if (isRedirectingRef.current || !hasValidActiveSession(role)) {
        return;
      }

      isRedirectingRef.current = true;
      window.location.replace(target);
    };

    recoverActiveSession();
    window.addEventListener(
      activeLessonSessionReadyEvent,
      recoverActiveSession
    );
    window.addEventListener("focus", recoverActiveSession);
    window.addEventListener("pageshow", recoverActiveSession);
    const interval = window.setInterval(recoverActiveSession, 2_000);

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

  return null;
}
