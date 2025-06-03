import SubjectDetailsLoading from "@/app/(app)/subjects/[subjectId]/loading";
import { SubjectDetails } from "@/features/subjects/components/subject-details";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<SubjectDetailsLoading />}>
      <SubjectDetails />
    </Suspense>
  );
}
