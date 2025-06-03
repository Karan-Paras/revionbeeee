import { z } from "zod";
import api from "@/lib/api";
import { ChangePasswordSchema } from "@/features/auth/schemas";

export async function changePassword(
  data: z.infer<typeof ChangePasswordSchema>
) {
  const apiUrl = "/change/password";
  return await api(apiUrl, "POST", {
    oldPassword: data.currentPassword,
    password: data.newPassword,
  });
}
