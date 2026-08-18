import { fetchClient } from "@/lib/fetch-client";

const bookScheduledLessonUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/scheduled/book";

type BookScheduledLessonParams = {
  teacherID: string | number;
  scheduledDate: string;
  scheduledStartTime: string;
  durationMinutes: number;
  paymentMethodId: null;
};

export async function bookScheduledLesson(params: BookScheduledLessonParams) {
  return fetchClient<unknown>(bookScheduledLessonUrl, "POST", params);
}
