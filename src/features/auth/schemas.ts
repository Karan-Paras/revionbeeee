import { confirmPassword, email, newPassword } from "@/lib/schemas";
import { z } from "zod";

export const RegisterSchema = z
  .object({
    email,
    password: newPassword,
    confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
