import { email } from "@/lib/schemas";
import { z } from "zod";

const requiredPassword = z.string().min(1, { message: "Password is required" });

export const newPassword = requiredPassword.superRefine((value, ctx) => {
  if (value.length === 0) return;
  if (value.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must be at least 8 characters",
    });
  }
  if (value.length > 64) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must be no more than 64 characters",
    });
  }
  if (!/[A-Z]/.test(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must include an uppercase letter",
    });
  }
  if (!/[a-z]/.test(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must include a lowercase letter",
    });
  }
  if (!/\d/.test(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must include a number",
    });
  }
  if (!/[^A-Za-z0-9\s]/.test(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must include a special character",
    });
  }
  if (/\s/.test(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must not contain spaces",
    });
  }
});

const confirmPassword = z
  .string()
  .trim()
  .min(1, { message: "Confirm password is required" });

export const RegisterSchema = z
  .object({
    email,
    password: newPassword,
    confirmPassword,
    userType: z.enum(["student", "teacher"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email,
  password: newPassword,
  userType: z.enum(["student", "teacher"]),
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
    currentPassword: requiredPassword,
    newPassword,
    confirmPassword,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
