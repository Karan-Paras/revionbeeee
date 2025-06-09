import { Topics } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";

export async function getProgressTopics() {
  const apiUrl = "/get/topics";

  return await fetcher<Array<Topics>>(apiUrl, "GET");
}
