import { confirmPassword, email, newPassword } from "@/lib/schemas";
import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email,
});

export const ResetPasswordSchema = z
  .object({
    password: newPassword,
    confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
