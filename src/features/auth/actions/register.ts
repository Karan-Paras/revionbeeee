"use server";

import { RegisterSchema } from "@/features/auth/schemas";
import { register as registerApi } from "@/features/auth/api/register";
import type { ApiErrorResponse } from "@/types/api";
import { signIn } from "@/auth";

type RegisterFormState = {
  errors: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export const register = async (
  _formState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const termsAndConditions = formData.get("terms-and-conditions");

  if (termsAndConditions !== "on") {
    return {
      errors: {
        _form: [
          "You must agree to the Terms & Conditions and Privacy Policy before registering.",
        ],
      },
    };
  }

  try {
    await registerApi(validatedFields.data);
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }

  return { errors: {}, success: true };
};
