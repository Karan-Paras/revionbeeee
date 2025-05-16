"use server";

import { ForgotPasswordSchema } from "@/features/forgot-password/schemas";
import { paths } from "@/routes";
import { redirect } from "next/navigation";

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

  redirect(paths.emailSent());
};
