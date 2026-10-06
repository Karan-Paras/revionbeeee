import { fetchClient } from "@/lib/fetch-client";
import { getUserImageUrl } from "@/lib/media-urls";

const bookingsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/booking";

type ApiRecord = Record<string, unknown>;

export type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Completed";

export type TeacherBooking = {
  id: string | number;
  lessonID: string | number;
  name: string;
  email: string;
  image: string;
  date: string;
  sessionDate: string;
  sessionStartTime: string;
  sessionEndTime: string;
  time: string;
  bookingType: "Scheduled" | "Instant";
  topic: string;
  status: BookingStatus;
  amount: string;
  paidAt?: string;
  isLive: boolean;
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

function findBookings(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];

  for (const key of ["bookings", "lessons", "items", "results", "data"]) {
    if (Array.isArray(value[key])) return value[key].filter(isRecord);
  }

  for (const nested of Object.values(value)) {
    const bookings = findBookings(nested);
    if (bookings.length) return bookings;
  }
  return [];
}

function emailText(record: ApiRecord) {
  for (const [key, value] of Object.entries(record)) {
    if (
      key.toLowerCase().includes("email") &&
      (typeof value === "string" || typeof value === "number")
    ) {
      const email = String(value).trim();
      if (email) return email;
    }
  }
  return "";
}

function findRecordWithEmail(value: unknown): ApiRecord | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findRecordWithEmail(item);
      if (match) return match;
    }
    return undefined;
  }
  if (!isRecord(value)) return undefined;

  if (emailText(value)) {
    return value;
  }

  for (const nested of Object.values(value)) {
    const match = findRecordWithEmail(nested);
    if (match) return match;
  }
  return undefined;
}

function formatDate(value: string) {
  if (!value) return "—";
  const datePart = value.slice(0, 10);
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function formatTime(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return value;
  const hour = Number(match[1]);
  return `${hour % 12 || 12}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`;
}

function addMinutes(time: string, duration: number) {
  const match = time.match(/^(\d{1,2}):(\d{2})/);
  if (!match || !duration) return "";
  const total = Number(match[1]) * 60 + Number(match[2]) + duration;
  return `${Math.floor((total % 1440) / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function normalizeStatus(value: string): BookingStatus {
  const status = value.toLowerCase();
  if (["accepted", "approved", "confirmed"].includes(status)) return "Accepted";
  if (["rejected", "cancelled", "canceled"].includes(status)) return "Rejected";
  if (["completed", "finished"].includes(status)) return "Completed";
  return "Pending";
}

function bookingStatusText(booking: ApiRecord) {
  return text(
    booking,
    "bookingStatus",
    "booking_status",
    "requestStatus",
    "request_status",
    "approvalStatus",
    "approval_status",
    "lessonBookingStatus",
    "lesson_booking_status",
    "teacherResponseStatus",
    "teacher_response_status",
    "status"
  );
}

function capitalizeName(name: string) {
  return name.replace(/(^|[\s'-])\p{L}/gu, (letter) => letter.toUpperCase());
}

function formatDateTime(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})/);
  if (!match) return value;
  const [, year, month, day, hour, minute] = match.map(Number);
  if (!year || !month || !day) return value;
  const date = new Date(year, month - 1, day, hour, minute);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

type GetBookingsParams = {
  filter: string;
  search: string;
  perPage: number;
};

export async function getBookings(
  params: GetBookingsParams
): Promise<TeacherBooking[]> {
  const response = await fetchClient<unknown>(bookingsUrl, "POST", params);

  return findBookings(response.data).map((booking, index) => {
    const namedStudentContainer = Object.entries(booking).find(
      ([key, value]) => key.toLowerCase().includes("student") && isRecord(value)
    )?.[1];
    const student = isRecord(booking.student)
      ? booking.student
      : isRecord(booking.user)
        ? booking.user
        : isRecord(booking.studentDetail)
          ? booking.studentDetail
          : isRecord(booking.studentDetails)
            ? booking.studentDetails
            : isRecord(booking.student_details)
              ? booking.student_details
              : isRecord(booking.student_data)
                ? booking.student_data
                : isRecord(booking.studentInfo)
                  ? booking.studentInfo
                  : isRecord(namedStudentContainer)
                    ? namedStudentContainer
                    : {};
    const emailRecord =
      findRecordWithEmail(student) ?? findRecordWithEmail(booking) ?? {};
    const studentUser = isRecord(student.user)
      ? student.user
      : isRecord(student.userDetails)
        ? student.userDetails
        : isRecord(student.user_details)
          ? student.user_details
          : {};
    const profile = isRecord(student.profile)
      ? student.profile
      : isRecord(booking.studentProfile)
        ? booking.studentProfile
        : isRecord(booking.student_profile)
          ? booking.student_profile
          : {};
    const studentProfile = isRecord(student.studentProfile)
      ? student.studentProfile
      : isRecord(student.student_profile)
        ? student.student_profile
        : {};
    const person = {
      ...booking,
      ...student,
      ...studentUser,
      ...profile,
      ...studentProfile,
      ...emailRecord,
    };
    const session = isRecord(booking.session)
      ? booking.session
      : isRecord(booking.lesson)
        ? booking.lesson
        : {};
    const sessionData = { ...booking, ...session };
    const firstName = text(person, "firstName", "first_name");
    const lastName = text(person, "lastName", "last_name");
    const startTime = text(
      sessionData,
      "scheduledStartTime",
      "scheduled_start_time",
      "sessionStartTime",
      "session_start_time",
      "startTime",
      "start_time",
      "scheduledTime"
    );
    const duration = Number(
      text(sessionData, "durationMinutes", "duration_minutes", "duration")
    );
    const endTime =
      text(
        sessionData,
        "scheduledEndTime",
        "scheduled_end_time",
        "sessionEndTime",
        "session_end_time",
        "endTime",
        "end_time"
      ) || addMinutes(startTime, duration);
    const image = text(
      person,
      "profilePhoto",
      "profileImage",
      "profile_image",
      "profilePicture",
      "profile_picture",
      "image"
    );
    const rawAmount = text(
      booking,
      "payableAmount",
      "payable_amount",
      "totalAmount",
      "total_amount",
      "amount"
    );
    const numericAmount = Number(rawAmount.replace(/[^\d.-]/g, ""));
    const rawPaidAt = text(
      booking,
      "paidAt",
      "paid_at",
      "paymentDate",
      "payment_date",
      "paymentTime",
      "payment_time"
    );
    const hasPaidStatus =
      booking.isPaid === true ||
      booking.is_paid === true ||
      booking.isPaid === 1 ||
      booking.is_paid === 1 ||
      ["paid", "completed", "success"].includes(
        text(
          booking,
          "paymentStatus",
          "payment_status",
          "payment_state"
        ).toLowerCase()
      );
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
      sessionData.isLive ??
      sessionData.is_live ??
      sessionData.live ??
      sessionData.status ??
      sessionData.sessionStatus ??
      sessionData.session_status;

    const bookingID =
      text(booking, "id", "bookingID", "bookingId", "booking_id") || index;
    const lessonID =
      text(booking, "lessonID", "lessonId", "lesson_id") || bookingID;

    const sessionDate = text(
      sessionData,
      "scheduledDate",
      "scheduled_date",
      "sessionDate",
      "session_date",
      "lessonDate",
      "lesson_date",
      "bookingDate",
      "date"
    );

    return {
      id: bookingID,
      lessonID,
      name: capitalizeName(
        text(
          person,
          "fullName",
          "full_name",
          "studentName",
          "student_name",
          "name"
        ) ||
          [firstName, lastName].filter(Boolean).join(" ") ||
          "Student"
      ),
      email: emailText(person) || "Email not provided",
      image: image
        ? getUserImageUrl(image)
        : "/images/teacher-personal-info.svg",
      date: formatDate(sessionDate),
      sessionDate,
      sessionStartTime: startTime,
      sessionEndTime: endTime,
      time: startTime
        ? `${formatTime(startTime)}${endTime ? ` - ${formatTime(endTime)}` : ""}`
        : "—",
      bookingType:
        startTime.toLowerCase() === "instant" ? "Instant" : "Scheduled",
      topic:
        text(
          booking,
          "topic",
          "subjectName",
          "subject_name",
          "lessonType",
          "type"
        ) || "Lesson",
      status: normalizeStatus(bookingStatusText(booking)),
      amount:
        rawAmount && Number.isFinite(numericAmount)
          ? `$${numericAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
          : rawAmount || "—",
      paidAt: rawPaidAt
        ? formatDateTime(rawPaidAt)
        : hasPaidStatus
          ? "Paid"
          : undefined,
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
    };
  });
}
