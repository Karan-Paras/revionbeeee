import { useMutation } from "@tanstack/react-query";

import { submitQuiz } from "@/features/quiz/api/submit-quiz";

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: submitQuiz,
  });
};
