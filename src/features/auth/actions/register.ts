"use server";

import { RegisterSchema } from "@/features/auth/schemas";
import { register as registerApi } from "@/features/auth/api/register";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import { ApiErrorResponse } from "@/types/api";

type RegisterFormState = {
  errors: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
};

export const register = async (
  _formState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  const result = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await registerApi(result.data);
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  redirect(paths.createProfile());
};
