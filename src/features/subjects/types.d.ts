import { ID } from "@/types/globals";

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
  video: string | null;
  topic: TopicBase;
}

export interface Topic extends TopicBase {
  subjects: Array<SlimSubject>;
}
