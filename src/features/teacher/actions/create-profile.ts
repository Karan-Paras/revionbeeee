"use server";

import { unstable_update } from "@/auth";
import { createTeacherProfile as createTeacherProfileApi } from "@/features/teacher/api/create-profile";
import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";

export type CreateTeacherProfileFormState = {
  errors: {
    fullName?: string[];
    professionalTitle?: string[];
    bio?: string[];
    mobileNumber?: string[];
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
  const validatedFields = CreateTeacherProfileSchema.safeParse({
    fullName: formData.get("fullName"),
    professionalTitle: formData.get("professionalTitle"),
    bio: formData.get("bio"),
    mobileNumber: formData.get("mobileNumber"),
    country: formData.get("country"),
    city: formData.get("city"),
    hourlyRate: formData.get("hourlyRate"),
    profileImage: formData.get("profileImage"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const response = await createTeacherProfileApi(validatedFields.data);
    const user = response.data;

    try {
      await unstable_update({
        user: {
          name:
            user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : validatedFields.data.fullName,
          image: user?.profilePicture,
          teacherProfileStatus: user?.teacherProfileStatus ?? 3,
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
