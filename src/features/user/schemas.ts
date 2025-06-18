import { z } from "zod";
import { firstName, lastName, phoneNumber } from "@/lib/schemas";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export const CreateProfileSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Profile picture is required",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Profile picture must be less than or equal to 4MB",
    }),
  firstName,
  lastName,
  phoneNumber,
});

export const UpdateProfileSchema = z.object({
  profilePicture: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "Profile picture must be less than or equal to 4MB",
      }),
      z.string().min(1),
    ])
    .optional(),
  firstName,
  lastName,
  city: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val.length <= 20, {
      message: "City must be at most 20 characters",
    }),
  state: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val.length <= 20, {
      message: "State must be at most 20 characters",
    }),
  gender: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val === "male" || val === "female", {
      message: "Gender must be either 'male' or 'female'",
    }),
  phoneNumber,
  address: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val.length <= 100, {
      message: "Address must be at most 100 characters",
    }),
});
