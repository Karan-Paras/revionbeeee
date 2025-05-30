import { RegisterSchema } from "@/features/auth/schemas";
import api from "@/lib/api";
import { User } from "@/features/user/types";
import { z } from "zod";

export async function register(data: z.infer<typeof RegisterSchema>) {
  const apiUrl = "/user/signup";
  return await api<User>(apiUrl, "POST", {
    email: data.email,
    password: data.password,
    deviceType: "web",
    deviceToken: "",
  });
}
