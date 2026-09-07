import { fetchClient } from "@/lib/fetch-client";
import {
  parseLessonSessionCredentials,
  type LessonSessionCredentials,
} from "./session-credentials";

const joinSessionUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/session/join";

type JoinSessionData = Omit<LessonSessionCredentials, "lessonID">;

export async function joinLessonSession(lessonID: string | number) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetchClient<JoinSessionData>(
      joinSessionUrl,
      "POST",
      { lessonID },
      undefined,
      undefined,
      controller.signal
    );
    return parseLessonSessionCredentials(response.data, lessonID);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Joining the lesson timed out. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
