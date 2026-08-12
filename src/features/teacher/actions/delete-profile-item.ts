"use server";

import {
  deleteTeacherProfileItem as deleteTeacherProfileItemApi,
  type TeacherProfileItemType,
} from "@/features/teacher/api/delete-profile-item";

export type DeleteTeacherProfileItemResult =
  | { success: true }
  | { success: false; error: string };

export async function deleteTeacherProfileItem(
  type: TeacherProfileItemType,
  id: number | string
): Promise<DeleteTeacherProfileItemResult> {
  if (!String(id).trim()) {
    return { success: false, error: "Invalid item id." };
  }

  try {
    await deleteTeacherProfileItemApi(type, id);
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : `Unable to delete ${type}. Please try again.`,
    };
  }
}
