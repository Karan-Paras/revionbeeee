"use server";

import { logoutTeacher as logoutTeacherApi } from "@/features/teacher/api/logout";

export type LogoutTeacherResult =
  | { success: true }
  | { success: false; error: string };

export async function logoutTeacher(): Promise<LogoutTeacherResult> {
  try {
    await logoutTeacherApi();
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
    };
  }
}
