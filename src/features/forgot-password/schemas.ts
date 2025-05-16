import { email } from "@/lib/schemas";
import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email,
});
