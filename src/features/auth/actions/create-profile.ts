"use server";

import { createProfile as createProfileApi } from "@/features/auth/api/create-profile";
import type { ApiErrorResponse } from "@/types/api";
import { redirect } from "next/navigation";
import { paths } from "@/routes";
import { unstable_update } from "@/auth";
import { CreateProfileSchema } from "@/features/auth/schemas";

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

  let user = null;

  try {
    const json = await createProfileApi(validatedFields.data);
    user = json.data;
  } catch (error: unknown) {
    if ((error as ApiErrorResponse)?.message) {
      return {
        errors: {
          _form: [(error as ApiErrorResponse)?.message || "An error occurred!"],
        },
      };
    }
  }

  if (!user) {
    return { errors: { _form: ["An error occurred!"] } };
  }

  const session = await unstable_update({
    user: {
      name: `${user.firstName} ${user.lastName}`,
      image: user.profilePicture,
    },
  });

  console.log({ session });

  redirect(paths.subscriptionPlans());
};
