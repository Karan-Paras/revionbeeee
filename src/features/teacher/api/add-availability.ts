import { AddTeacherAvailabilitySchema } from "@/features/teacher/schemas";
import { fetchServer } from "@/lib/fetch-server";
import type { z } from "zod";

export type AddTeacherAvailabilityInput = z.infer<
  typeof AddTeacherAvailabilitySchema
>;

export async function addTeacherAvailability(
  data: AddTeacherAvailabilityInput
) {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/availability/add`;
  return fetchServer<unknown>(apiUrl, "POST", data);
}
