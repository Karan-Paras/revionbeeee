import { fetchClient } from "@/lib/fetch-client";

const bookInstantLessonUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/instant/book";

type BookInstantLessonParams = {
  teacherID: string | number;
  durationMinutes: number;
  paymentMethodId: null;
};

export async function bookInstantLesson(params: BookInstantLessonParams) {
  return fetchClient<unknown>(bookInstantLessonUrl, "POST", params);
}
