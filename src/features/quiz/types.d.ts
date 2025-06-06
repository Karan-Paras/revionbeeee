import type { PhPBoolean, Video } from "@/types/globals";

interface Option {
  answer: string;
  answerVideo: Video;
  isCorrect: PhPBoolean;
}

export interface Quiz {
  answer: Option[];
  question: string;
  questionVideo: Video;
}
