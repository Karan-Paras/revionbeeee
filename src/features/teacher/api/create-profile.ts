import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";
import type { User } from "@/features/user/types";
import { fetchServer } from "@/lib/fetch-server";
import type { z } from "zod";

export type CreateTeacherProfileInput = z.infer<
  typeof CreateTeacherProfileSchema
>;

export type UpdateTeacherProfileInput = Omit<
  CreateTeacherProfileInput,
  "profileImage"
> & {
  profileImage?: File;
};

async function saveTeacherProfile(data: UpdateTeacherProfileInput) {
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
  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  return fetchServer<User>(apiUrl, "POST", formData);
}

export async function createTeacherProfile(data: CreateTeacherProfileInput) {
  return saveTeacherProfile(data);
}

export async function updateTeacherProfile(data: UpdateTeacherProfileInput) {
  return saveTeacherProfile(data);
}
