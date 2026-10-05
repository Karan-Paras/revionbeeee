export type TeacherStatusPayload = {
  teacherId?: string | number;
  teacher_id?: string | number;
  id?: string | number;
  status?: string;
  isOnline?: boolean | number | string;
  is_online?: boolean | number | string;
  onlineStatus?: boolean | number | string;
  online_status?: boolean | number | string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function normalizeTeacherStatus(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (
      normalized === "online" ||
      normalized === "1" ||
      normalized === "true"
    ) {
      return true;
    }
    if (
      normalized === "offline" ||
      normalized === "0" ||
      normalized === "false"
    ) {
      return false;
    }
  }
  return undefined;
}

export function getTeacherStatusId(
  payload: TeacherStatusPayload
): string | undefined {
  const teacherId = payload.teacherId ?? payload.teacher_id ?? payload.id;
  return teacherId === undefined ? undefined : String(teacherId);
}

export function statusFromPayload(
  payload: TeacherStatusPayload
): boolean | undefined {
  return normalizeTeacherStatus(
    payload.status ??
      payload.isOnline ??
      payload.is_online ??
      payload.onlineStatus ??
      payload.online_status
  );
}

export function findTeacherStatusPayload(
  value: unknown,
  teacherId: string
): TeacherStatusPayload | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findTeacherStatusPayload(item, teacherId);
      if (found) return found;
    }
    return null;
  }

  if (!isRecord(value)) return null;

  const directId = value.teacherId ?? value.teacher_id ?? value.id;
  if (directId !== undefined && String(directId) === teacherId) {
    return value;
  }

  for (const key of ["teachers", "teacherList", "data", "list", "items"]) {
    const found = findTeacherStatusPayload(value[key], teacherId);
    if (found) return found;
  }

  return null;
}
