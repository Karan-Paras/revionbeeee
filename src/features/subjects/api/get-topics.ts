import fetcher from "@/lib/fetcher";
import { Topic } from "@/features/subjects/types";

export async function getTopics() {
  const apiUrl = "/topic/list";

  return await fetcher<Array<Topic>>(apiUrl, "GET");
}
