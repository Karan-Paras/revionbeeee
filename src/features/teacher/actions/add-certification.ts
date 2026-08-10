"use server";

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
    await addTeacherCertificationApi(validatedFields.data);
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
