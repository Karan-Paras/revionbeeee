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
