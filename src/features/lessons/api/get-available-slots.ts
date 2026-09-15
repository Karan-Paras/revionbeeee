import { fetchClient } from "@/lib/fetch-client";

const availableSlotsUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/scheduled/available-slots";

export type AvailableSlot = {
  time: string;
  isBooked: boolean;
};

export async function getAvailableSlots(
  teacherID: string | number,
  date: string,
  durationMinutes: number
): Promise<AvailableSlot[]> {
  const query = new URLSearchParams({
    teacherID: String(teacherID),
    date,
    durationMinutes: String(durationMinutes),
  });
  const response = await fetchClient<AvailableSlot[]>(
    `${availableSlotsUrl}?${query.toString()}`,
    "GET"
  );

  return Array.isArray(response.data) ? response.data : [];
}
