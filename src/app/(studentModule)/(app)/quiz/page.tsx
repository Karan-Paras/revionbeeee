import { Quiz } from "@/app/(studentModule)/(app)/quiz/quiz";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz - Revision Bee",
  description: "Practice quizzes curated from your selected subjects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default Quiz;
