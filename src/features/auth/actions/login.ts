"use server";

import { LoginSchema } from "@/features/auth/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === "CredentialsSignin"
        ? { errors: { _form: ["Invalid credentials!"] } }
        : { errors: { _form: ["Something went wrong!"] } };
    }
  }

  return { errors: {}, success: true };
};
