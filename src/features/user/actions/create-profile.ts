"use server";

import { CreateProfileSchema } from "@/features/user/schemas";
import { createProfile as createProfileApi } from "@/features/user/api/create-profile";
import { ApiErrorResponse } from "@/types/api";
import { redirect } from "next/navigation";
import { paths } from "@/routes";

type CreateProfileFormState = {
  errors: {
    profilePicture?: string[];
    firstName?: string[];
    lastName?: string[];
    phoneNumber?: string[];
    _form?: string[];
  };
};

export const createProfile = async (
  _formState: CreateProfileFormState,
  formData: FormData
): Promise<CreateProfileFormState> => {
  const validatedFields = CreateProfileSchema.safeParse({
    profilePicture: formData.get("profilePicture"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await createProfileApi(validatedFields.data);
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  redirect(paths.subscriptionPlans());
};
