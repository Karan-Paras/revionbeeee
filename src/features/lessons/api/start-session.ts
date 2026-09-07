import { fetchClient } from "@/lib/fetch-client";
import {
  parseLessonSessionCredentials,
  type LessonSessionCredentials,
} from "./session-credentials";

export type { LessonSessionCredentials } from "./session-credentials";

const startSessionUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/session/start";

type StartSessionData = Omit<LessonSessionCredentials, "lessonID">;

export async function startLessonSession(lessonID: string | number) {
  const response = await fetchClient<StartSessionData>(
    startSessionUrl,
    "POST",
    { lessonID }
  );
  return parseLessonSessionCredentials(response.data, lessonID);
}
