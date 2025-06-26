import { ChangePasswordSchema } from "@/features/auth/schemas";
import api from "@/lib/api";
import { z } from "zod";

export async function changePassword(
  data: z.infer<typeof ChangePasswordSchema>
) {
  const apiUrl = "/change/password";
  return await api(apiUrl, "POST", {
    oldPassword: data.currentPassword,
    password: data.newPassword,
  });
}
