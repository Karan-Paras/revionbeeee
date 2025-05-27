export const MEDIA_URL =
  "https://saurabh.parastechnologies.in/revisionbee/storage/app/public/uploads/revisionbee";

export function getUserImageUrl(image: string) {
  const url = `${MEDIA_URL}/profilePicture/`;
  return `${url}${image}`;
}
