import { Topic } from "@/features/subjects/types";
import { fetchClient } from "@/lib/fetch-client";

export async function getTopicsOnClient() {
  const apiUrl = "/topic/list";

  return await fetchClient<Array<Topic>>(apiUrl, "GET");
}
