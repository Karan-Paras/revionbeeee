import { z } from "zod";

export const email = z.string().email({ message: "Invalid email address" });

// new password validation
export const newPassword = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
    {
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    }
  );

export const confirmPassword = z.string().trim();
