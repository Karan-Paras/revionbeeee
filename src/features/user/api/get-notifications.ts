import { fetchClient } from "@/lib/fetch-client";

const notificationsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/notifications/list";
const unreadCountUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/notifications/unread-count";
const markReadUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/notifications/mark-read";

type ApiRecord = Record<string, unknown>;

export type StudentNotification = {
  id: string | number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "booking" | "payment" | "lesson" | "general";
  lessonTab: "upcoming" | "pending" | "accepted" | "cancelled" | "completed";
};

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(record: ApiRecord, ...keys: string[]): string {
  for (const key of keys) {
    const v = record[key];
    if (typeof v === "string" || typeof v === "number") return String(v).trim();
  }
  return "";
}

function findNotifications(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];
  for (const key of ["notifications", "data", "items", "results", "list"]) {
    if (Array.isArray(value[key])) return value[key].filter(isRecord);
  }
  for (const nested of Object.values(value)) {
    const found = findNotifications(nested);
    if (found.length) return found;
  }
  return [];
}

function formatRelativeTime(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60)
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function inferType(record: ApiRecord): StudentNotification["type"] {
  const combined = [
    text(record, "type", "notificationType", "notification_type", "category"),
    text(record, "title"),
    text(record, "message", "body"),
  ]
    .join(" ")
    .toLowerCase();

  if (combined.includes("payment") || combined.includes("paid"))
    return "payment";
  if (
    combined.includes("book") ||
    combined.includes("request") ||
    combined.includes("lesson")
  )
    return "booking";
  if (combined.includes("session") || combined.includes("join"))
    return "lesson";
  return "general";
}

function inferLessonTab(record: ApiRecord): StudentNotification["lessonTab"] {
  const combined = [
    text(
      record,
      "status",
      "bookingStatus",
      "booking_status",
      "lessonStatus",
      "lesson_status",
      "sessionStatus",
      "session_status",
      "paymentStatus",
      "payment_status"
    ),
    text(record, "type", "notificationType", "notification_type", "category"),
    text(record, "title", "heading", "subject"),
    text(record, "message", "body", "description", "content"),
  ]
    .join(" ")
    .toLowerCase();

  if (
    combined.includes("cancelled") ||
    combined.includes("canceled") ||
    combined.includes("rejected")
  ) {
    return "cancelled";
  }

  if (combined.includes("payment") || combined.includes("paid")) {
    return "upcoming";
  }

  if (
    combined.includes("approved") ||
    combined.includes("accepted") ||
    combined.includes("scheduled") ||
    combined.includes("upcoming") ||
    combined.includes("booked")
  ) {
    return "upcoming";
  }

  if (
    combined.includes("completed") ||
    combined.includes("complete") ||
    combined.includes("finished")
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

export async function getStudentUnreadCount(): Promise<number> {
  const response = await fetchClient<unknown>(unreadCountUrl, "GET");

  // DEBUG — remove after confirming the correct key
  console.log(
    "[unread-count] raw response:",
    JSON.stringify(response, null, 2)
  );

  // Helper: extract a non-negative integer from any value
  function extractCount(v: unknown): number | null {
    if (typeof v === "number" && Number.isFinite(v) && v >= 0)
      return Math.floor(v);
    if (typeof v === "string" && v.trim()) {
      const parsed = Number(v.replace(/[^\d.-]/g, ""));
      if (Number.isFinite(parsed) && parsed >= 0) return Math.floor(parsed);
    }
    return null;
  }

  const countKeys = [
    "count",
    "unreadCount",
    "unread_count",
    "unread",
    "totalCount",
    "total",
    "total_count",
    "notificationCount",
    "notification_count",
  ];

  // Check top-level response first
  const topLevel = response as unknown as ApiRecord;
  for (const key of countKeys) {
    const v = extractCount(topLevel[key]);
    if (v !== null) return v;
  }

  // Check response.data if it's a number
  const directCount = extractCount(response.data);
  if (directCount !== null) return directCount;

  // Check response.data if it's an object
  if (isRecord(response.data)) {
    for (const key of countKeys) {
      const v = extractCount((response.data as ApiRecord)[key]);
      if (v !== null) return v;
    }
    // Check one level deeper (e.g. response.data.data)
    const nested = (response.data as ApiRecord).data;
    if (isRecord(nested)) {
      for (const key of countKeys) {
        const v = extractCount((nested as ApiRecord)[key]);
        if (v !== null) return v;
      }
    }
    if (typeof nested === "number") {
      const v = extractCount(nested);
      if (v !== null) return v;
    }
  }

  return 0;
}

export async function markStudentNotificationsRead(
  ids?: (string | number)[]
): Promise<void> {
  await fetchClient<unknown>(
    markReadUrl,
    "POST",
    ids && ids.length ? { notificationIds: ids } : {}
  );
}

export async function markAllStudentNotificationsRead(): Promise<void> {
  await markStudentNotificationsRead();
}

export async function getStudentNotifications(): Promise<
  StudentNotification[]
> {
  const response = await fetchClient<unknown>(notificationsUrl, "GET");
  return findNotifications(response.data).map((item, index) => {
    const isUnread =
      item.isRead === false ||
      item.is_read === false ||
      item.read === false ||
      item.isRead === 0 ||
      item.is_read === 0 ||
      item.read === 0 ||
      item.unread === true ||
      item.status === "unread";

    const rawTime = text(
      item,
      "createdAt",
      "created_at",
      "notifiedAt",
      "notified_at",
      "date",
      "time",
      "timestamp"
    );

    return {
      id:
        text(item, "id", "notificationId", "notification_id") || String(index),
      title: text(item, "title", "heading", "subject") || "Notification",
      message: text(item, "message", "body", "description", "content") || "",
      time: formatRelativeTime(rawTime) || rawTime || "",
      unread: isUnread,
      type: inferType(item),
      lessonTab: inferLessonTab(item),
    };
  });
}
