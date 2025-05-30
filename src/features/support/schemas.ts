import { z } from "zod";
import { email } from "@/lib/schemas";

export const ContactUsSchema = z.object({
  attachment: z.instanceof(File).optional(),
  email,
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(100, { message: "Subject must be at most 100 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(500, { message: "Message must be at most 500 characters" }),
});

export const SupportSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be at most 50 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be at most 50 characters" }),
  email,
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .max(20, { message: "Phone number must be at most 20 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(500, { message: "Message must be at most 500 characters" }),
});
