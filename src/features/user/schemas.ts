import { z } from "zod";

const firstName = z
  .string()
  .trim()
  .min(1, { message: "First name is required" })
  .max(20, { message: "First name must be at most 20 characters" });

const lastName = z
  .string()
  .trim()
  .min(1, { message: "Last name is required" })
  .max(20, { message: "Last name must be at most 20 characters" });

const phoneNumber = z
  .string()
  .min(10, { message: "Phone number must be at least 10 digits" })
  .max(16, { message: "Phone number must be at most 16 digits" });

export const CreateProfileSchema = z.object({
  profilePicture: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Profile picture is required",
  }),
  firstName,
  lastName,
  phoneNumber,
});

export const UpdateProfileSchema = z.object({
  profilePicture: z.union([z.instanceof(File), z.string().min(1)]).optional(),
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
