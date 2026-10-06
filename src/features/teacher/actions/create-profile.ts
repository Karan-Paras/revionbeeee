"use server";

import { unstable_update } from "@/auth";
import { getTeacherProfileStatusFromResponse } from "@/features/teacher/actions/profile-status";
import {
  createTeacherProfile as createTeacherProfileApi,
  updateTeacherProfile as updateTeacherProfileApi,
  type UpdateTeacherProfileInput,
} from "@/features/teacher/api/create-profile";
import { getInternationalPhoneNumber } from "@/features/teacher/phone-number";
import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";

export type CreateTeacherProfileFormState = {
  errors: {
    fullName?: string[];
    professionalTitle?: string[];
    bio?: string[];
    mobileNumber?: string[];
    countryCode?: string[];
    country?: string[];
    city?: string[];
    hourlyRate?: string[];
    profileImage?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export async function createTeacherProfile(
  _formState: CreateTeacherProfileFormState,
  formData: FormData
): Promise<CreateTeacherProfileFormState> {
  const profileImage = formData.get("profileImage");
  const hasNewProfileImage =
    profileImage instanceof File &&
    profileImage.size > 0 &&
    profileImage.type !== "application/octet-stream";
  const hasExistingProfileImage = Boolean(
    formData.get("existingProfileImage")?.toString().trim()
  );
  const hasSavedProfile = formData.get("hasSavedProfile") === "1";
  const baseProfileFields = {
    fullName: formData.get("fullName"),
    professionalTitle: formData.get("professionalTitle"),
    bio: formData.get("bio"),
    mobileNumber: getInternationalPhoneNumber(
      formData.get("mobileNumber"),
      formData.get("countryCode")
    ),
    countryCode: formData.get("countryCode"),
    country: formData.get("country"),
    city: formData.get("city"),
    hourlyRate: formData.get("hourlyRate"),
  };

  const validatedFields =
    hasNewProfileImage || !hasExistingProfileImage
      ? CreateTeacherProfileSchema.safeParse({
          ...baseProfileFields,
          profileImage,
        })
      : CreateTeacherProfileSchema.omit({ profileImage: true }).safeParse(
          baseProfileFields
        );

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const profileData = validatedFields.data as UpdateTeacherProfileInput;
    const response = hasSavedProfile
      ? await updateTeacherProfileApi(profileData)
      : await createTeacherProfileApi(
          validatedFields.data as Parameters<typeof createTeacherProfileApi>[0]
        );
    const user = response.data;
    const teacherProfileStatus = getTeacherProfileStatusFromResponse(
      response.data
    );

    try {
      await unstable_update({
        user: {
          name:
            user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : validatedFields.data.fullName,
          image: user?.profilePicture,
          ...(teacherProfileStatus !== undefined
            ? { teacherProfileStatus }
            : {}),
        },
      });
    } catch (sessionError) {
      console.error(
        "Teacher profile was created, but session refresh failed:",
        sessionError
      );
    }

    return { errors: {}, success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create teacher profile. Please try again.";

    return { errors: { _form: [message] } };
  }
}
