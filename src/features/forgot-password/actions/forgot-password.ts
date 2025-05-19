"use server";

import { ForgotPasswordSchema } from "@/features/forgot-password/schemas";
import { paths } from "@/routes";
import { redirect } from "next/navigation";
import { forgotPassword as forgotPasswordApi } from "@/features/forgot-password/api/forgot-password";
import type { ApiErrorResponse } from "@/types/api";

type ForgotPasswordFormState = {
  errors: {
    email?: string[];
    _form?: string[];
  };
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

  redirect(paths.emailSent());
};
