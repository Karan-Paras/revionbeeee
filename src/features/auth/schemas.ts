import { z } from "zod";
import { email } from "@/lib/schemas";

const password = z.string().trim().min(1, { message: "Password is required" });

// new password validation
const newPassword = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
    {
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    }
  );

const confirmPassword = z.string().trim();

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

export const LoginSchema = z.object({
  email,
  password,
});

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

export const ChangePasswordSchema = z
  .object({
    currentPassword: password,
    newPassword,
    confirmPassword,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
