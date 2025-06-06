import { ID } from "@/types/globals";
import { create } from "zustand";

interface state {
  quizResult: {
    subjectID: ID;
    totalAttempted: number;
    totalQuestions: number;
    progress: number;
  };
}

interface action {
  setQuizResult: (
    subjectID: ID,
    totalAttempted: number,
    totalQuestions: number,
    progress: number
  ) => void;
}

const useQuizResult = create<state & action>((set) => ({
  quizResult: {
    subjectID: -1,
    totalAttempted: -1,
    totalQuestions: -1,
    progress: -1,
  },
  setQuizResult: (subjectID, totalAttempted, totalQuestions, progress) =>
    set((state) => ({
      quizResult: {
        ...state.quizResult,
        subjectID,
        totalAttempted,
        totalQuestions,
        progress,
      },
    })),
}));

export { useQuizResult };
