import type { Subject } from "@/features/subjects/types";
import { fetchServer } from "@/lib/fetch-server";
import type { ID } from "@/types/globals";

export async function getSubjectDetailsOnServer(subjectId: ID) {
  const apiUrl = "/subject/detail";

  return await fetchServer<Subject>(apiUrl, "POST", {
    subjectID: subjectId,
  });
}
