import { QuizFinished } from "@/features/quiz/components/quiz-finished";
import { getSubjectDetailsOnServer } from "@/features/subjects/api/get-subject-details-on-server";
import type { Metadata } from "next";

interface QuizFinishedMetadataProps {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata({
  params,
}: QuizFinishedMetadataProps): Promise<Metadata> {
  const { subjectId } = await params;

  let title = "Quiz Finished - Revision Bee";
  let description =
    "You have completed your quiz. Check your progress and results.";

  try {
    const result = await getSubjectDetailsOnServer(subjectId);
    const subjectName = result?.data?.subjectName;
    title = `Quiz Finished - ${subjectName} | Revision Bee`;
    description = `Congratulations on completing the quiz for ${subjectName}. View your detailed results and progress here.`;
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

export default QuizFinished;
