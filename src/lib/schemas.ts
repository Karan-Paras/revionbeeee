import { z } from "zod";

export const email = z.string().email({ message: "Invalid email address" });

export const firstName = z.string().superRefine((val, ctx) => {
  const trimmed = val.trim();

  if (trimmed.length < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "First name is required",
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
