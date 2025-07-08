import { QuestionBank } from "@/features/question-bank/components/question-bank";
import { getSubjectDetailsOnServer } from "@/features/subjects/api/get-subject-details-on-server";
import type { Metadata } from "next";

interface QuestionBankMetadataProps {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata({
  params,
}: QuestionBankMetadataProps): Promise<Metadata> {
  const { subjectId } = await params;

  let subjectName = subjectId;

  try {
    const result = await getSubjectDetailsOnServer(subjectId);
    subjectName = result?.data?.subjectName || subjectId;
  } catch {
    console.error(`Failed to fetch subject details for ID: ${subjectId}`);
    subjectName = subjectId;
  }

  return {
    title: `Question Bank - ${subjectName} | Revision Bee`,
    description: `Explore subject-wise practice questions and video solutions for ${subjectName}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default QuestionBank;
