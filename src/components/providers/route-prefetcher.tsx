"use client";

import { paths } from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RoutePrefetcherProps = {
  routes: string[];
};

function runWhenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = globalThis.setTimeout(callback, 600);
  return () => globalThis.clearTimeout(timeoutId);
}

export function RoutePrefetcher({ routes }: RoutePrefetcherProps) {
  const router = useRouter();

  useEffect(() => {
    return runWhenIdle(() => {
      routes.forEach((route) => {
        router.prefetch(route);
      });
    });
  }, [router, routes]);

  return null;
}

export const studentPrefetchRoutes = [
  paths.dashboard(),
  paths.lessons(),
  paths.myLessons(),
  paths.progress(),
  paths.subjects(),
  paths.quiz(),
];

export const teacherPrefetchRoutes = [
  paths.teacherDashboard(),
  "/teacher/bookings",
  "/teacher/bookings/pending",
  "/teacher/bookings/accepted",
  "/teacher/students",
  "/teacher/earnings",
  "/teacher/profile",
  paths.teacherNotifications(),
];
