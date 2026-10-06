export function getTeacherProfileStatusFromResponse(
  value: unknown
): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const direct =
    record.teacherProfileStatus ??
    record.teacher_profile_status ??
    record.profileStatus ??
    record.profile_status;
  const directStatus = getTeacherProfileStatusFromResponse(direct);
  if (directStatus !== undefined) return directStatus;

  for (const nested of Object.values(record)) {
    const nestedStatus = getTeacherProfileStatusFromResponse(nested);
    if (nestedStatus !== undefined) return nestedStatus;
  }

  return undefined;
}
