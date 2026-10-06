"use server";

import { unstable_update } from "@/auth";
import { getTeacherProfileStatusFromResponse } from "@/features/teacher/actions/profile-status";
import { addTeacherAvailability as addTeacherAvailabilityApi } from "@/features/teacher/api/add-availability";
import { AddTeacherAvailabilitySchema } from "@/features/teacher/schemas";
import { revalidatePath } from "next/cache";

export type AddTeacherAvailabilityResult =
  | { success: true }
  | { success: false; error: string };

export async function addTeacherAvailability(
  input: unknown
): Promise<AddTeacherAvailabilityResult> {
  const validatedFields = AddTeacherAvailabilitySchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message ?? "Invalid availability",
    };
  }

  try {
    const response = await addTeacherAvailabilityApi(validatedFields.data);
    const teacherProfileStatus = getTeacherProfileStatusFromResponse(
      response.data
    );
    try {
      if (teacherProfileStatus !== undefined) {
        await unstable_update({
          user: {
            teacherProfileStatus,
          },
        });
      }
    } catch (sessionError) {
      console.error(
        "Teacher availability was saved, but session refresh failed:",
        sessionError
      );
    }
    revalidatePath("/teacher/profile/availability");
    revalidatePath("/teacher/profile/availability/update");
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to save availability. Please try again.",
    };
  }
}
