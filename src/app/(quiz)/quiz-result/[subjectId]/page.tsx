import { QuizResult } from "@/features/quiz/components/quiz-result";
import { getSubjectDetailsOnServer } from "@/features/subjects/api/get-subject-details-on-server";
import type { Metadata } from "next";

interface QuizResultMetadataProps {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata({
  params,
}: QuizResultMetadataProps): Promise<Metadata> {
  const { subjectId } = await params;

  let title = "Quiz Result - Revision Bee";
  let description = "Review your quiz results and answers to improve.";

  try {
    const result = await getSubjectDetailsOnServer(subjectId);
    const subjectName = result?.data?.subjectName;
    title = `Quiz Result - ${subjectName} | Revision Bee`;
    description = `See detailed results and explanations for your quiz on ${subjectName}.`;
  } catch {
    console.error(`Failed to fetch subject details for ID: ${subjectId}`);
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

export default QuizResult;
