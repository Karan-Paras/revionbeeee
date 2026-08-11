import { fetchServer } from "@/lib/fetch-server";

export async function logoutTeacher() {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/logout`;
  return fetchServer<null>(apiUrl, "POST");
}
