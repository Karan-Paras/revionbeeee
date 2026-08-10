import { AddTeacherCertificationSchema } from "@/features/teacher/schemas";
import { fetchServer } from "@/lib/fetch-server";
import type { z } from "zod";

export type AddTeacherCertificationInput = z.infer<
  typeof AddTeacherCertificationSchema
>;

export async function addTeacherCertification(
  data: AddTeacherCertificationInput
) {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const formData = new FormData();
  formData.append("certificationName", data.certificationName);
  formData.append("issuingAuthority", data.issuingAuthority);
  formData.append("issueDate", data.issueDate);
  formData.append("certificationFile", data.certificationFile);

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/certification/add`;
  return fetchServer<unknown>(apiUrl, "POST", formData);
}
