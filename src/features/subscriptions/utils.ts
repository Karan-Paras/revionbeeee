import { addDays, isFuture } from "date-fns";

const freeTrialSelectionKeyPrefix = "revision-bee:free-trial-selected";

export function isUserSubscribed(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true";
}

export function getFreeTrialExpiryDate(createdAt?: string | null): Date | null {
  if (!createdAt) return null;

  const createdDate = new Date(createdAt);
  if (Number.isNaN(createdDate.getTime())) return null;

  return addDays(createdDate, 3);
}

export function isFreeTrialActive(createdAt?: string | null): boolean {
  const expiryDate = getFreeTrialExpiryDate(createdAt);

  return expiryDate ? isFuture(expiryDate) : false;
}

function getFreeTrialSelectionKey(userId?: unknown) {
  return `${freeTrialSelectionKeyPrefix}:${String(userId ?? "anonymous")}`;
}

export function markFreeTrialSelected(userId?: unknown) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(getFreeTrialSelectionKey(userId), "1");
  } catch {
    /* ignore storage access errors */
  }
}

export function hasSelectedFreeTrial(userId?: unknown): boolean {
  if (typeof window === "undefined") return false;

  try {
    return (
      window.localStorage.getItem(getFreeTrialSelectionKey(userId)) === "1"
    );
  } catch {
    return false;
  }
}

export function hasActiveSelectedFreeTrial(
  userId?: unknown,
  createdAt?: string | null
): boolean {
  return hasSelectedFreeTrial(userId) && isFreeTrialActive(createdAt);
}
