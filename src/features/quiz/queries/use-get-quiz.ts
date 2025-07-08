import { getQuizOnClient } from "@/features/quiz/api/get-quiz-on-client";
import type { ID } from "@/types/globals";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useGetQuiz = (subjectId: ID) => {
  const initialQuery = useQuery({
    queryKey: ["subject", "quiz", { subjectId }, { page: 0 }],
    queryFn: () => getQuizOnClient(subjectId, 0),
    retry: false,
  });

  const totalQuestions = initialQuery.data?.totalQuestions || 0;

  return useQueries({
    queries: [...Array(totalQuestions)].map((_, index) => ({
      queryKey: ["subject", "quiz", { subjectId }, { page: index }],
      queryFn: () => getQuizOnClient(subjectId, index),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        totalQuestions,
        error: initialQuery.error,
      };
    },
  });
};
