"use server";

import { getTeacherProfileDetail } from "@/features/teacher/actions/get-profile-detail";

export type TeacherAvailabilityItem = {
  id?: number | string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

function firstValue(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" || typeof value === "number") {
      const text = String(value).trim();
      if (text) return text;
    }
  }
  return "";
}

/* Normalize "09:30", "09:30:00", "09:30 AM", "9:30" to 24-hour "HH:MM". */
function toHourMinute(value: string): string {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match || match.index === undefined) return "";
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (minute > 59 || hour > 23) return "";
  const suffix = value
    .slice(match.index + match[0].length)
    .trim()
    .toUpperCase();
  let normalizedHour = hour;
  if (suffix.startsWith("P")) {
    if (normalizedHour !== 12) normalizedHour += 12;
  } else if (suffix.startsWith("A") && normalizedHour === 12) {
    normalizedHour = 0;
  }
  if (normalizedHour > 23) return "";
  return `${String(normalizedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export async function getTeacherAvailabilities(): Promise<
  | { success: true; data: TeacherAvailabilityItem[] }
  | { success: false; error: string }
> {
  try {
    const result = await getTeacherProfileDetail();
    if (!result.success) {
      return { success: false, error: result.error };
    }

    const rawItems = result.data.availabilities ?? [];
    const data = rawItems.flatMap((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const record = item as Record<string, unknown>;
      const dayOfWeek = Number(
        firstValue(record, ["dayOfWeek", "day_of_week", "day"])
      );
      if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6)
        return [];

      return [
        {
          id: record.id as number | string | undefined,
          dayOfWeek,
          startTime: toHourMinute(
            firstValue(record, [
              "startTime",
              "start_time",
              "fromTime",
              "from_time",
              "timeFrom",
              "time_from",
              "slotStart",
              "slot_start",
              "from",
            ])
          ),
          endTime: toHourMinute(
            firstValue(record, [
              "endTime",
              "end_time",
              "toTime",
              "to_time",
              "timeTo",
              "time_to",
              "slotEnd",
              "slot_end",
              "to",
            ])
          ),
          isAvailable:
            (record.isAvailable ?? record.is_available) !== false &&
            (record.isAvailable ?? record.is_available) !== 0,
        },
      ];
    });
    return { success: true, data };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unable to load availability.",
    };
  }
}
