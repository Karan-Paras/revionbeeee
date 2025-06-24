import type { ID, Video } from "@/types/globals";

interface SubjectBase {
  id: ID;
  topicID: ID;
  subjectName: string;
}

interface TopicBase {
  id: ID;
  topicName: string;
}

type SlimSubject = SubjectBase;

export interface Subject extends SubjectBase {
  title: string;
  description: string;
  video: Video;
  topic: TopicBase;
  quizzes?: [
    {
      id: ID;
      topicID: ID;
      subjectID: ID;
      title: string;
      description: string;
    },
  ];
}

export interface Topic extends TopicBase {
  subjects: Array<SlimSubject>;
}

export interface QuestionBank {
  id: ID;
  answer: string;
  answerVideo: Video;
  question: string;
  questionVideo: Video;
  subjectID: ID;
  topicID: ID;
}

export interface Topics {
  id: ID;
  topicName: string;
  status: number;
}

export interface Home {
  totalQuizzes: number;
  topicsCompleted: number;
  overallProgress: string;
}
