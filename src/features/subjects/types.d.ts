import { ID } from "@/types/globals";

type Video = string | null;

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
