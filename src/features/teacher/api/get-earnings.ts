import { fetchClient } from "@/lib/fetch-client";
import { getUserImageUrl } from "@/lib/media-urls";

const teacherEarningsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/teacher/earnings";

type ApiRecord = Record<string, unknown>;

export type PaymentStatus = "Active" | "Lead" | "Inactive";

export type EarningsPayment = {
  id: string | number;
  date: string;
  client: string;
  email: string;
  image: string;
  topic: string;
  sessionTime: string;
  amount: string;
  status: PaymentStatus;
};

export type TeacherEarningsData = {
  stats: {
    availablePayout: number;
    pendingClearing: number;
    totalEarnings: number;
  };
  payments: EarningsPayment[];
};

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(record: ApiRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" || typeof value === "number") {
      return String(value).trim();
    }
  }
  return "";
}

function numeric(record: ApiRecord, ...keys: string[]) {
  const value = Number(text(record, ...keys).replace(/[^\d.-]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function asRecord(value: unknown) {
  return isRecord(value) ? value : {};
}

function findPayments(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];

  for (const key of [
    "payments",
    "transactions",
    "earnings",
    "commissionReceipts",
    "commission_receipts",
    "receipts",
    "items",
    "results",
    "data",
  ]) {
    if (Array.isArray(value[key])) return value[key].filter(isRecord);
  }

  for (const nested of Object.values(value)) {
    const payments = findPayments(nested);
    if (payments.length) return payments;
  }
  return [];
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "$0";
  const negative = value < 0;
  return `${negative ? "-" : ""}$${Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: value % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value: string) {
  if (!value) return "—";
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return value;
  const [, year, month, day] = match.map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function formatSessionTime(record: ApiRecord) {
  const rawDuration = text(
    record,
    "sessionTime",
    "session_time",
    "duration",
    "durationMinutes",
    "duration_minutes"
  );
  if (!rawDuration) return "—";
  if (/[a-zA-Z]/.test(rawDuration)) return rawDuration;

  const minutes = Number(rawDuration.replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(minutes) || minutes <= 0) return rawDuration;
  if (minutes % 60 === 0) {
    return `${minutes / 60} ${minutes / 60 === 1 ? "hour" : "hours"}`;
  }
  if (minutes < 60) return `${minutes} Minutes`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function normalizeStatus(record: ApiRecord): PaymentStatus {
  const raw = text(
    record,
    "status",
    "paymentStatus",
    "payment_status"
  ).toLowerCase();
  if (raw === "active" || raw === "completed" || raw === "paid")
    return "Active";
  if (raw === "lead" || raw === "pending") return "Lead";
  if (raw === "inactive" || raw === "failed" || raw === "cancelled") {
    return "Inactive";
  }
  return "Active";
}

export async function getTeacherEarnings(): Promise<TeacherEarningsData> {
  const response = await fetchClient<unknown>(teacherEarningsUrl, "GET");
  const data = asRecord(response.data);
  const summary = asRecord(data.summary ?? data.stats ?? data.statistics);
  const source = { ...data, ...summary };

  const stats = {
    availablePayout: numeric(
      source,
      "availablePayout",
      "available_payout",
      "availableBalance",
      "available_balance"
    ),
    pendingClearing: numeric(
      source,
      "pendingClearing",
      "pending_clearing",
      "pendingPayout",
      "pending_payout"
    ),
    totalEarnings: numeric(
      source,
      "totalEarning",
      "total_earning",
      "totalEarnings",
      "total_earnings"
    ),
  };

  const payments = findPayments(response.data).map((raw) => {
    const student = asRecord(raw.student);
    const client = asRecord(raw.client);
    const user = asRecord(raw.user);
    const person = { ...raw, ...student, ...client, ...user };
    const firstName = text(person, "firstName", "first_name");
    const lastName = text(person, "lastName", "last_name");
    const image = text(
      person,
      "profilePhoto",
      "profileImage",
      "profile_image",
      "profilePicture",
      "profile_picture",
      "image"
    );

    return {
      id: text(raw, "id", "paymentId", "payment_id", "transactionId") || "0",
      date: formatDate(
        text(raw, "date", "paidAt", "paid_at", "createdAt", "created_at")
      ),
      client:
        text(
          person,
          "name",
          "fullName",
          "full_name",
          "studentName",
          "clientName"
        ) ||
        [firstName, lastName].filter(Boolean).join(" ") ||
        "Student",
      email: text(person, "email", "emailAddress", "email_address") || "—",
      image: image ? getUserImageUrl(image) : "",
      topic:
        text(
          raw,
          "topic",
          "subject",
          "subjectName",
          "subject_name",
          "lessonTopic"
        ) || "Lesson",
      sessionTime: formatSessionTime(raw),
      amount: formatCurrency(
        numeric(raw, "amount", "commission", "earnings", "payableAmount")
      ),
      status: normalizeStatus(raw),
    };
  });

  return { stats, payments };
}
