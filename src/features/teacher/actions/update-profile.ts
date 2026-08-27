"use server";

import { unstable_update } from "@/auth";
import { updateTeacherProfile as updateTeacherProfileApi } from "@/features/teacher/api/create-profile";
import { getInternationalPhoneNumber } from "@/features/teacher/phone-number";
import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";

export type UpdateTeacherProfileResult =
  | { success: true }
  | { success: false; error: string };

const UpdateTeacherProfileSchema = CreateTeacherProfileSchema.extend({
  profileImage: CreateTeacherProfileSchema.shape.profileImage.optional(),
});

export async function updateTeacherProfile(
  formData: FormData
): Promise<UpdateTeacherProfileResult> {
  const selectedImage = formData.get("profileImage");
  const profileImage =
    selectedImage instanceof File && selectedImage.size > 0
      ? selectedImage
      : undefined;
  const validatedFields = UpdateTeacherProfileSchema.safeParse({
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
    profileImage,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message ?? "Invalid profile data",
    };
  }

  try {
    const response = await updateTeacherProfileApi(validatedFields.data);
    const user = response.data;

    try {
      await unstable_update({
        user: {
          name:
            user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : validatedFields.data.fullName,
          image: user?.profilePicture,
        },
      });
    } catch (sessionError) {
      console.error(
        "Teacher profile was updated, but session refresh failed:",
        sessionError
      );
    }

    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to update profile. Please try again.",
    };
  }
}
