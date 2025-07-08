import { QuizDetails } from "@/features/quiz/components/quiz-details";
import { getSubjectDetailsOnServer } from "@/features/subjects/api/get-subject-details-on-server";
import type { Metadata } from "next";

interface QuizMetadataProps {
  params: Promise<{ quizId: string }>;
}

export async function generateMetadata({
  params,
}: QuizMetadataProps): Promise<Metadata> {
  const { quizId } = await params;

  let title = "Quiz Details - Revision Bee";
  let description = "View quiz details and start practicing.";

  try {
    const result = await getSubjectDetailsOnServer(quizId);
    const subjectName = result?.data?.subjectName;
    if (subjectName) {
      title = `${subjectName} Quiz - Revision Bee`;
      description = `Details and practice quizzes for ${subjectName}.`;
    }
  } catch {
    console.error(`Failed to fetch subject details for quiz ID: ${quizId}`);
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

export default QuizDetails;
