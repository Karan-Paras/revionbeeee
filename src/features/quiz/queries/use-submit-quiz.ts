import { submitQuiz } from "@/features/quiz/api/submit-quiz";
import { useMutation } from "@tanstack/react-query";

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: submitQuiz,
  });
};
