import { Quiz } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";
import { ID } from "@/types/globals";

export async function getQuiz(subjectId: ID, page: number) {
  const apiUrl = "/quiz/question/list";

  return await fetcher<Array<Quiz>>(apiUrl, "POST", {
    subjectID: subjectId,
    pageNo: page,
  });
}
