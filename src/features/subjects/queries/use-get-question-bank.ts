import { getQuestionBank } from "@/features/subjects/api/get-question-bank";
import { useQuery } from "@tanstack/react-query";
import type { ID } from "@/types/globals";

export const useGetQuestionBank = (subjectId: ID) => {
  return useQuery({
    queryKey: ["subject", "question-bank", { subjectId }],
    queryFn: () => getQuestionBank(subjectId),
    retry: false,
  });
};
