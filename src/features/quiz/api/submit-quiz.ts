import { fetchClient } from "@/lib/fetch-client";
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

  return await fetchClient(apiUrl, "POST", {
    quizID: quizId,
    total_attempts: totalAttempts,
    progress,
  });
}
