import { firstName, lastName } from "@/lib/schemas";
import { isValidPhoneNumber } from "libphonenumber-js/max";
import { z } from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export const phoneNumber = z
  .string()
  .trim()
  .transform((val) => (val === "" ? undefined : val))
  .optional()
  .refine(
    (val) =>
      val === undefined || (val.startsWith("+") && isValidPhoneNumber(val)),
    { message: "Enter a valid mobile number for the selected country" }
  );

export const CreateProfileSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Profile picture must be less than or equal to 4MB",
    })
    .optional(),
  firstName,
  lastName,
  phoneNumber: phoneNumber.optional(),
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
  phoneNumber: phoneNumber.optional(),
  address: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val.length <= 100, {
      message: "Address must be at most 100 characters",
    }),
});
