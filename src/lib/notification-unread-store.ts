"use client";

export type NotificationAudience = "student" | "teacher";

export const NOTIFICATION_UNREAD_CHANGED_EVENT =
  "revision-bee:notification-unread-changed";

export const ACTIVE_AUDIENCE_STORAGE_KEY =
  "revision-bee:active-notification-audience";

function storageKey(audience: NotificationAudience) {
  return `revision-bee:${audience}-notification-unread-count`;
}

function getStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function broadcastChange(audience: NotificationAudience, count: number) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(NOTIFICATION_UNREAD_CHANGED_EVENT, {
      detail: { audience, count },
    })
  );
}

export function readStoredUnreadCount(audience: NotificationAudience): number {
  const storage = getStorage();
  if (!storage) return 0;

  try {
    const count = Number(storage.getItem(storageKey(audience)));
    return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
  } catch {
    return 0;
  }
}

export function writeStoredUnreadCount(
  audience: NotificationAudience,
  count: number
) {
  const safeCount = Math.max(0, Math.floor(count));
  const previousCount = readStoredUnreadCount(audience);
  const storage = getStorage();

  if (storage) {
    try {
      if (safeCount === 0) {
        storage.removeItem(storageKey(audience));
      } else {
        storage.setItem(storageKey(audience), String(safeCount));
      }
    } catch {
      /* ignore storage access errors (private mode / quota) */
    }
  }

  if (safeCount !== previousCount) broadcastChange(audience, safeCount);
}

export function addStoredUnreadCount(
  audience: NotificationAudience,
  amount = 1
) {
  const delta = Number.isFinite(amount) ? Math.floor(amount) : 0;
  const nextCount = Math.max(0, readStoredUnreadCount(audience) + delta);
  writeStoredUnreadCount(audience, nextCount);
  return nextCount;
}

export function incrementStoredUnreadCount(audience: NotificationAudience) {
  return addStoredUnreadCount(audience, 1);
}

export function decrementStoredUnreadCount(audience: NotificationAudience) {
  return addStoredUnreadCount(audience, -1);
}

export function markActiveNotificationAudience(audience: NotificationAudience) {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(ACTIVE_AUDIENCE_STORAGE_KEY, audience);
  } catch {
    /* ignore storage access errors */
  }
}
