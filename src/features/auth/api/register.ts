import { RegisterSchema } from "@/features/auth/schemas";
import type { User } from "@/features/user/types";
import api from "@/lib/api";
import { z } from "zod";

export async function register(data: z.infer<typeof RegisterSchema>) {
  const apiUrl = "/signup";
  return await api<User>(apiUrl, "POST", {
    email: data.email,
    password: data.password,
    deviceType: "web",
    deviceToken: "",
  });
}
