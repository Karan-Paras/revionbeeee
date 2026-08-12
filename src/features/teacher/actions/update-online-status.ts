"use server";

import { updateTeacherOnlineStatus as updateTeacherOnlineStatusApi } from "@/features/teacher/api/update-online-status";

export type UpdateTeacherOnlineStatusResult =
  | { success: true; isOnline: boolean }
  | { success: false; error: string };

export async function updateTeacherOnlineStatus(
  isOnline: boolean
): Promise<UpdateTeacherOnlineStatusResult> {
  try {
    const response = await updateTeacherOnlineStatusApi(isOnline);
    const data = response.data;
    const returnedStatus =
      data?.isOnline ??
      data?.is_online ??
      data?.onlineStatus ??
      data?.online_status;

    return {
      success: true,
      isOnline:
        typeof returnedStatus === "boolean"
          ? returnedStatus
          : typeof returnedStatus === "number"
            ? returnedStatus === 1
            : isOnline,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to update online status.",
    };
  }
}
