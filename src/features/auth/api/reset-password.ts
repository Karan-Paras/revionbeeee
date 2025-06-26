import { ResetPasswordSchema } from "@/features/auth/schemas";
import api from "@/lib/api";
import { z } from "zod";

export async function resetPassword(
  data: z.infer<typeof ResetPasswordSchema>,
  token: string
) {
  const apiUrl = "/reset/password";
  return await api(apiUrl, "POST", {
    token,
    password: data.password,
  });
}
