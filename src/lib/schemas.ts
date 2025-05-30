import { z } from "zod";

export const email = z.string().email({ message: "Invalid email address" });

export const firstName = z
  .string()
  .trim()
  .min(1, { message: "First name is required" })
  .max(20, { message: "First name must be at most 20 characters" });

export const lastName = z
  .string()
  .trim()
  .min(1, { message: "Last name is required" })
  .max(20, { message: "Last name must be at most 20 characters" });

export const phoneNumber = z
  .string()
  .min(10, { message: "Phone number must be at least 10 digits" })
  .max(16, { message: "Phone number must be at most 16 digits" });
