export const MEDIA_URL =
  "https://saurabh.parastechnologies.in/revisionbee/storage/app/public/uploads/revisionbee";

export function getUserImageUrl(image: string): string {
  const url = `${MEDIA_URL}/profilePicture/`;
  return `${url}${image}`;
}

export function getSubjectVideoUrl(video: string): string {
  const url = `${MEDIA_URL}/video/`;
  return `${url}${video}`;
}

export function getQuestionBankVideoUrl(video: string): string {
  const url = `${MEDIA_URL}/questionBank/video/`;
  return `${url}${video}`;
}

export function getQuizQuestionVideoUrl(video: string): string {
  const url = `${MEDIA_URL}/quizQuestion/questionVideo/`;
  return `${url}${video}`;
}

export function getQuizAnswerVideoUrl(video: string): string {
  const url = `${MEDIA_URL}/quizQuestion/answerVideo/`;
  return `${url}${video}`;
}
