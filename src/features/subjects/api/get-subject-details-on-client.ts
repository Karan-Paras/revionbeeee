import type { Subject } from "@/features/subjects/types";
import { fetchClient } from "@/lib/fetch-client";
import type { ID } from "@/types/globals";

export async function getSubjectDetailsOnClient(subjectId: ID) {
  const apiUrl = "/subject/detail";

  return await fetchClient<Subject>(apiUrl, "POST", {
    subjectID: subjectId,
  });
}
