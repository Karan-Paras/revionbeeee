import type { Quiz } from "@/features/quiz/types";
import { fetchServer } from "@/lib/fetch-server";
import type { ID } from "@/types/globals";

export async function getQuizOnServer(subjectId: ID, page: number) {
  const apiUrl = "/quiz/question/list";

  return await fetchServer<[Quiz]>(apiUrl, "POST", {
    subjectID: subjectId,
    pageNo: page,
  });
}
