import { ResetPasswordSchema } from "@/features/auth/schemas";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

export async function resetPassword(
  data: z.infer<typeof ResetPasswordSchema>,
  token: string
) {
  const apiUrl = "/reset/password";
  return await fetchServer(apiUrl, "POST", {
    token,
    password: data.password,
  });
}
