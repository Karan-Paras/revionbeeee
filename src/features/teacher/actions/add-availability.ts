"use server";

import { addTeacherAvailability as addTeacherAvailabilityApi } from "@/features/teacher/api/add-availability";
import { AddTeacherAvailabilitySchema } from "@/features/teacher/schemas";

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
    await addTeacherAvailabilityApi(validatedFields.data);
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
