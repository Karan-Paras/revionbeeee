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

export async function getTeacherStudents(params: {
  filter: StudentFilter;
  search: string;
  perPage: number;
}): Promise<TeacherStudent[]> {
  const response = await fetchClient<unknown>(
    teacherStudentsUrl,
    "POST",
    params
  );

  return findStudents(response.data).map((student, index) => {
    const user = nestedRecord(
      student,
      "user",
      "student",
      "studentDetails",
      "student_details",
      "profile"
    );
    const person = { ...student, ...user };
    const firstName = text(person, "firstName", "first_name");
    const lastName = text(person, "lastName", "last_name");
    const image = text(
      person,
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

    return {
      id: text(student, "id", "studentID", "studentId", "student_id") || index,
      name:
        text(
          person,
          "fullName",
          "full_name",
          "studentName",
          "student_name",
          "name"
        ) ||
        [firstName, lastName].filter(Boolean).join(" ") ||
        "Student",
      email: text(person, "email", "emailAddress", "email_address") || "—",
      image: image
        ? getUserImageUrl(image)
        : "/images/teacher-personal-info.svg",
      phone:
        text(
          person,
          "mobileNumber",
          "mobile_number",
          "phoneNumber",
          "phone_number",
          "phone"
        ) || "—",
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
    };
  });
}
