import { CreateProfileSchema } from "@/features/user/schemas";
import api from "@/lib/api";
import { User } from "@/types/user";
import { z } from "zod";

type CreateProfileInput = z.infer<typeof CreateProfileSchema>;

export async function createProfile(data: CreateProfileInput) {
  const apiUrl = "/user/profile/create";

  const formData = new FormData();

  for (const key in data) {
    if (key === "profilePicture") {
      formData.append(key, data[key]);
    } else {
      formData.append(key, data[key as keyof CreateProfileInput] as string);
    }
  }

  return await api<User>(apiUrl, "POST", formData);
}
