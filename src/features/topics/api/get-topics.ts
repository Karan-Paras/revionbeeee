import { Topic } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";

export async function getTopics() {
  const apiUrl = "/user/question/bank";

  return await fetcher<Array<Topic>>(apiUrl, "GET");
}
