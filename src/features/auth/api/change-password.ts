import { ChangePasswordSchema } from "@/features/auth/schemas";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

export async function changePassword(
  data: z.infer<typeof ChangePasswordSchema>
) {
  const apiUrl = "/change/password";
  return await fetchServer(apiUrl, "POST", {
    oldPassword: data.currentPassword,
    password: data.newPassword,
  });
}
