import { LoginSchema } from "@/features/auth/schemas";
import type { User } from "@/features/user/types";
import api from "@/lib/api";
import { z } from "zod";

export async function login(data: z.infer<typeof LoginSchema>) {
  const apiUrl = "/login";
  return await api<User>(apiUrl, "POST", {
    email: data.email,
    password: data.password,
    deviceType: "web",
    deviceToken: "",
  });
}
