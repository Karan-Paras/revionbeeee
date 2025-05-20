"use server";

import { paths } from "@/routes";
import { redirect } from "next/navigation";
import { resetPassword as resetPasswordApi } from "@/features/auth/api/reset-password";
import type { ApiErrorResponse } from "@/types/api";
import { ResetPasswordSchema } from "@/features/auth/schemas";

type ResetPasswordFormState = {
  errors: {
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
};

export const resetPassword = async (
  token: string,
  _formState: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> => {
  const validatedFields = ResetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await resetPasswordApi(validatedFields.data, token);
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  redirect(paths.passwordChanged());
};
