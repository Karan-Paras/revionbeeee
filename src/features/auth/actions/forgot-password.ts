"use server";

import { forgotPassword as forgotPasswordApi } from "@/features/auth/api/forgot-password";
import { ForgotPasswordSchema } from "@/features/auth/schemas";

import type { ApiErrorResponse } from "@/types/api";

type ForgotPasswordFormState = {
  errors: {
    email?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export const forgotPassword = async (
  _formState: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> => {
  const validatedFields = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await forgotPasswordApi(validatedFields.data);
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  return { errors: {}, success: true };
};
