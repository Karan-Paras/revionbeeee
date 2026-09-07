import { fetchClient } from "@/lib/fetch-client";
import {
  parseLessonSessionCredentials,
  type LessonSessionCredentials,
} from "./session-credentials";

const joinSessionUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/session/join";

type JoinSessionData = Omit<LessonSessionCredentials, "lessonID">;

export async function joinLessonSession(lessonID: string | number) {
  const response = await fetchClient<JoinSessionData>(joinSessionUrl, "POST", {
    lessonID,
  });
  return parseLessonSessionCredentials(response.data, lessonID);
}
