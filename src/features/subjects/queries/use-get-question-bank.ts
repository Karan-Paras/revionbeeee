import { getQuestionBank } from "@/features/subjects/api/get-question-bank";
import type { ID } from "@/types/globals";
import { useQuery } from "@tanstack/react-query";

export const useGetQuestionBank = (subjectId: ID) => {
  return useQuery({
    queryKey: ["subject", "question-bank", { subjectId }],
    queryFn: () => getQuestionBank(subjectId),
  });
};
