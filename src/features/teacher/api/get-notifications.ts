import { fetchClient } from "@/lib/fetch-client";

const notificationsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/notifications/list";
const markReadUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/notifications/mark-read";

type ApiRecord = Record<string, unknown>;

export type TeacherNotification = {
  id: string | number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "booking" | "payment" | "lesson" | "general";
  href: string;
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

function inferType(record: ApiRecord): TeacherNotification["type"] {
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

function inferHref(record: ApiRecord): string {
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

export async function getTeacherNotifications(): Promise<
  TeacherNotification[]
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
      href: inferHref(item),
    };
  });
}

export async function markTeacherNotificationsRead(): Promise<void> {
  await fetchClient<unknown>(markReadUrl, "POST", {});
}
