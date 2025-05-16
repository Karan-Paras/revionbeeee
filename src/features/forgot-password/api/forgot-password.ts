import { ForgotPasswordSchema } from "@/features/forgot-password/schemas";
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
