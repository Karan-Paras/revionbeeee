import { getQuiz } from "@/features/quiz/api/get-quiz";
import type { ID } from "@/types/globals";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useGetQuiz = (subjectId: ID) => {
  const initialData = useQuery({
    queryKey: ["subject", "quiz", { subjectId }, { page: 0 }],
    queryFn: () => getQuiz(subjectId, 0),
    retry: false,
  });

  const totalQuestions = initialData.data?.totalQuestions || 0;

  const result = useQueries({
    queries: [...Array(totalQuestions)].map((_, index) => ({
      queryKey: ["subject", "quiz", { subjectId }, { page: index }],
      queryFn: () => getQuiz(subjectId, index),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  return {
    ...result,
    totalQuestions,
  };
};
