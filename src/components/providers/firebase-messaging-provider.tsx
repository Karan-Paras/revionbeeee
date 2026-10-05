"use client";

import { notificationUnreadCountKey } from "@/hooks/use-notification-unread-count";
import {
  FIREBASE_BACKGROUND_MESSAGE_EVENT,
  FIREBASE_MESSAGING_READY_EVENT,
} from "@/lib/firebase-messaging-events";
import {
  incrementStoredUnreadCount,
  readStoredUnreadCount,
  writeStoredUnreadCount,
  type NotificationAudience,
} from "@/lib/notification-unread-store";
import { useQueryClient } from "@tanstack/react-query";
import type { MessagePayload, Unsubscribe } from "firebase/messaging";
import { useSession } from "next-auth/react";
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

function isNotificationAudience(value: unknown): value is NotificationAudience {
  return value === "student" || value === "teacher";
}

export function FirebaseMessagingProvider() {
  const unsubscribeRef = useRef<Unsubscribe | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userType = session?.user?.userType;

  useEffect(() => {
    if (!isNotificationAudience(userType)) return;

    const storedCount = readStoredUnreadCount(userType);
    if (storedCount <= 0) return;

    queryClient.setQueryData<number>(
      notificationUnreadCountKey(userType),
      storedCount
    );
  }, [queryClient, userType]);

  useEffect(() => {
    let isMounted = true;

    function resolveAudience(value: unknown): NotificationAudience | undefined {
      if (isNotificationAudience(value)) return value;
      return isNotificationAudience(userType) ? userType : undefined;
    }

    function refreshNotificationBadges(audience: NotificationAudience) {
      queryClient.invalidateQueries({
        queryKey: [`${audience}-notifications`],
      });
      queryClient.invalidateQueries({
        queryKey: notificationUnreadCountKey(audience),
      });
    }

    function handleForegroundMessage(payload: MessagePayload) {
      showForegroundMessage(payload);

      const audience = resolveAudience(null);
      if (!audience) return;

      incrementStoredUnreadCount(audience);
      refreshNotificationBadges(audience);
    }

    function handleServiceWorkerMessage(event: MessageEvent) {
      const data = event.data as {
        type?: string;
        audience?: unknown;
        unreadCount?: unknown;
      } | null;

      if (data?.type !== FIREBASE_BACKGROUND_MESSAGE_EVENT) return;

      const audience = resolveAudience(data.audience);
      if (!audience) return;

      const serviceWorkerCount = Number(data.unreadCount);

      // The service worker already persisted the bumped count to localStorage,
      // so re-sync from storage instead of counting the same message twice.
      if (Number.isFinite(serviceWorkerCount) && serviceWorkerCount > 0) {
        writeStoredUnreadCount(
          audience,
          Math.max(readStoredUnreadCount(audience), serviceWorkerCount)
        );
      } else {
        incrementStoredUnreadCount(audience);
      }

      refreshNotificationBadges(audience);
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
  }, [queryClient, userType]);

  return null;
}
