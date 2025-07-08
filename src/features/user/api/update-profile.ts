import { UpdateProfileSchema } from "@/features/user/schemas";
import type { User } from "@/features/user/types";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export async function updateProfile(data: UpdateProfileInput) {
  const apiUrl = "/update/profile";

  const formData = new FormData();

  if (data.profilePicture instanceof File) {
    for (const key in data) {
      if (key === "profilePicture") {
        if (data[key] !== undefined) {
          formData.append(key, data[key] as File);
        }
      } else {
        const value = data[key as keyof UpdateProfileInput];
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      }
    }
    return await fetchServer<User>(apiUrl, "POST", formData);
  } else {
    return await fetchServer<User>(apiUrl, "POST", data);
  }
}
