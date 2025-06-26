"use server";

import { signIn } from "@/auth";
import { login as loginApi } from "@/features/auth/api/login";
import { LoginSchema } from "@/features/auth/schemas";
import type { ApiErrorResponse } from "@/types/api";

type LoginFormState = {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export const login = async (
  _formState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  let json;

  try {
    json = await loginApi(validatedFields.data);
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
