import { Topic } from "@/features/subjects/types";
import api from "@/lib/api";

export async function getTopicsOnServer() {
  const apiUrl = "/topic/list";

  return await api<Array<Topic>>(apiUrl, "GET");
}
