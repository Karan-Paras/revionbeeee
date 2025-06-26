import { ForgotPasswordSchema } from "@/features/auth/schemas";
import api from "@/lib/api";
import { z } from "zod";

export async function forgotPassword(
  data: z.infer<typeof ForgotPasswordSchema>
) {
  const apiUrl = "/forgot/password";
  return await api(apiUrl, "POST", {
    email: data.email,
  });
}

export async function verifyToken(token: string) {
  const apiUrl = "/verify/token";
  return await api(apiUrl, "POST", {
    token,
  });
}
