import { fetchClient } from "@/lib/fetch-client";
import { getUserImageUrl } from "@/lib/media-urls";

const teacherStudentsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/teacher/students";

type ApiRecord = Record<string, unknown>;

export type StudentFilter = "all" | "active" | "inactive";
export type StudentStatus = "Active" | "Inactive";

export type TeacherStudent = {
  id: string | number;
  name: string;
  email: string;
  image: string;
  phone: string;
  status: StudentStatus;
  sessions: number;
  spend: string;
  lastSessionAt?: string;
};

export type StudentsResponse = {
  students: TeacherStudent[];
  summary: {
    totalStudents: number;
    activeStudents: number;
    totalRevenue: number;
  };
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

function findStudents(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];

  for (const key of ["students", "items", "results", "data"]) {
    if (Array.isArray(value[key])) return value[key].filter(isRecord);
  }
  for (const nested of Object.values(value)) {
    const students = findStudents(nested);
    if (students.length) return students;
  }
  return [];
}

function nestedRecord(record: ApiRecord, ...keys: string[]) {
  for (const key of keys) {
    if (isRecord(record[key])) return record[key] as ApiRecord;
  }
  return {};
}

function normalizeStatus(record: ApiRecord): StudentStatus {
  const rawStatus = text(record, "status", "studentStatus", "student_status");
  const activeValue = record.isActive ?? record.is_active ?? record.active;
  if (
    rawStatus.toLowerCase() === "inactive" ||
    activeValue === false ||
    activeValue === 0 ||
    String(activeValue) === "0" ||
    String(activeValue).toLowerCase() === "false"
  ) {
    return "Inactive";
  }
  return "Active";
}

function formatLastSession(value: string) {
  if (!value) return undefined;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})/);
  if (!match) return value;
  const [, year, month, day, hour, minute] = match.map(Number);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(year, month - 1, day, hour, minute));
}

export async function getTeacherStudents(params: {
  filter: StudentFilter;
  search: string;
  perPage: number;
}): Promise<StudentsResponse> {
  const response = await fetchClient<unknown>(
    teacherStudentsUrl,
    "POST",
    params
  );

  // Summary is at the top level of the API response (not inside data)
  const raw: ApiRecord = isRecord(response) ? response : {};
  const responseData = isRecord(response.data) ? response.data : {};
  const summaryRaw = isRecord(raw.summary)
    ? raw.summary
    : isRecord(responseData.summary)
      ? responseData.summary
      : {};

  const summary = {
    totalStudents:
      Number(text(summaryRaw, "totalStudents", "total_students")) || 0,
    activeStudents:
      Number(text(summaryRaw, "activeStudents", "active_students")) || 0,
    totalRevenue:
      Number(text(summaryRaw, "totalRevenue", "total_revenue")) || 0,
  };

  const students = findStudents(response.data).map((student, index) => {
    // API shape: { client: { name, email, profilePhoto }, contact: { phone, email }, ... }
    const client = nestedRecord(student, "client");
    const contact = nestedRecord(student, "contact");
    const user = nestedRecord(
      student,
      "user",
      "student",
      "studentDetails",
      "student_details",
      "profile"
    );
    // Merge all sources — client/contact take priority for their respective fields
    const person = { ...student, ...user, ...client };
    const firstName = text(person, "firstName", "first_name");
    const lastName = text(person, "lastName", "last_name");
    const image = text(
      person,
      "profilePhoto", // actual API key
      "profilePicture",
      "profile_picture",
      "profileImage",
      "profile_image",
      "image"
    );
    const rawSpend = text(
      student,
      "totalSpend",
      "total_spend",
      "totalSpent",
      "total_spent",
      "spend",
      "amount"
    );
    const numericSpend = Number(rawSpend.replace(/[^\d.-]/g, ""));

    // Phone: look in contact first, then person
    const phone =
      text(
        contact,
        "phone",
        "phoneNumber",
        "phone_number",
        "mobile",
        "mobileNumber"
      ) ||
      text(
        person,
        "mobileNumber",
        "mobile_number",
        "phoneNumber",
        "phone_number",
        "phone"
      ) ||
      "—";

    // Email: look in client/contact first, then person
    const email =
      text(client, "email", "emailAddress") ||
      text(contact, "email", "emailAddress") ||
      text(person, "email", "emailAddress", "email_address") ||
      "—";

    const rawLastSession = text(
      student,
      "lastSessionAt",
      "last_session_at",
      "lastLesson",
      "last_lesson",
      "lastActivity",
      "last_activity"
    );

    return {
      id: text(student, "id", "studentID", "studentId", "student_id") || index,
      name:
        text(
          person,
          "name",
          "fullName",
          "full_name",
          "studentName",
          "student_name"
        ) ||
        [firstName, lastName].filter(Boolean).join(" ") ||
        "Student",
      email,
      image: image ? getUserImageUrl(image) : "",
      phone,
      status: normalizeStatus({ ...student, ...user }),
      sessions:
        Number(
          text(
            student,
            "totalSessions",
            "total_sessions",
            "sessionsCount",
            "sessions_count",
            "sessions"
          )
        ) || 0,
      spend:
        rawSpend && Number.isFinite(numericSpend)
          ? `$${numericSpend.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
          : rawSpend || "$0",
      lastSessionAt: formatLastSession(rawLastSession),
    };
  });

  return { students, summary };
}
