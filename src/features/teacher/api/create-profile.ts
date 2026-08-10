import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";
import type { User } from "@/features/user/types";
import { fetchServer } from "@/lib/fetch-server";
import type { z } from "zod";

export type CreateTeacherProfileInput = z.infer<
  typeof CreateTeacherProfileSchema
>;

export async function createTeacherProfile(data: CreateTeacherProfileInput) {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/profile/create`;

  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("professionalTitle", data.professionalTitle);
  formData.append("bio", data.bio);
  formData.append("mobileNumber", data.mobileNumber);
  formData.append("country", data.country);
  formData.append("city", data.city);
  formData.append("hourlyRate", data.hourlyRate.toString());
  formData.append("profileImage", data.profileImage);

  return fetchServer<User>(apiUrl, "POST", formData);
}
