import type { Subject } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";
import type { ID } from "@/types/globals";

export async function getSubjectDetailsOnClient(subjectId: ID) {
  const apiUrl = "/subject/detail";

  return await fetcher<Subject>(apiUrl, "POST", {
    subjectID: subjectId,
  });
}
