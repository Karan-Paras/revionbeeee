import type { Quiz } from "@/features/quiz/types";
import { fetchClient } from "@/lib/fetch-client";
import type { ID } from "@/types/globals";

export async function getQuizOnClient(subjectId: ID, page: number) {
  const apiUrl = "/quiz/question/list";

  return await fetchClient<[Quiz]>(apiUrl, "POST", {
    subjectID: subjectId,
    pageNo: page,
  });
}
