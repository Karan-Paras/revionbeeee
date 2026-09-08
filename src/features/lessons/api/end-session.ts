import { fetchClient } from "@/lib/fetch-client";

const endSessionUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/session/end";

export type EndLessonSessionParams = {
  lessonID: string | number;
  sessionEndedAt: string;
};

export async function endLessonSession(params: EndLessonSessionParams) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);

  try {
    return await fetchClient<unknown>(
      endSessionUrl,
      "POST",
      params,
      undefined,
      undefined,
      controller.signal
    );
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Reporting the call end timed out.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
