import { fetchServer } from "@/lib/fetch-server";

export type TeacherProfileItemType = "qualification" | "certification";

export async function deleteTeacherProfileItem(
  type: TeacherProfileItemType,
  id: number | string
) {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/${type}/delete/${encodeURIComponent(String(id))}`;
  return fetchServer<null>(apiUrl, "DELETE");
}
