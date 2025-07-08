import { QuestionBank } from "@/features/subjects/types";
import { fetchClient } from "@/lib/fetch-client";
import type { ID } from "@/types/globals";

export async function getQuestionBank(subjectId: ID) {
  const apiUrl = "/questionbank/list";

  return await fetchClient<Array<QuestionBank>>(apiUrl, "POST", {
    subjectID: subjectId,
  });
}
