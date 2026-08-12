"use server";

import type { TeacherProfileDetail } from "@/features/teacher/api/get-profile-detail";
import { getTeacherProfileDetail as getTeacherProfileDetailApi } from "@/features/teacher/api/get-profile-detail";

function findTeacherProfile(value: unknown): TeacherProfileDetail | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const profile = findTeacherProfile(item);
      if (profile) return profile;
    }
    return undefined;
  }

  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const hasProfileIdentity =
    typeof record.fullName === "string" ||
    typeof record.full_name === "string" ||
    typeof record.firstName === "string" ||
    typeof record.first_name === "string" ||
    typeof record.profileImage === "string" ||
    typeof record.profile_image === "string" ||
    typeof record.profilePicture === "string" ||
    typeof record.profile_picture === "string";

  if (hasProfileIdentity) {
    return record as TeacherProfileDetail;
  }

  for (const nestedValue of Object.values(record)) {
    const profile = findTeacherProfile(nestedValue);
    if (profile) return profile;
  }

  return undefined;
}

function findNestedArray(
  value: unknown,
  keys: readonly string[]
): Array<Record<string, unknown>> | undefined {
  let emptyMatch: Array<Record<string, unknown>> | undefined;

  if (Array.isArray(value)) {
    for (const item of value) {
      const items = findNestedArray(item, keys);
      if (items?.length) return items;
      if (items) emptyMatch = items;
    }
    return emptyMatch;
  }

  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;

  for (const key of keys) {
    if (Array.isArray(record[key])) {
      const items = record[key] as Array<Record<string, unknown>>;
      if (items.length) return items;
      emptyMatch = items;
    }
  }

  for (const nestedValue of Object.values(record)) {
    const items = findNestedArray(nestedValue, keys);
    if (items?.length) return items;
    if (items) emptyMatch = items;
  }

  return emptyMatch;
}

export type GetTeacherProfileDetailResult =
  | { success: true; data: TeacherProfileDetail }
  | { success: false; error: string };

export async function getTeacherProfileDetail(): Promise<GetTeacherProfileDetailResult> {
  try {
    const response = await getTeacherProfileDetailApi();
    const result = response.data;
    const resultRecord = Array.isArray(result)
      ? result.find(
          (item): item is Record<string, unknown> =>
            Boolean(item) && typeof item === "object" && !Array.isArray(item)
        )
      : result && typeof result === "object"
        ? (result as Record<string, unknown>)
        : undefined;
    const directTeacherRecord =
      resultRecord && Array.isArray(resultRecord.data)
        ? resultRecord.data.find(
            (item): item is Record<string, unknown> =>
              Boolean(item) && typeof item === "object" && !Array.isArray(item)
          )
        : resultRecord;
    const nestedProfile = findTeacherProfile(result);
    const qualifications = findNestedArray(result, [
      "qualifications",
      "qualification",
      "teacherQualifications",
      "teacher_qualifications",
      "education",
      "educations",
    ]);
    const certifications = findNestedArray(result, [
      "certifications",
      "certification",
      "teacherCertifications",
      "teacher_certifications",
      "certificates",
    ]);
    const directAvailabilities =
      directTeacherRecord?.teacher_availabilities ??
      directTeacherRecord?.teacherAvailabilities ??
      directTeacherRecord?.availabilities;
    const availabilities = Array.isArray(directAvailabilities)
      ? (directAvailabilities as Array<Record<string, unknown>>)
      : findNestedArray(result, [
          "teacher_availabilities",
          "teacherAvailabilities",
          "availabilities",
          "availability",
        ]);
    const data: TeacherProfileDetail = {
      ...result,
      ...result.user,
      ...result.teacher,
      ...result.profile,
      ...result.teacherProfile,
      ...result.data,
      ...nestedProfile,
    };

    const raw = data as Record<string, unknown>;
    const firstName = String(raw.firstName ?? raw.first_name ?? "");
    const lastName = String(raw.lastName ?? raw.last_name ?? "");
    const normalizedData: TeacherProfileDetail = {
      ...data,
      fullName:
        String(raw.fullName ?? raw.full_name ?? raw.name ?? "").trim() ||
        [firstName, lastName].filter(Boolean).join(" ").trim(),
      firstName,
      lastName,
      professionalTitle: String(
        raw.professionalTitle ?? raw.professional_title ?? ""
      ),
      bio: String(raw.bio ?? raw.biography ?? raw.about ?? ""),
      mobileNumber: String(
        raw.mobileNumber ?? raw.mobile_number ?? raw.phone ?? ""
      ),
      country: String(raw.country ?? ""),
      city: String(raw.city ?? ""),
      hourlyRate: String(raw.hourlyRate ?? raw.hourly_rate ?? ""),
      profileImage: String(
        raw.profileImage ??
          raw.profile_image ??
          raw.profilePicture ??
          raw.profile_picture ??
          ""
      ),
      qualifications:
        (qualifications as TeacherProfileDetail["qualifications"]) ?? [],
      certifications:
        (certifications as TeacherProfileDetail["certifications"]) ?? [],
      availabilities:
        (availabilities as TeacherProfileDetail["availabilities"]) ?? [],
    };

    return { success: true, data: normalizedData };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load teacher profile details.",
    };
  }
}
