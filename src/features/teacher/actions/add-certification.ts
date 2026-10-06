"use server";

import { unstable_update } from "@/auth";
import { getTeacherProfileStatusFromResponse } from "@/features/teacher/actions/profile-status";
import { addTeacherCertification as addTeacherCertificationApi } from "@/features/teacher/api/add-certification";
import { AddTeacherCertificationSchema } from "@/features/teacher/schemas";

export type AddTeacherCertificationResult =
  | { success: true }
  | {
      success: false;
      error?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

export async function addTeacherCertification(
  formData: FormData
): Promise<AddTeacherCertificationResult> {
  const validatedFields = AddTeacherCertificationSchema.safeParse({
    certificationName: formData.get("certificationName"),
    issuingAuthority: formData.get("issuingAuthority"),
    issueDate: formData.get("issueDate"),
    certificationFile: formData.get("certificationFile"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await addTeacherCertificationApi(validatedFields.data);
    const teacherProfileStatus = getTeacherProfileStatusFromResponse(
      response.data
    );
    try {
      if (teacherProfileStatus !== undefined) {
        await unstable_update({
          user: {
            teacherProfileStatus,
          },
        });
      }
    } catch (sessionError) {
      console.error(
        "Teacher certification was saved, but session refresh failed:",
        sessionError
      );
    }
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to add certification. Please try again.",
    };
  }
}
