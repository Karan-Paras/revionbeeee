import type { Subject } from "@/features/subjects/types";
import api from "@/lib/api";
import type { ID } from "@/types/globals";

export async function getSubjectDetailsOnServer(subjectId: ID) {
  const apiUrl = "/subject/detail";

  return await api<Subject>(apiUrl, "POST", {
    subjectID: subjectId,
  });
}
