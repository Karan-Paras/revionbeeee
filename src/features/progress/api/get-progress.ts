import { Progress } from "@/features/progress/types";
import fetcher from "@/lib/fetcher";
import type { ID } from "@/types/globals";

export async function getProgress(topicID: ID | null) {
  const apiUrl = "/get/student/progress";
  return await fetcher<Array<Progress>>(apiUrl, "POST", {
    topicID,
  });
}
