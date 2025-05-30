import fetcher from "@/lib/fetcher";
import { Topic } from "@/features/questions/types";

export async function getTopics() {
  const apiUrl = "/user/question/bank";

  return await fetcher<Array<Topic>>(apiUrl, "GET");
}
