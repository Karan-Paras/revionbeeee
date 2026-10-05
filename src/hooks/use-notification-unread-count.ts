"use client";

import {
  getTeacherNotifications,
  markTeacherNotificationsRead,
} from "@/features/teacher/api/get-notifications";
import {
  getStudentNotifications,
  getStudentUnreadCount,
  markAllStudentNotificationsRead,
} from "@/features/user/api/get-notifications";
import {
  addStoredUnreadCount,
  decrementStoredUnreadCount,
  markActiveNotificationAudience,
  NOTIFICATION_UNREAD_CHANGED_EVENT,
  readStoredUnreadCount,
  writeStoredUnreadCount,
  type NotificationAudience,
} from "@/lib/notification-unread-store";
import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";

const NOTIFICATION_REFETCH_INTERVAL = 15_000;

export function notificationUnreadCountKey(audience: NotificationAudience) {
  return [`${audience}-notifications-unread-count`];
}

function notificationListKey(audience: NotificationAudience) {
  return [`${audience}-notifications`];
}

async function fetchStudentBackendUnreadCount(queryClient: QueryClient) {
  const endpointCount = await getStudentUnreadCount().catch(() => 0);
  if (endpointCount > 0) return endpointCount;

  const notifications = await queryClient
    .fetchQuery({
      queryKey: notificationListKey("student"),
      queryFn: getStudentNotifications,
      staleTime: 0,
    })
    .catch(() => []);

  return notifications.filter((notification) => notification.unread).length;
}

async function fetchTeacherBackendUnreadCount(queryClient: QueryClient) {
  const notifications = await queryClient
    .fetchQuery({
      queryKey: notificationListKey("teacher"),
      queryFn: getTeacherNotifications,
      staleTime: 0,
    })
    .catch(() => []);

  return notifications.filter((notification) => notification.unread).length;
}

function fetchBackendUnreadCount(
  audience: NotificationAudience,
  queryClient: QueryClient
) {
  return audience === "teacher"
    ? fetchTeacherBackendUnreadCount(queryClient)
    : fetchStudentBackendUnreadCount(queryClient);
}

export async function syncUnreadCount(
  audience: NotificationAudience,
  queryClient: QueryClient
) {
  const storedCount = readStoredUnreadCount(audience);
  const backendCount = await fetchBackendUnreadCount(
    audience,
    queryClient
  ).catch(() => 0);
  const nextCount = Math.max(storedCount, backendCount);

  writeStoredUnreadCount(audience, nextCount);
  return nextCount;
}

type UnreadChangedEvent = CustomEvent<{
  audience: NotificationAudience;
  count: number;
}>;

export function useNotificationUnreadCount(audience: NotificationAudience) {
  const queryClient = useQueryClient();
  const queryKey = useMemo(
    () => notificationUnreadCountKey(audience),
    [audience]
  );

  const { data: unreadCount = 0 } = useQuery({
    queryKey,
    queryFn: () => syncUnreadCount(audience, queryClient),
    initialData: () => readStoredUnreadCount(audience),
    staleTime: 0,
    refetchInterval: NOTIFICATION_REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });

  useEffect(() => {
    markActiveNotificationAudience(audience);
  }, [audience]);

  useEffect(() => {
    function handleUnreadChanged(event: Event) {
      const { audience: changedAudience, count } =
        (event as UnreadChangedEvent).detail ?? {};

      if (changedAudience !== audience) return;
      queryClient.setQueryData<number>(queryKey, count);
    }

    window.addEventListener(
      NOTIFICATION_UNREAD_CHANGED_EVENT,
      handleUnreadChanged
    );

    return () => {
      window.removeEventListener(
        NOTIFICATION_UNREAD_CHANGED_EVENT,
        handleUnreadChanged
      );
    };
  }, [audience, queryClient, queryKey]);

  const bumpUnreadCount = useCallback(
    (amount = 1) => {
      addStoredUnreadCount(audience, amount);
      queryClient.invalidateQueries({
        queryKey: notificationListKey(audience),
      });
    },
    [audience, queryClient]
  );

  const decrementUnreadCount = useCallback(() => {
    decrementStoredUnreadCount(audience);
  }, [audience]);

  const clearUnreadCount = useCallback(() => {
    writeStoredUnreadCount(audience, 0);
    queryClient.setQueriesData<{ unread?: boolean }[] | undefined>(
      { queryKey: notificationListKey(audience) },
      (current) => current?.map((item) => ({ ...item, unread: false }))
    );
    queryClient.invalidateQueries({ queryKey: notificationListKey(audience) });
  }, [audience, queryClient]);

  const { mutate: markAllReadOnServer, isPending: isMarkingRead } = useMutation(
    {
      mutationFn:
        audience === "teacher"
          ? markTeacherNotificationsRead
          : markAllStudentNotificationsRead,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    }
  );

  const handleMarkAllRead = useCallback(() => {
    if (unreadCount <= 0) return;
    clearUnreadCount();
    markAllReadOnServer(undefined, {
      onError: () => {
        /* keep the optimistic reset even if the API call fails */
      },
    });
  }, [clearUnreadCount, markAllReadOnServer, unreadCount]);

  return {
    unreadCount,
    isMarkingRead,
    markAllRead: handleMarkAllRead,
    bumpUnreadCount,
    decrementUnreadCount,
  };
}
