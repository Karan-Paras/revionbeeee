"use server";

import { addTeacherQualification as addTeacherQualificationApi } from "@/features/teacher/api/add-qualification";
import { AddTeacherQualificationSchema } from "@/features/teacher/schemas";

export type AddTeacherQualificationResult =
  | {
      success: true;
      qualification: {
        institutionName: string;
        degree: string;
        fieldOfStudy: string;
        graduationYear: string;
      };
    }
  | {
      success: false;
      error?: string;
      fieldErrors?: {
        institutionName?: string[];
        degree?: string[];
        fieldOfStudy?: string[];
        graduationYear?: string[];
        degreeDocument?: string[];
      };
    };

export async function addTeacherQualification(
  formData: FormData
): Promise<AddTeacherQualificationResult> {
  const validatedFields = AddTeacherQualificationSchema.safeParse({
    institutionName: formData.get("institutionName"),
    degree: formData.get("degree"),
    fieldOfStudy: formData.get("fieldOfStudy"),
    graduationYear: formData.get("graduationYear"),
    degreeDocument: formData.get("degreeDocument"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addTeacherQualificationApi(validatedFields.data);
    return {
      success: true,
      qualification: {
        institutionName: validatedFields.data.institutionName,
        degree: validatedFields.data.degree,
        fieldOfStudy: validatedFields.data.fieldOfStudy,
        graduationYear: validatedFields.data.graduationYear,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to add qualification. Please try again.",
    };
  }
}
