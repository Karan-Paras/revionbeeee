import { AddTeacherQualificationSchema } from "@/features/teacher/schemas";
import { fetchServer } from "@/lib/fetch-server";
import type { z } from "zod";

export type AddTeacherQualificationInput = z.infer<
  typeof AddTeacherQualificationSchema
>;

export async function addTeacherQualification(
  data: AddTeacherQualificationInput
) {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/qualification/add`;

  const formData = new FormData();
  formData.append("institutionName", data.institutionName);
  formData.append("degree", data.degree);
  formData.append("fieldOfStudy", data.fieldOfStudy);
  formData.append("graduationYear", data.graduationYear);
  if (data.degreeDocument) {
    formData.append("degreeDocument", data.degreeDocument);
  }

  return fetchServer<unknown>(apiUrl, "POST", formData);
}
