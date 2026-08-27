import { LoginSchema } from "@/features/auth/schemas";
import type { User } from "@/features/user/types";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

export async function login(
  data: z.infer<typeof LoginSchema>,
  deviceToken: string
) {
  const apiUrl = "/login";
  return await fetchServer<User>(apiUrl, "POST", {
    email: data.email,
    password: data.password,
    deviceType: "web",
    deviceToken,
  });
}
