import fetcher from "@/lib/fetcher";

import type { ID } from "@/types/globals";

export async function submitQuiz({
  quizId,
  totalAttempts,
  progress,
}: {
  quizId: ID;
  totalAttempts: number;
  progress: number;
}) {
  const apiUrl = "/submit/quiz/result";

  return await fetcher(apiUrl, "POST", {
    quizID: quizId,
    total_attempts: totalAttempts,
    progress,
  });
}
