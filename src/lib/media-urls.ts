export const MEDIA_URL =
  "https://saurabh.parastechnologies.in/revisionbee/storage/app/public/uploads/revisionbee";

export function getUserImageUrl(image: string): string {
  const url = `${MEDIA_URL}/profilePicture/`;
  return `${url}${image}`;
}

export function getVideoUrl(video: string): string {
  const url = `${MEDIA_URL}/video/`;
  return `${url}${video}`;
}
