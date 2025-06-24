import fetcher from "@/lib/fetcher";
import { QuestionBank } from "@/features/subjects/types";
import type { ID } from "@/types/globals";

export async function getQuestionBank(subjectId: ID) {
  const apiUrl = "/questionbank/list";

  return await fetcher<Array<QuestionBank>>(apiUrl, "POST", {
    subjectID: subjectId,
  });
}
