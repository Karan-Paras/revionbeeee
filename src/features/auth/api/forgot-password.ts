import { z } from "zod";
import api from "@/lib/api";
import { ForgotPasswordSchema } from "@/features/auth/schemas";

export async function forgotPassword(
  data: z.infer<typeof ForgotPasswordSchema>
) {
  const apiUrl = "/forgot/password";
  return await api(apiUrl, "POST", {
    email: data.email,
  });
}
