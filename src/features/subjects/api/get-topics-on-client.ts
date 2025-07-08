import { Topic } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";

export async function getTopicsOnClient() {
  const apiUrl = "/topic/list";

  return await fetcher<Array<Topic>>(apiUrl, "GET");
}
