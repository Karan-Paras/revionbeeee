"use server";

import { contactUs as contactUsApi } from "@/features/support/api/contact-us";
import type { ApiErrorResponse } from "@/types/api";
import { ContactUsSchema } from "@/features/support/schemas";

type ContactUsFormState = {
  errors: {
    email?: string[];
    subject?: string[];
    message?: string[];
    _form?: string[];
    attachment?: string[];
  };
  success?: boolean;
};

export const contactUs = async (
  _formState: ContactUsFormState,
  formData: FormData
): Promise<ContactUsFormState> => {
  const validatedFields = ContactUsSchema.safeParse({
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    attachment: formData.get("attachment"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const payload = validatedFields.data;

  if (
    !(payload.attachment instanceof File) ||
    payload.attachment.size === 0 ||
    !payload.attachment.name ||
    payload.attachment.type === "application/octet-stream"
  ) {
    delete payload.attachment;
  }

  try {
    await contactUsApi(payload);
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
