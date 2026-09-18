import { isValidPhoneNumber } from "libphonenumber-js/max";
import { z } from "zod";

export const phoneNumber = z
  .string()
  .trim()
  .superRefine((val, ctx) => {
    if (val.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number is required",
      });
      return;
    }

    if (!val.startsWith("+") || !isValidPhoneNumber(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid mobile number for the selected country",
      });
    }
  });

export const email = z
  .string()
  .trim()
  .toLowerCase()
  .superRefine((val, ctx) => {
    if (val.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email address is required",
      });
      return;
    }

    if (!z.string().email().safeParse(val).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid email address (for example, name@example.com)",
      });
    }
  });

export const firstName = z.string().superRefine((val, ctx) => {
  const trimmed = val.trim();

  if (trimmed.length < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "First name is required",
    });
    return;
  }

  if (trimmed.length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "First name must be at least 2 characters",
    });
    return;
  }

  if (trimmed.length > 20) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "First name must be at most 20 characters",
    });
    return;
  }

  if (!/^[A-Za-z\s]+$/.test(trimmed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Name can only contain letters",
    });
  }
});

export const lastName = z.string().superRefine((val, ctx) => {
  const trimmed = val.trim();

  if (trimmed.length < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Last name is required",
    });
    return;
  }

  if (trimmed.length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Last name must be at least 2 characters",
    });
    return;
  }

  if (trimmed.length > 20) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Last name must be at most 20 characters",
    });
    return;
  }

  if (!/^[A-Za-z\s]+$/.test(trimmed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Name can only contain letters",
    });
  }
});
