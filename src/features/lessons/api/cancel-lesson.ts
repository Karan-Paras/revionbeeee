import { fetchClient } from "@/lib/fetch-client";

const cancelLessonUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/cancel";

export type CancelLessonParams = {
  lessonID: string | number;
  reason: string;
};

export async function cancelLesson(params: CancelLessonParams) {
  return fetchClient<unknown>(cancelLessonUrl, "POST", params);
}
