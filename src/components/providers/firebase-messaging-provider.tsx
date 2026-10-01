"use client";

import type { TeacherNotification } from "@/features/teacher/api/get-notifications";
import type { StudentNotification } from "@/features/user/api/get-notifications";
import { FIREBASE_MESSAGING_READY_EVENT } from "@/lib/firebase-messaging-events";
import { useQueryClient } from "@tanstack/react-query";
import type { MessagePayload, Unsubscribe } from "firebase/messaging";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const backgroundMessageType = "revision-bee:firebase-background-message";

function canListenForMessages() {
  return "Notification" in window && Notification.permission === "granted";
}

function showForegroundMessage(payload: MessagePayload) {
  const title = payload.notification?.title ?? "Revision Bee";
  const description =
    payload.notification?.body ?? payload.data?.body ?? "New notification";
  const link = payload.fcmOptions?.link ?? payload.data?.link;

  toast(title, {
    description,
    ...(link
      ? {
          action: {
            label: "Open",
            onClick: () => window.location.assign(link),
          },
        }
      : {}),
  });
}

function notificationText(payload: MessagePayload) {
  const title =
    payload.notification?.title ??
    payload.data?.title ??
    payload.data?.heading ??
    "Notification";
  const message =
    payload.notification?.body ??
    payload.data?.body ??
    payload.data?.message ??
    payload.data?.description ??
    "";

  return { title, message };
}

function notificationType(
  title: string,
  message: string
): StudentNotification["type"] {
  const combined = `${title} ${message}`.toLowerCase();
  if (combined.includes("payment") || combined.includes("paid"))
    return "payment";
  if (combined.includes("session") || combined.includes("join"))
    return "lesson";
  if (
    combined.includes("book") ||
    combined.includes("request") ||
    combined.includes("lesson")
  ) {
    return "booking";
  }
  return "general";
}

function lessonTab(
  title: string,
  message: string
): StudentNotification["lessonTab"] {
  const combined = `${title} ${message}`.toLowerCase();
  if (
    combined.includes("cancelled") ||
    combined.includes("canceled") ||
    combined.includes("rejected") ||
    combined.includes("expired")
  ) {
    return "cancelled";
  }
  if (
    combined.includes("session ended") ||
    combined.includes("has ended") ||
    combined.includes("completed") ||
    combined.includes("finished") ||
    combined.includes("closed")
  ) {
    return "completed";
  }
  if (
    combined.includes("pending") ||
    combined.includes("approval") ||
    combined.includes("requested")
  ) {
    return "pending";
  }
  return "upcoming";
}

function teacherHref(title: string, message: string) {
  const combined = `${title} ${message}`.toLowerCase();
  if (
    combined.includes("payout") ||
    combined.includes("earning") ||
    combined.includes("released to your account")
  ) {
    return "/teacher/earnings";
  }
  if (
    combined.includes("ended") ||
    combined.includes("completed") ||
    combined.includes("finished") ||
    combined.includes("automatically closed")
  ) {
    return "/teacher/bookings?tab=Completed";
  }
  if (
    combined.includes("starting soon") ||
    combined.includes("starting now") ||
    combined.includes("time has arrived") ||
    combined.includes("please join") ||
    combined.includes("payment")
  ) {
    return "/teacher/bookings/accepted";
  }
  if (
    combined.includes("new lesson request") ||
    combined.includes("requested") ||
    combined.includes("pending") ||
    combined.includes("approval")
  ) {
    return "/teacher/bookings/pending";
  }
  return "/teacher/bookings";
}

export function FirebaseMessagingProvider() {
  const unsubscribeRef = useRef<Unsubscribe | undefined>(undefined);
  const queryClient = useQueryClient();

  useEffect(() => {
    let isMounted = true;

    function refreshNotificationBadges() {
      queryClient.setQueryData<number>(
        ["student-notifications-unread-count"],
        (current = 0) => current + 1
      );
      queryClient.invalidateQueries();
    }

    function handleForegroundMessage(payload: MessagePayload) {
      showForegroundMessage(payload);
      // i have remove payload from this function
      refreshNotificationBadges();
    }

    async function startListening() {
      if (!canListenForMessages() || unsubscribeRef.current) return;

      try {
        const { listenForForegroundMessages } = await import("@/lib/firebase");
        if (!isMounted || !canListenForMessages() || unsubscribeRef.current) {
          return;
        }

        unsubscribeRef.current = await listenForForegroundMessages(
          handleForegroundMessage
        );
      } catch (error) {
        console.error("Unable to initialize Firebase messaging", error);
      }
    }

    void startListening();
    window.addEventListener(FIREBASE_MESSAGING_READY_EVENT, startListening);
    navigator.serviceWorker?.addEventListener(
      "message",
      handleServiceWorkerMessage
    );

    return () => {
      isMounted = false;
      window.removeEventListener(
        FIREBASE_MESSAGING_READY_EVENT,
        startListening
      );
      navigator.serviceWorker?.removeEventListener(
        "message",
        handleServiceWorkerMessage
      );
      unsubscribeRef.current?.();
      unsubscribeRef.current = undefined;
    };
  }, [queryClient]);

  return null;
}
