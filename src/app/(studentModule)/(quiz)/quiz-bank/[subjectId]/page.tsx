import { getQuizOnServer } from "@/features/quiz/api/get-quiz-on-server";
import { QuizBank } from "@/features/quiz/components/quiz-bank";

import type { Metadata } from "next";

interface QuizBankMetadataProps {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata({
  params,
}: QuizBankMetadataProps): Promise<Metadata> {
  const { subjectId } = await params;

  let title = `Quiz - Revision Bee`;
  let description = `Take quizzes to test your knowledge and track your learning progress.`;

  try {
    const quizData = await getQuizOnServer(subjectId, 0);
    const quizTitle = quizData.data?.[0].quiz.title;

    if (quizTitle) {
      title = `${quizTitle} - Revision Bee`;
      description = `Take the quiz "${quizTitle}" to test your knowledge and improve your skills.`;
    }
  } catch {
    console.error(`Error fetching quiz data for subject ID: ${subjectId}`);
  }

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}
export default QuizBank;
