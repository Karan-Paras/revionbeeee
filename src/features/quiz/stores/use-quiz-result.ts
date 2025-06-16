import type { Result } from "@/features/quiz/types";
import { ID } from "@/types/globals";
import { create } from "zustand";

interface State {
  quizResult: {
    subjectID: ID;
    totalAttempted: number;
    totalQuestions: number;
    progress: number;
    result: Result[];
  };
}

interface Action {
  setQuizResult: (
    subjectID: ID,
    totalAttempted: number,
    totalQuestions: number,
    progress: number,
    result: Result[]
  ) => void;
}

const useQuizResult = create<State & Action>()((set) => ({
  quizResult: {
    subjectID: -1,
    totalAttempted: -1,
    totalQuestions: -1,
    progress: -1,
    result: [],
  },
  setQuizResult: (
    subjectID,
    totalAttempted,
    totalQuestions,
    progress,
    result
  ) =>
    set((state) => ({
      quizResult: {
        ...state.quizResult,
        subjectID,
        totalAttempted,
        totalQuestions,
        progress,
        result: result || state.quizResult.result,
      },
    })),
}));

export { useQuizResult };
