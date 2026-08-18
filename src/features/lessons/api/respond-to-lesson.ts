import { fetchClient } from "@/lib/fetch-client";

const respondToLessonUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/respond";

export type RespondToLessonParams =
  | {
      lessonID: string | number;
      action: "accept";
    }
  | {
      lessonID: string | number;
      action: "reject";
      rejectionReason: string;
    };

export async function respondToLesson(params: RespondToLessonParams) {
  return fetchClient<unknown>(respondToLessonUrl, "POST", params);
}
