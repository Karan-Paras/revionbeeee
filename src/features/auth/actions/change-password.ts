"use server";

import { ChangePasswordSchema } from "@/features/auth/schemas";
import { changePassword as changePasswordApi } from "@/features/auth/api/change-password";
import type { ApiErrorResponse } from "@/types/api";

type ChangePasswordFormState = {
  errors: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export const changePassword = async (
  _formState: ChangePasswordFormState,
  formData: FormData
): Promise<ChangePasswordFormState> => {
  const validatedFields = ChangePasswordSchema.safeParse({
    currentPassword: formData.get("current-password"),
    newPassword: formData.get("new-password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await changePasswordApi(validatedFields.data);
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  return {
    errors: {},
    success: true,
  };
};
