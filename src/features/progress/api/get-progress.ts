import { Progress } from "@/features/progress/types";
import { fetchClient } from "@/lib/fetch-client";
import type { ID } from "@/types/globals";

export async function getProgress(topicID: ID | null) {
  const apiUrl = "/get/student/progress";
  return await fetchClient<Array<Progress>>(apiUrl, "POST", {
    topicID,
  });
}
