import type { Quiz } from "@/features/quiz/types";
import fetcher from "@/lib/fetcher";
import type { ID } from "@/types/globals";

export async function getQuiz(subjectId: ID, page: number) {
  const apiUrl = "/quiz/question/list";

  return await fetcher<[Quiz]>(apiUrl, "POST", {
    subjectID: subjectId,
    pageNo: page,
  });
}
