"use server";

import { unstable_update } from "@/auth";
import { getTeacherProfileStatusFromResponse } from "@/features/teacher/actions/profile-status";
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

function findNestedRecord(
  value: unknown,
  keys: readonly string[]
): Record<string, unknown> | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findNestedRecord(item, keys);
      if (match) return match;
    }
    return undefined;
  }

  if (!value || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  for (const key of keys) {
    const candidate = record[key];
    if (
      candidate &&
      typeof candidate === "object" &&
      !Array.isArray(candidate)
    ) {
      return candidate as Record<string, unknown>;
    }
  }

  for (const nestedValue of Object.values(record)) {
    const match = findNestedRecord(nestedValue, keys);
    if (match) return match;
  }
  return undefined;
}

export type GetTeacherProfileDetailResult =
  | { success: true; data: TeacherProfileDetail }
  | { success: false; error: string };

export async function getTeacherProfileDetail(
  token?: string
): Promise<GetTeacherProfileDetailResult> {
  try {
    const response = await getTeacherProfileDetailApi(token);
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
    const nestedUser = findNestedRecord(result, [
      "user",
      "user_details",
      "userDetails",
    ]);
    const nestedTeacherProfile = findNestedRecord(result, [
      "teacherProfile",
      "teacher_profile",
      "teacherDetails",
      "teacher_details",
      "profile",
      "teacher",
    ]);
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
    const resultObject =
      result && typeof result === "object" && !Array.isArray(result)
        ? (result as Record<string, unknown>)
        : {};
    const data = {
      ...resultObject,
      ...directTeacherRecord,
      ...nestedProfile,
      ...nestedUser,
      ...nestedTeacherProfile,
    } as TeacherProfileDetail;

    const raw = data as Record<string, unknown>;
    const firstName = String(raw.firstName ?? raw.first_name ?? "");
    const lastName = String(raw.lastName ?? raw.last_name ?? "");
    const normalizedData: TeacherProfileDetail = {
      ...data,
      isOnline: Boolean(
        (directTeacherRecord?.isOnline ??
          directTeacherRecord?.is_online ??
          raw.isOnline ??
          raw.is_online) === true ||
          (directTeacherRecord?.isOnline ??
            directTeacherRecord?.is_online ??
            raw.isOnline ??
            raw.is_online) === 1
      ),
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
      countryCode: String(raw.countryCode ?? raw.country_code ?? ""),
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
    const teacherProfileStatus = getTeacherProfileStatusFromResponse(result);

    if (teacherProfileStatus !== undefined) {
      try {
        await unstable_update({
          user: {
            teacherProfileStatus,
          },
        });
      } catch (sessionError) {
        console.error(
          "Teacher profile detail loaded, but session refresh failed:",
          sessionError
        );
      }
    }

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
