import { CreateProfileSchema } from "@/features/user/schemas";
import type { User } from "@/features/user/types";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

type CreateProfileInput = z.infer<typeof CreateProfileSchema>;

export async function createProfile(data: CreateProfileInput) {
  const apiUrl = "/profile/create";

  if (data.profilePicture instanceof File) {
    const formData = new FormData();

    for (const key in data) {
      if (key === "profilePicture") {
        if (data.profilePicture) {
          formData.append(key, data.profilePicture);
        }
      } else {
        formData.append(key, data[key as keyof CreateProfileInput] as string);
      }
    }

    return await fetchServer<User>(apiUrl, "POST", formData);
  } else {
    return await fetchServer<User>(apiUrl, "POST", data);
  }
}
