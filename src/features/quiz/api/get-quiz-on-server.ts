import type { Quiz } from "@/features/quiz/types";
import api from "@/lib/api";
import type { ID } from "@/types/globals";

export async function getQuizOnServer(subjectId: ID, page: number) {
  const apiUrl = "/quiz/question/list";

  return await api<[Quiz]>(apiUrl, "POST", {
    subjectID: subjectId,
    pageNo: page,
  });
}
