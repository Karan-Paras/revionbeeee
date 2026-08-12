import { fetchServer } from "@/lib/fetch-server";

export type TeacherOnlineStatusResponse = {
  isOnline?: boolean | number;
  is_online?: boolean | number;
  onlineStatus?: boolean | number;
  online_status?: boolean | number;
  [key: string]: unknown;
};

export async function updateTeacherOnlineStatus(isOnline: boolean) {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/online/status`;
  return fetchServer<TeacherOnlineStatusResponse>(apiUrl, "POST", {
    isOnline: isOnline ? 1 : 0,
  });
}
