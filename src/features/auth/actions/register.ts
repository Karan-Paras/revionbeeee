"use server";

import { signIn } from "@/auth";
import { register as registerApi } from "@/features/auth/api/register";
import { RegisterSchema } from "@/features/auth/schemas";
import { isDisposableEmail } from "@/lib/utils";
import type { ApiErrorResponse } from "@/types/api";

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

  if (isDisposableEmail(validatedFields.data.email)) {
    return {
      errors: {
        email: ["Please use a valid email address."],
      },
    };
  }

  let json;

  try {
    json = await registerApi(validatedFields.data);
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  try {
    await signIn("credentials", {
      user: JSON.stringify(json?.data),
      token: json?.token,
      redirect: false,
    });
  } catch (error: unknown) {
    console.error(error);
    return { errors: { _form: ["Something went wrong!"] } };
  }

  return { errors: {}, success: true };
};
