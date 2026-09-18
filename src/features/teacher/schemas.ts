import { isValidPhoneNumber } from "libphonenumber-js/max";
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
    .min(1, "Mobile number is required")
    .refine(
      (value) => value.startsWith("+") && isValidPhoneNumber(value),
      "Enter a valid mobile number for the selected country"
    ),
  countryCode: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, "Enter a valid country calling code"),
  country: z
    .string({
      required_error: "Please select a country",
      invalid_type_error: "Please select a country",
    })
    .trim()
    .min(1, "Please select a country")
    .max(100, "Country must be at most 100 characters"),
  city: z
    .string({
      required_error: "Please select a city",
      invalid_type_error: "Please select a city",
    })
    .trim()
    .min(1, "Please select a city")
    .max(100, "City must be at most 100 characters"),
  hourlyRate: z.coerce
    .number({ invalid_type_error: "Enter a valid rate per minute" })
    .finite("Enter a valid rate per minute")
    .positive("Rate per minute must be greater than 0")
    .max(500, "Rate per minute must not exceed 500"),
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
    .string({
      required_error: "Please enter an institution name",
      invalid_type_error: "Please enter an institution name",
    })
    .trim()
    .min(1, "Please enter an institution name")
    .min(2, "Institution name must be at least 2 characters")
    .max(150, "Institution name must be at most 150 characters"),
  degree: z
    .string({
      required_error: "Please enter a degree",
      invalid_type_error: "Please enter a degree",
    })
    .trim()
    .min(1, "Please enter a degree")
    .min(2, "Degree must be at least 2 characters")
    .max(100, "Degree must be at most 100 characters"),
  fieldOfStudy: z
    .string({
      required_error: "Please enter a field of study",
      invalid_type_error: "Please enter a field of study",
    })
    .trim()
    .min(1, "Please enter a field of study")
    .min(2, "Field of study must be at least 2 characters")
    .max(100, "Field of study must be at most 100 characters"),
  graduationYear: z
    .string({
      required_error: "Please enter a graduation year",
      invalid_type_error: "Please enter a graduation year",
    })
    .min(1, "Please enter a graduation year")
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
    .string({
      required_error: "Please enter a certification name",
      invalid_type_error: "Please enter a certification name",
    })
    .trim()
    .min(1, "Please enter a certification name")
    .min(2, "Certification name must be at least 2 characters")
    .max(150, "Certification name must be at most 150 characters"),
  issuingAuthority: z
    .string({
      required_error: "Please enter an issuing authority",
      invalid_type_error: "Please enter an issuing authority",
    })
    .trim()
    .min(1, "Please enter an issuing authority")
    .min(2, "Issuing authority must be at least 2 characters")
    .max(150, "Issuing authority must be at most 150 characters"),
  issueDate: z
    .string({
      required_error: "Please select an issue date",
      invalid_type_error: "Please select an issue date",
    })
    .min(1, "Please select an issue date")
    .refine(
      (date) => !Number.isNaN(Date.parse(date)),
      "Enter a valid issue date"
    )
    .refine(
      (date) => new Date(`${date}T00:00:00`) <= new Date(),
      "Issue date cannot be in the future"
    ),
  certificationFile: z
    .instanceof(File, { message: "Please upload a certificate" })
    .refine((file) => file.size > 0, "Please upload a certificate")
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

/** Convert a 12-hour HH:MM + meridiem to total minutes since midnight. */
function toMinutes(time: string, meridiem: "AM" | "PM"): number {
  const [hourText, minuteText] = time.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);
  if (meridiem === "AM") {
    // 12:xx AM → 0:xx
    if (hour === 12) hour = 0;
  } else {
    // 12:xx PM → 12:xx, others add 12
    if (hour !== 12) hour += 12;
  }
  return hour * 60 + minute;
}

const availableSlotSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: availabilityTime,
  startMeridiem: z.enum(["AM", "PM"]),
  endTime: availabilityTime,
  endMeridiem: z.enum(["AM", "PM"]),
  isAvailable: z.literal(1),
});

const unavailableSlotSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  isAvailable: z.literal(0),
});

export const AddTeacherAvailabilitySchema = z.object({
  availabilities: z
    .array(
      z.discriminatedUnion("isAvailable", [
        availableSlotSchema,
        unavailableSlotSchema,
      ])
    )
    .min(1, "Availability is required")
    .superRefine((slots, ctx) => {
      if (!slots.some((slot) => slot.isAvailable === 1)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please add at least one available time slot",
        });
      }

      slots.forEach((slot, index) => {
        if (slot.isAvailable !== 1) return;
        const startMinutes = toMinutes(slot.startTime, slot.startMeridiem);
        const endMinutes = toMinutes(slot.endTime, slot.endMeridiem);
        if (endMinutes <= startMinutes) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "End time must be after start time",
            path: [index, "endTime"],
          });
        }
      });
    }),
});
