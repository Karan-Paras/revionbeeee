import { fetchClient } from "@/lib/fetch-client";
import { getTeacherImageUrl } from "@/lib/media-urls";

const myBookingsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/user/myBooking";

type ApiRecord = Record<string, unknown>;

export type MyBookingFilter =
  | "upcoming"
  | "pending"
  | "accepted"
  | "cancelled"
  | "completed";

export type MyBooking = {
  id: string | number;
  paymentLessonID: string | number;
  teacherName: string;
  teacherImage: string;
  teacherBio: string;
  professionalTitle: string;
  isOnline: boolean;
  subject: string;
  sessionDate: string;
  sessionStartTime: string;
  sessionEndTime: string;
  sessionTime: string;
  bookingType: string;
  durationMinutes: number;
  amount: string;
  status: string;
  joinNow: boolean;
  rejectionReason: string;
  isLive: boolean;
  canReport: boolean;
};

type GetMyBookingsParams = {
  filter: MyBookingFilter;
  search: string;
  perPage: number;
};

type MyBookingsRequestBody = GetMyBookingsParams & {
  status: MyBookingFilter;
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

function findItems(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];

  for (const key of ["bookings", "lessons", "items", "results", "data"]) {
    if (Array.isArray(value[key])) return value[key].filter(isRecord);
  }
  for (const nested of Object.values(value)) {
    const items = findItems(nested);
    if (items.length) return items;
  }
  return [];
}

function findRecordWithName(value: unknown): ApiRecord | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findRecordWithName(item);
      if (match) return match;
    }
    return undefined;
  }
  if (!isRecord(value)) return undefined;

  if (
    text(
      value,
      "teacherName",
      "teacher_name",
      "fullName",
      "full_name",
      "firstName",
      "first_name",
      "name"
    )
  ) {
    return value;
  }

  for (const nested of Object.values(value)) {
    const match = findRecordWithName(nested);
    if (match) return match;
  }
  return undefined;
}

function findRejectionReason(value: unknown): string {
  if (Array.isArray(value)) {
    for (const item of value) {
      const reason = findRejectionReason(item);
      if (reason) return reason;
    }
    return "";
  }
  if (!isRecord(value)) return "";

  for (const [key, fieldValue] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase();
    if (
      normalizedKey.includes("reason") &&
      (normalizedKey === "reason" ||
        normalizedKey.includes("reject") ||
        normalizedKey.includes("cancel")) &&
      typeof fieldValue === "string" &&
      fieldValue.trim()
    ) {
      return fieldValue.trim();
    }
  }

  for (const nested of Object.values(value)) {
    const reason = findRejectionReason(nested);
    if (reason) return reason;
  }
  return "";
}

function capitalizeName(name: string) {
  return name.replace(/(^|[\s'-])\p{L}/gu, (letter) => letter.toUpperCase());
}

function formatTime(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return value || "—";
  const hour = Number(match[1]);
  return `${hour % 12 || 12}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`;
}

export async function getMyBookings(
  params: GetMyBookingsParams
): Promise<MyBooking[]> {
  const requestBody: MyBookingsRequestBody = {
    ...params,
    status: params.filter,
  };
  const response = await fetchClient<unknown>(
    myBookingsUrl,
    "POST",
    requestBody
  );

  return findItems(response.data).map((booking, index) => {
    const namedTeacherContainer = Object.entries(booking).find(
      ([key, value]) => key.toLowerCase().includes("teacher") && isRecord(value)
    )?.[1];
    const teacher = isRecord(booking.teacher)
      ? booking.teacher
      : isRecord(booking.teacherDetail)
        ? booking.teacherDetail
        : isRecord(booking.teacherDetails)
          ? booking.teacherDetails
          : isRecord(booking.teacher_details)
            ? booking.teacher_details
            : isRecord(booking.teacherData)
              ? booking.teacherData
              : isRecord(booking.teacher_data)
                ? booking.teacher_data
                : isRecord(namedTeacherContainer)
                  ? namedTeacherContainer
                  : {};
    const nameRecord =
      findRecordWithName(teacher) ?? findRecordWithName(booking) ?? {};
    const user = isRecord(teacher.user) ? teacher.user : {};
    const profile = isRecord(teacher.profile)
      ? teacher.profile
      : isRecord(teacher.teacherProfile)
        ? teacher.teacherProfile
        : isRecord(teacher.teacher_profile)
          ? teacher.teacher_profile
          : {};
    const person = {
      ...booking,
      ...teacher,
      ...user,
      ...profile,
      ...nameRecord,
    };
    const firstName = text(person, "firstName", "first_name");
    const lastName = text(person, "lastName", "last_name");
    const image = text(
      person,
      "profileImage",
      "profile_image",
      "profilePicture",
      "profile_picture",
      "image"
    );
    const onlineValue =
      person.isOnline ??
      person.is_online ??
      person.onlineStatus ??
      person.online_status;
    const rawAmount = text(
      booking,
      "payableAmount",
      "payable_amount",
      "totalAmount",
      "total_amount",
      "amount"
    );
    const numericAmount = Number(rawAmount.replace(/[^\d.-]/g, ""));
    const session = isRecord(booking.session) ? booking.session : {};
    const startTime = text(session, "startTime", "start_time");
    const endTime = text(session, "endTime", "end_time");
    const professionalTitle = text(
      person,
      "professionalTitle",
      "professional_title"
    );
    const joinNowValue =
      booking.joinNow ??
      booking.join_now ??
      session.joinNow ??
      session.join_now;
    const liveValue =
      booking.isLive ??
      booking.is_live ??
      booking.live ??
      booking.isStarted ??
      booking.is_started ??
      booking.hasStarted ??
      booking.has_started ??
      booking.sessionStarted ??
      booking.session_started ??
      session.isLive ??
      session.is_live ??
      session.live ??
      session.status ??
      session.sessionStatus ??
      session.session_status;

    const bookingID = text(
      booking,
      "id",
      "bookingID",
      "bookingId",
      "booking_id"
    );
    const lessonID = text(booking, "lessonID", "lessonId", "lesson_id");
    const reportValue =
      booking.report ?? booking.canReport ?? booking.can_report;

    return {
      id: bookingID || lessonID || index,
      paymentLessonID: lessonID || bookingID || index,
      teacherName: capitalizeName(
        text(
          person,
          "fullName",
          "full_name",
          "teacherName",
          "teacher_name",
          "name"
        ) ||
          [firstName, lastName].filter(Boolean).join(" ") ||
          "Name not provided"
      ),
      teacherImage: image
        ? getTeacherImageUrl(image)
        : "/images/teacher-personal-info.svg",
      teacherBio:
        text(person, "bio", "biography", "about", "description") ||
        "No teacher description available.",
      professionalTitle: professionalTitle || "Teacher",
      isOnline:
        onlineValue === true ||
        onlineValue === 1 ||
        onlineValue === "1" ||
        String(onlineValue).toLowerCase() === "online",
      subject:
        text(
          booking,
          "subjectName",
          "subject_name",
          "subject",
          "topic",
          "professionalTitle",
          "professional_title"
        ) ||
        professionalTitle ||
        "General lesson",
      sessionDate:
        text(session, "date", "scheduledDate", "scheduled_date") || "—",
      sessionStartTime: startTime,
      sessionEndTime: endTime,
      sessionTime: startTime
        ? `${formatTime(startTime)}${endTime ? ` – ${formatTime(endTime)}` : ""}`
        : "—",
      bookingType: capitalizeName(
        text(session, "bookingType", "booking_type") || "Lesson"
      ),
      durationMinutes: Number(
        text(booking, "durationMinutes", "duration_minutes", "duration")
      ),
      amount:
        rawAmount && Number.isFinite(numericAmount)
          ? `$${numericAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
          : rawAmount || "—",
      status: text(booking, "status", "bookingStatus", "booking_status"),
      joinNow:
        joinNowValue === true ||
        joinNowValue === 1 ||
        String(joinNowValue).toLowerCase() === "true" ||
        String(joinNowValue).toLowerCase() === "1",
      rejectionReason:
        text(
          booking,
          "rejectionReason",
          "rejection_reason",
          "rejectReason",
          "reject_reason",
          "cancellationReason",
          "cancellation_reason",
          "rejectionRemarks",
          "rejection_remarks",
          "remarks",
          "comment",
          "note"
        ) || findRejectionReason(booking),
      isLive:
        liveValue === true ||
        liveValue === 1 ||
        [
          "live",
          "started",
          "ongoing",
          "inprogress",
          "in_progress",
          "running",
          "active",
        ].includes(String(liveValue).trim().toLowerCase()),
      canReport:
        reportValue === undefined ||
        reportValue === true ||
        reportValue === 1 ||
        String(reportValue).trim().toLowerCase() === "true" ||
        String(reportValue).trim().toLowerCase() === "1",
    };
  });
}
