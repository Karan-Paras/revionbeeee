import { Progress } from "@/features/progress/component/progress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Progress - Revision Bee",
  description: "Track your learning progress by subject, topic, and quizzes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default Progress;
