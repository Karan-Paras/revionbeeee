import type { ID, PhPBoolean, Video } from "@/types/globals";

interface Option {
  id: ID;
  questionID: ID;
  answer: string;
  answerVideo: Video;
  isCorrect: PhPBoolean;
}

export interface Quiz {
  id: ID;
  quizID: ID;
  answer: Option[];
  question: string;
  questionVideo: Video;
}
