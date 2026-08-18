import { fetchClient } from "@/lib/fetch-client";
import { getUserImageUrl } from "@/lib/media-urls";

const bookingsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/booking";

type ApiRecord = Record<string, unknown>;

export type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Completed";

export type TeacherBooking = {
  id: string | number;
  name: string;
  email: string;
  image: string;
  date: string;
  time: string;
  topic: string;
  status: BookingStatus;
  amount: string;
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

function capitalizeName(name: string) {
  return name.replace(/(^|[\s'-])\p{L}/gu, (letter) => letter.toUpperCase());
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

    return {
      id: text(booking, "id", "bookingID", "bookingId", "booking_id") || index,
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
      date: formatDate(
        text(
          sessionData,
          "scheduledDate",
          "scheduled_date",
          "sessionDate",
          "session_date",
          "lessonDate",
          "lesson_date",
          "bookingDate",
          "date"
        )
      ),
      time: startTime
        ? `${formatTime(startTime)}${endTime ? ` - ${formatTime(endTime)}` : ""}`
        : "—",
      topic:
        text(
          booking,
          "topic",
          "subjectName",
          "subject_name",
          "lessonType",
          "type"
        ) || "Lesson",
      status: normalizeStatus(
        text(booking, "status", "bookingStatus", "booking_status")
      ),
      amount:
        rawAmount && Number.isFinite(numericAmount)
          ? `$${numericAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
          : rawAmount || "—",
    };
  });
}
