import { fetchClient } from "@/lib/fetch-client";
import { getTeacherImageUrl } from "@/lib/media-urls";

type ApiRecord = Record<string, unknown>;

export type VerifiedTeacher = {
  id: string | number;
  name: string;
  image: string;
  bio: string;
  professionalTitle: string;
  hourlyRate: string;
  isOnline: boolean;
  subjects: string[];
  qualifications: ApiRecord[];
  certifications: ApiRecord[];
};

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function findTeachers(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];

  for (const key of [
    "teachers",
    "verifiedTeachers",
    "verified_teachers",
    "data",
  ]) {
    if (Array.isArray(value[key])) return value[key].filter(isRecord);
  }

  for (const nestedValue of Object.values(value)) {
    const teachers = findTeachers(nestedValue);
    if (teachers.length) return teachers;
  }
  return [];
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

function capitalizeName(name: string) {
  return name.replace(/(^|[\s'-])\p{L}/gu, (letter) => letter.toUpperCase());
}

function list(record: ApiRecord, ...keys: string[]): ApiRecord[] {
  for (const key of keys) {
    if (Array.isArray(record[key])) return record[key].filter(isRecord);
  }
  return [];
}

function subjectNames(record: ApiRecord): string[] {
  const value = record.subjects ?? record.subject ?? record.teacherSubjects;
  if (typeof value === "string")
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  if (!Array.isArray(value)) return [];
  return value
    .map((item) =>
      typeof item === "string"
        ? item
        : isRecord(item)
          ? text(item, "name", "subjectName", "subject_name", "title")
          : ""
    )
    .filter(Boolean);
}

export async function getVerifiedTeachers(): Promise<VerifiedTeacher[]> {
  const response = await fetchClient<unknown>("/verified/teachers", "GET");

  return findTeachers(response.data).map((teacher, index) => {
    const nestedProfile = isRecord(teacher.teacher_profile)
      ? teacher.teacher_profile
      : isRecord(teacher.teacherProfile)
        ? teacher.teacherProfile
        : {};
    const profile = { ...teacher, ...nestedProfile };
    const firstName = text(profile, "firstName", "first_name");
    const lastName = text(profile, "lastName", "last_name");
    const image = text(
      profile,
      "profile_image_url",
      "profileImage",
      "profile_image",
      "profilePicture",
      "profile_picture",
      "image"
    );
    const onlineValue =
      profile.isOnline ??
      profile.is_online ??
      profile.onlineStatus ??
      profile.online_status;
    const normalizedOnlineValue = String(onlineValue).trim().toLowerCase();

    return {
      id:
        text(teacher, "id", "teacherId", "teacher_id", "uuid") ||
        `teacher-${index}`,
      name: capitalizeName(
        text(profile, "fullName", "full_name", "name") ||
          [firstName, lastName].filter(Boolean).join(" ") ||
          "Teacher"
      ),
      image: image
        ? getTeacherImageUrl(image)
        : "/images/teacher-personal-info.svg",
      bio: text(profile, "bio", "biography", "about", "description"),
      professionalTitle: text(
        profile,
        "professionalTitle",
        "professional_title",
        "title"
      ),
      hourlyRate: text(
        profile,
        "hourlyRate",
        "hourly_rate",
        "price",
        "lessonPrice",
        "lesson_price"
      ),
      isOnline:
        onlineValue === true ||
        onlineValue === 1 ||
        normalizedOnlineValue === "1" ||
        normalizedOnlineValue === "true" ||
        normalizedOnlineValue === "online",
      subjects: subjectNames(profile),
      qualifications: list(
        teacher,
        "qualifications",
        "teacherQualifications",
        "teacher_qualifications",
        "education"
      ),
      certifications: list(
        teacher,
        "certifications",
        "teacherCertifications",
        "teacher_certifications",
        "certificates"
      ),
    };
  });
}
