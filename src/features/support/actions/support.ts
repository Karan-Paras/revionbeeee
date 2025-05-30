"use server";

import { SupportSchema } from "@/features/support/schemas";

type SupportFormState = {
  errors: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phoneNumber?: string[];
    message?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export const support = async (
  _formState: SupportFormState,
  formData: FormData
): Promise<SupportFormState> => {
  const validatedFields = SupportSchema.safeParse({
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phone-number"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  return {
    errors: {},
    success: true,
  };
};
