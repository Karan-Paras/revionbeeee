import { Topic } from "@/features/subjects/types";
import { fetchServer } from "@/lib/fetch-server";

export async function getSubjectsOnServer() {
  const apiUrl = "/topic/list";

  return await fetchServer<Array<Topic>>(apiUrl, "GET");
}
