import { ID } from "@/types/globals";

export interface Subject {
  id: ID;
  topicID: ID;
  subjectName: string;
}

export interface Topic {
  id: ID;
  topicName: string;
  subjects: Array<Subject>;
}
