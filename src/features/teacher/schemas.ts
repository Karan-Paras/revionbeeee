import { z } from "zod";

const MAX_PROFILE_IMAGE_SIZE = 4 * 1024 * 1024;
const ALLOWED_PROFILE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const CreateTeacherProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  professionalTitle: z
    .string()
    .trim()
    .min(2, "Professional title must be at least 2 characters")
    .max(100, "Professional title must be at most 100 characters"),
  bio: z
    .string()
    .trim()
    .min(10, "Bio must be at least 10 characters")
    .max(1000, "Bio must be at most 1000 characters"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]+$/, "Enter a valid mobile number")
    .refine((value) => {
      const digitCount = value.replace(/\D/g, "").length;
      return digitCount >= 10 && digitCount <= 15;
    }, "Mobile number must contain 10 to 15 digits"),
  country: z
    .string()
    .trim()
    .min(1, "Country is required")
    .max(100, "Country must be at most 100 characters"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City must be at most 100 characters"),
  hourlyRate: z.coerce
    .number({ invalid_type_error: "Enter a valid hourly rate" })
    .positive("Hourly rate must be greater than 0")
    .max(100000, "Hourly rate is too high"),
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Profile image is required")
    .refine(
      (file) => file.size <= MAX_PROFILE_IMAGE_SIZE,
      "Profile image must be 4MB or smaller"
    )
    .refine(
      (file) => ALLOWED_PROFILE_IMAGE_TYPES.includes(file.type),
      "Profile image must be JPEG, PNG, WebP, or GIF"
    ),
});

export const AddTeacherQualificationSchema = z.object({
  institutionName: z
    .string()
    .trim()
    .min(2, "Institution name must be at least 2 characters")
    .max(150, "Institution name must be at most 150 characters"),
  degree: z
    .string()
    .trim()
    .min(2, "Degree must be at least 2 characters")
    .max(100, "Degree must be at most 100 characters"),
  fieldOfStudy: z
    .string()
    .trim()
    .min(2, "Field of study must be at least 2 characters")
    .max(100, "Field of study must be at most 100 characters"),
  graduationYear: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid graduation year")
    .refine((year) => {
      const numericYear = Number(year);
      return numericYear >= 1900 && numericYear <= new Date().getFullYear();
    }, "Graduation year cannot be in the future"),
  degreeDocument: z
    .instanceof(File, { message: "Degree document is required" })
    .refine((file) => file.size > 0, "Degree document is required")
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "Degree document must be 10MB or smaller"
    )
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "Degree document must be PDF, JPG, or PNG"
    ),
});

const MAX_CERTIFICATE_SIZE = 10 * 1024 * 1024;
const ALLOWED_CERTIFICATE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export const AddTeacherCertificationSchema = z.object({
  certificationName: z
    .string()
    .trim()
    .min(2, "Certification name must be at least 2 characters")
    .max(150, "Certification name must be at most 150 characters"),
  issuingAuthority: z
    .string()
    .trim()
    .min(2, "Issuing authority must be at least 2 characters")
    .max(150, "Issuing authority must be at most 150 characters"),
  issueDate: z
    .string()
    .min(1, "Issue date is required")
    .refine(
      (date) => !Number.isNaN(Date.parse(date)),
      "Enter a valid issue date"
    )
    .refine(
      (date) => new Date(`${date}T00:00:00`) <= new Date(),
      "Issue date cannot be in the future"
    ),
  certificationFile: z
    .instanceof(File, { message: "Certification file is required" })
    .refine((file) => file.size > 0, "Certification file is required")
    .refine(
      (file) => file.size <= MAX_CERTIFICATE_SIZE,
      "Certification file must be 10MB or smaller"
    )
    .refine(
      (file) => ALLOWED_CERTIFICATE_TYPES.includes(file.type),
      "Certification file must be PDF, JPG, or PNG"
    ),
});

const availabilityTime = z
  .string()
  .regex(/^(0?[1-9]|1[0-2]):[0-5]\d$/, "Enter a valid time");

export const AddTeacherAvailabilitySchema = z.object({
  availabilities: z
    .array(
      z.object({
        dayOfWeek: z.number().int().min(1).max(7),
        startTime: availabilityTime,
        startMeridiem: z.enum(["AM", "PM"]),
        endTime: availabilityTime,
        endMeridiem: z.enum(["AM", "PM"]),
        isAvailable: z.literal(1),
      })
    )
    .min(1, "Select at least one availability time"),
});
