"use server";

import { getTeacherProfileDetail } from "@/features/teacher/api/get-profile-detail";

export type TeacherAvailabilityItem = {
  id?: number | string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

function findTeacherAvailabilities(value: unknown): unknown[] | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findTeacherAvailabilities(item);
      if (found) return found;
    }
    return undefined;
  }
  if (!value || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  if (Array.isArray(record.teacher_availabilities)) {
    return record.teacher_availabilities;
  }
  if (Array.isArray(record.teacherAvailabilities)) {
    return record.teacherAvailabilities;
  }

  for (const nestedValue of Object.values(record)) {
    const found = findTeacherAvailabilities(nestedValue);
    if (found) return found;
  }
  return undefined;
}

export async function getTeacherAvailabilities(): Promise<
  | { success: true; data: TeacherAvailabilityItem[] }
  | { success: false; error: string }
> {
  try {
    const response = await getTeacherProfileDetail();
    const rawItems = findTeacherAvailabilities(response.data) ?? [];
    const data = rawItems.flatMap((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const record = item as Record<string, unknown>;
      const dayOfWeek = Number(record.dayOfWeek ?? record.day_of_week);
      if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6)
        return [];

      return [
        {
          id: record.id as number | string | undefined,
          dayOfWeek,
          startTime: String(record.startTime ?? record.start_time ?? ""),
          endTime: String(record.endTime ?? record.end_time ?? ""),
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
