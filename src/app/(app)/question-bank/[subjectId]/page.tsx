import QuestionBankLoading from "@/app/(app)/question-bank/[subjectId]/loading";
import { QuestionBank } from "@/features/subjects/components/question-bank";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<QuestionBankLoading />}>
      <QuestionBank />
    </Suspense>
  );
}
