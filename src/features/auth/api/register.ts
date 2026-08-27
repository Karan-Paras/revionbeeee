import { RegisterSchema } from "@/features/auth/schemas";
import type { User } from "@/features/user/types";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

export async function register(
  data: z.infer<typeof RegisterSchema>,
  deviceToken: string
) {
  const apiUrl = "/signup";
  return await fetchServer<User>(apiUrl, "POST", {
    email: data.email,
    password: data.password,
    userType: data.userType,
    deviceType: "web",
    deviceToken,
  });
}
