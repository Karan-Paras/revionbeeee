"use server";

import { unstable_update } from "@/auth";
import { createProfile as createProfileApi } from "@/features/user/api/create-profile";
import { CreateProfileSchema } from "@/features/user/schemas";

import type { ApiErrorResponse } from "@/types/api";

type CreateProfileFormState = {
  errors: {
    profilePicture?: string[];
    firstName?: string[];
    lastName?: string[];
    phoneNumber?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export const createProfile = async (
  _formState: CreateProfileFormState,
  formData: FormData
): Promise<CreateProfileFormState> => {
  const validatedFields = CreateProfileSchema.safeParse({
    profilePicture: formData.get("profile-picture"),
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    phoneNumber: formData.get("phone-number"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const payload = validatedFields.data;

  if (
    !(payload.profilePicture instanceof File) ||
    payload.profilePicture.size === 0 ||
    !payload.profilePicture.name ||
    payload.profilePicture.type === "application/octet-stream"
  ) {
    delete payload.profilePicture;
  }

  if (!payload.phoneNumber) {
    payload.phoneNumber = "";
  }

  let user = null;

  try {
    const json = await createProfileApi(payload);
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

  await unstable_update({
    user: {
      name: `${user.firstName} ${user.lastName}`,
      image: user.profilePicture ?? user.profile_image_url,
      profileStatus: user.profileStatus ?? user.profile_status ?? 2,
    },
  });

  return { errors: {}, success: true };
};
