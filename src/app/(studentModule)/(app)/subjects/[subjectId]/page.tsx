import { getSubjectDetailsOnServer } from "@/features/subjects/api/get-subject-details-on-server";
import { SubjectDetails } from "@/features/subjects/components/subject-details";
import type { Metadata } from "next";
interface SubjectMetadataProps {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata({
  params,
}: SubjectMetadataProps): Promise<Metadata> {
  const { subjectId } = await params;

  let title = `Subject Details - Revision Bee`;
  let description = `Explore subject details and resources.`;

  try {
    const result = await getSubjectDetailsOnServer(subjectId);
    const subjectName = result?.data?.subjectName;
    if (subjectName) {
      title = `${subjectName} - Revision Bee`;
      description = `Learn about ${subjectName}, watch videos, take quizzes, and track progress.`;
    }
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

export default SubjectDetails;
