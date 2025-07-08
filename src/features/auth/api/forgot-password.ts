import { ForgotPasswordSchema } from "@/features/auth/schemas";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

export async function forgotPassword(
  data: z.infer<typeof ForgotPasswordSchema>
) {
  const apiUrl = "/forgot/password";
  return await fetchServer(apiUrl, "POST", {
    email: data.email,
  });
}

export async function verifyToken(token: string) {
  const apiUrl = "/verify/token";
  return await fetchServer(apiUrl, "POST", {
    token,
  });
}
