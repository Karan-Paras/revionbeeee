import { email, phoneNumber } from "@/lib/schemas";
import { z } from "zod";

export const ContactUsSchema = z.object({
  attachment: z.preprocess(
    (value) => (value instanceof File && value.size === 0 ? undefined : value),
    z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "Image must be 5 MB or smaller",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
      .optional()
  ),
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
  email: z
    .string()
    .trim()
    .toLowerCase()
    .superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required",
        });
        return;
      }
      if (value.length > 254) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email must be at most 254 characters",
        });
        return;
      }
      if (!z.string().email().safeParse(value).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid email address",
        });
      }
    }),
  phoneNumber,
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(500, { message: "Message must be at most 500 characters" }),
});
