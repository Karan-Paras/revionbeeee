import { fetchClient } from "@/lib/fetch-client";
import { getUserImageUrl } from "@/lib/media-urls";

type ApiRecord = Record<string, unknown>;

const teacherDashboardUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/teacher/dashboard";

export type DashboardLesson = {
  id: string;
  studentName: string;
  image: string;
  topic: string;
  dateTime: string;
  duration: string;
  canLaunch: boolean;
};

export type DashboardRequest = DashboardLesson & { amount: string };

export type TeacherDashboardData = {
  todayLessons: number;
  pendingRequests: number;
  totalTaughtHours: number;
  totalEarnings: number;
  scheduledLessons: DashboardLesson[];
  recentRequests: DashboardRequest[];
};

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(record: ApiRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" || typeof value === "number")
      return String(value).trim();
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

function array(record: ApiRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) return value.filter(isRecord);
  }
  return [];
}

function normalizeLesson(item: ApiRecord, index: number): DashboardLesson {
  const person = {
    ...item,
    ...asRecord(item.student),
    ...asRecord(item.user),
    ...asRecord(item.studentDetails),
    ...asRecord(item.student_details),
  };
  const firstName = text(person, "firstName", "first_name");
  const lastName = text(person, "lastName", "last_name");
  const image = text(
    person,
    "profilePhoto", // actual API key
    "profileImage",
    "profile_image",
    "profilePicture",
    "profile_picture",
    "image"
  );
  const date = text(item, "scheduledDate", "scheduled_date", "date");
  const time = text(
    item,
    "scheduledStartTime",
    "scheduled_start_time",
    "startTime",
    "start_time",
    "time"
  );

  // canLaunch comes directly as a boolean from the API
  const canLaunch =
    typeof item.canLaunch === "boolean"
      ? item.canLaunch
      : typeof item.can_launch === "boolean"
        ? item.can_launch
        : ["accepted", "approved", "confirmed"].includes(
            text(
              item,
              "status",
              "bookingStatus",
              "booking_status"
            ).toLowerCase()
          );

  return {
    id: text(item, "id", "lessonID", "lessonId", "bookingID") || String(index),
    studentName:
      text(person, "name", "fullName", "full_name", "studentName") ||
      [firstName, lastName].filter(Boolean).join(" ") ||
      "Student",
    image: image ? getUserImageUrl(image) : "/images/teacher-personal-info.svg",
    topic:
      text(
        item,
        "topic",
        "bookingType",
        "subjectName",
        "subject_name",
        "lessonType"
      ) || "Lesson",
    dateTime: [date, time && `at ${time}`].filter(Boolean).join(" ") || "—",
    duration: `${numeric(item, "durationMinutes", "duration_minutes", "duration")} Minutes`,
    canLaunch,
  };
}

export async function getTeacherDashboard(): Promise<TeacherDashboardData> {
  const response = await fetchClient<unknown>(teacherDashboardUrl, "GET");
  const data = asRecord(response.data);
  const stats = asRecord(data.stats ?? data.statistics ?? data.summary);
  const source = { ...data, ...stats };
  const scheduledLessons = array(
    data,
    "todaysLessons", // actual API key
    "scheduledLessons",
    "scheduled_lessons",
    "todayLessons",
    "today_lessons",
    "upcomingLessons"
  );
  const recentRequests = array(
    data,
    "recentRequests",
    "recent_requests",
    "bookingRequests",
    "booking_requests",
    "pendingBookings"
  );

  return {
    todayLessons: numeric(
      source,
      "todaysSessions", // actual API key
      "todayLessonsCount",
      "today_lessons_count",
      "todayLessons"
    ),
    pendingRequests: numeric(
      source,
      "pendingRequests",
      "pending_requests",
      "bookingRequests"
    ),
    totalTaughtHours: numeric(
      source,
      "totalHoursTaught", // actual API key
      "totalTaughtHours",
      "total_taught_hours",
      "totalHours"
    ),
    totalEarnings: numeric(
      source,
      "totalEarning", // actual API key (singular)
      "totalEarnings",
      "total_earnings",
      "earnings"
    ),
    scheduledLessons: scheduledLessons.map(normalizeLesson),
    recentRequests: recentRequests.map((item, index) => ({
      ...normalizeLesson(item, index),
      amount: `$${numeric(item, "amount", "payableAmount", "payable_amount").toLocaleString("en-US")}`,
    })),
  };
}
