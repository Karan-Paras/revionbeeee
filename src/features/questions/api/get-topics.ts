import fetcher from "@/lib/fetcher";
import { Topic } from "@/types/questions";

export async function getTopics() {
  const apiUrl = "/user/question/bank";

  return await fetcher<Array<Topic>>(apiUrl, "GET");
}
