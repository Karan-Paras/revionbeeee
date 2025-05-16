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

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const CreateProfileSchema = z.object({
  profilePicture: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Profile picture is required",
  }),
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(20, { message: "First name must be at most 20 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(20, { message: "Last name must be at most 20 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(16, { message: "Phone number must be at most 16 digits" }),
});
