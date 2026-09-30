"use client";

import { FIREBASE_MESSAGING_READY_EVENT } from "@/lib/firebase-messaging-events";
import { useQueryClient } from "@tanstack/react-query";
import type { MessagePayload, Unsubscribe } from "firebase/messaging";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

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

    return () => {
      isMounted = false;
      window.removeEventListener(
        FIREBASE_MESSAGING_READY_EVENT,
        startListening
      );
      unsubscribeRef.current?.();
      unsubscribeRef.current = undefined;
    };
  }, [queryClient]);

  return null;
}
