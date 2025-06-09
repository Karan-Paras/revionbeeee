import { getSubjectDetails } from "../api/get-quiz-details";
import type { ID } from "@/types/globals";
import { useQuery } from "@tanstack/react-query";

export const useGetSubjectDetails = (subjectId: ID) => {
  return useQuery({
    queryKey: ["subject", { subjectId }],
    queryFn: () => getSubjectDetails(subjectId),
  });
};
