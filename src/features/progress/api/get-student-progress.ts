import { StudentProgress } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";
import { ID } from "@/types/globals";

export async function getStudentProgress(topicID: ID) {
  const apiUrl = "/get/student/progress";
  return await fetcher<[StudentProgress]>(apiUrl, "POST", {
    topicID: topicID,
  });
}
