"use server";

import { UpdateProfileSchema } from "@/features/user/schemas";
import { updateProfile as updateProfileApi } from "@/features/user/api/update-profile";
import type { ApiErrorResponse } from "@/types/api";
import { auth, unstable_update } from "@/auth";

type UpdateProfileFormState = {
  errors: {
    profilePicture?: string[];
    firstName?: string[];
    lastName?: string[];
    city?: string[];
    state?: string[];
    gender?: string[];
    phoneNumber?: string[];
    address?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export const updateProfile = async (
  _formState: UpdateProfileFormState,
  formData: FormData
): Promise<UpdateProfileFormState> => {
  const validatedFields = UpdateProfileSchema.safeParse({
    profilePicture: formData.get("profilePicture"),
    firstName: formData.get("firstName")?.toString() || "",
    lastName: formData.get("lastName")?.toString() || "",
    city: formData.get("city")?.toString() || "",
    state: formData.get("state")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    phoneNumber: formData.get("phoneNumber")?.toString() || "",
    address: formData.get("address")?.toString() || "",
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

  if (!payload.city) {
    payload.city = "";
  }

  if (!payload.state) {
    payload.state = "";
  }

  if (!payload.address) {
    payload.address = "";
  }

  let user = null;
  try {
    const json = await updateProfileApi(payload);
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

  const session = await auth();

  if (!session) {
    return { errors: { _form: ["An error occurred!"] } };
  }

  if (
    session.user.image !== user?.profilePicture ||
    session.user.name !== `${user?.firstName} ${user?.lastName}`
  ) {
    await unstable_update({
      user: {
        name: `${user.firstName} ${user.lastName}`,
        image: user.profilePicture,
      },
    });
  }

  return { errors: {}, success: true };
};
