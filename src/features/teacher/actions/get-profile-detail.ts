"use server";

import type { TeacherProfileDetail } from "@/features/teacher/api/get-profile-detail";
import { getTeacherProfileDetail as getTeacherProfileDetailApi } from "@/features/teacher/api/get-profile-detail";

function findTeacherProfile(value: unknown): TeacherProfileDetail | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const hasProfileIdentity =
    typeof record.fullName === "string" ||
    typeof record.firstName === "string" ||
    typeof record.profileImage === "string" ||
    typeof record.profilePicture === "string";

  if (hasProfileIdentity) {
    return record as TeacherProfileDetail;
  }

  for (const nestedValue of Object.values(record)) {
    const profile = findTeacherProfile(nestedValue);
    if (profile) return profile;
  }

  return undefined;
}

export type GetTeacherProfileDetailResult =
  | { success: true; data: TeacherProfileDetail }
  | { success: false; error: string };

export async function getTeacherProfileDetail(): Promise<GetTeacherProfileDetailResult> {
  try {
    const response = await getTeacherProfileDetailApi();
    const result = response.data;
    const nestedProfile = findTeacherProfile(result);
    const data: TeacherProfileDetail = {
      ...result,
      ...result.user,
      ...result.teacher,
      ...result.profile,
      ...result.teacherProfile,
      ...result.data,
      ...nestedProfile,
    };

    return { success: true, data };
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
