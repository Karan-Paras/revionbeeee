import { useQuery } from "@tanstack/react-query";

import { getSubjectDetails } from "@/features/subjects/api/get-subject-details";

import type { ID } from "@/types/globals";

export const useGetSubjectDetails = (subjectId: ID) => {
  return useQuery({
    queryKey: ["subject", { subjectId }],
    queryFn: () => getSubjectDetails(subjectId),
  });
};
