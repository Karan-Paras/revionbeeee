import { z } from "zod";
import api from "@/lib/api";
import { LoginSchema } from "@/features/auth/schemas";
import type { User } from "@/features/user/types";

export async function login(data: z.infer<typeof LoginSchema>) {
  const apiUrl = "/login";
  return await api<User>(apiUrl, "POST", {
    email: data.email,
    password: data.password,
    deviceType: "web",
    deviceToken: "",
  });
}
