import { Subject } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";
import { ID } from "@/types/globals";

export async function getSubjectDetails(subjectId: ID) {
  const apiUrl = "/subject/detail";

  return await fetcher<[Subject]>(apiUrl, "POST", {
    subjectID: subjectId,
  });
}
