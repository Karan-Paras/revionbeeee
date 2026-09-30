export const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL!;
export function getUserImageUrl(image: string): string {
  const normalizedImage = image.trim().replace(/\\/g, "/");

  if (/^https?:\/\//i.test(normalizedImage)) return normalizedImage;
  if (normalizedImage.startsWith("/images/")) return normalizedImage;
  if (!MEDIA_URL) return `${MEDIA_URL}/profilePicture/${normalizedImage}`;

  const mediaBaseUrl = MEDIA_URL.replace(/\/+$/, "");
  const mediaUrl = new URL(mediaBaseUrl);

  if (normalizedImage.startsWith("/")) {
    return `${mediaUrl.origin}${normalizedImage}`;
  }

  if (normalizedImage.startsWith("profilePicture/")) {
    return `${mediaBaseUrl}/${normalizedImage}`;
  }

  return `${mediaBaseUrl}/profilePicture/${normalizedImage}`;
}

export function getTeacherImageUrl(image: string): string {
  const normalizedImage = image.trim().replace(/\\/g, "/");

  if (/^https?:\/\//i.test(normalizedImage)) return normalizedImage;
  if (normalizedImage.startsWith("/images/")) return normalizedImage;
  if (!MEDIA_URL) {
    return `${MEDIA_URL}/teacherProfilePicture/${normalizedImage}`;
  }

  const mediaBaseUrl = MEDIA_URL.replace(/\/+$/, "");
  const mediaUrl = new URL(mediaBaseUrl);

  if (normalizedImage.startsWith("/")) {
    return `${mediaUrl.origin}${normalizedImage}`;
  }

  if (normalizedImage.startsWith("teacherProfilePicture/")) {
    return `${mediaBaseUrl}/${normalizedImage}`;
  }

  return `${mediaBaseUrl}/teacherProfilePicture/${normalizedImage}`;
}

export function getTeacherCertificationUrl(image: string): string {
  const normalizedImage = image.trim().replace(/\\/g, "/");

  if (!normalizedImage) return "/images/teacher-certifications.png";
  if (/^https?:\/\//i.test(normalizedImage)) return normalizedImage;
  if (normalizedImage.startsWith("/images/")) return normalizedImage;
  if (!MEDIA_URL) return "/images/teacher-certifications.png";

  const mediaBaseUrl = MEDIA_URL.replace(/\/+$/, "");
  const mediaUrl = new URL(mediaBaseUrl);

  if (normalizedImage.startsWith("/")) {
    return `${mediaUrl.origin}${normalizedImage}`;
  }

  if (normalizedImage.includes("/")) {
    return `${mediaBaseUrl}/${normalizedImage}`;
  }

  return `${mediaBaseUrl}/teacherCertification/${normalizedImage}`;
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
