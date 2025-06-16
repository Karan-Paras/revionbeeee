import type { ID, PhPBoolean, Video } from "@/types/globals";

interface OptionType {
  id: ID;
  questionID: ID;
  answer: string;
  answerVideo: Video;
  isCorrect: PhPBoolean;
}

export interface Quiz {
  id: ID;
  quizID: ID;
  answer: OptionType[];
  question: string;
  questionVideo: Video;
  quiz: {
    id: ID;
    title: string;
  };
}

type Option = 0 | 1 | 2 | 3;

export type Result = {
  selectedOption: Option | -1;
  correctOption: Option;
};
