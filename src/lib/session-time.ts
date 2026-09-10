/**
 * Shared UTC date/time utilities used by booking, lesson, and dashboard
 * components to decide whether a session is currently joinable/launchable.
 *
 * All times are treated as UTC — the server stores and returns UTC values.
 */

const MONTH_MAP: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

/**
 * Parse a date string into { year, month, day } treating it as UTC.
 * Handles:
 *   - "2026-09-10"  (ISO)
 *   - "2026-09-10T06:45:00"  (ISO datetime — date part only)
 *   - "10 Sep 2026"  (DD Mon YYYY)
 *   - "Sep 10, 2026" (Mon DD, YYYY)
 */
export function parseUtcDate(
  value: string
): { year: number; month: number; day: number } | null {
  if (!value) return null;
  const s = value.trim();

  // ISO: "2026-09-10" or "2026-09-10T..."
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) return { year: +iso[1], month: +iso[2], day: +iso[3] };

  // "10 Sep 2026" or "10 September 2026"
  const dMon = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (dMon) {
    const m = MONTH_MAP[dMon[2].slice(0, 3).toLowerCase()];
    if (m) return { day: +dMon[1], month: m, year: +dMon[3] };
  }

  // "Sep 10, 2026" or "Sep 10 2026"
  const monD = s.match(/^([A-Za-z]+)\s+(\d{1,2})[,\s]+(\d{4})/);
  if (monD) {
    const m = MONTH_MAP[monD[1].slice(0, 3).toLowerCase()];
    if (m) return { month: m, day: +monD[2], year: +monD[3] };
  }

  // Last resort — avoid JS Date locale pitfalls by using UTC
  const d = new Date(s);
  if (!Number.isNaN(d.getTime()))
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
    };

  return null;
}

/**
 * Parse a time string to minutes since midnight (UTC).
 * Handles:
 *   - "06:45"         (HH:MM, 24-hr)
 *   - "06:45:00"      (HH:MM:SS, 24-hr)
 *   - "6:45 AM/PM"    (12-hr with meridiem)
 *   - "T06:45"        (ISO datetime T-portion)
 *   - "instant"       → returns 0
 */
export function parseUtcTimeMinutes(value: string): number | null {
  if (!value) return null;
  const s = value.trim();

  if (s.toLowerCase() === "instant") return 0;

  // ISO T-part: "T06:45" or "t06:45"
  const isoT = s.match(/[Tt](\d{1,2}):(\d{2})/);
  if (isoT) return +isoT[1] * 60 + +isoT[2];

  // HH:MM[:SS] [AM|PM]
  const m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?/i);
  if (!m) return null;

  let h = +m[1];
  const mer = m[3]?.toLowerCase();
  if (mer === "pm" && h < 12) h += 12;
  if (mer === "am" && h === 12) h = 0;
  return h * 60 + +m[2];
}

/**
 * Returns true if the current time (nowMs, UTC milliseconds) is within the
 * session window:
 *   [ startUtc - earlyMs, endUtc + lateMs ]
 *
 * earlyMs defaults to 30 minutes, lateMs to 2 hours.
 *
 * If date or time cannot be parsed, falls back to true for instant sessions
 * and false for scheduled ones.
 */
export function isSessionWindowOpen(params: {
  sessionDate: string;
  sessionStartTime: string;
  sessionEndTime?: string;
  durationMinutes?: number;
  isInstant: boolean;
  nowMs: number;
  earlyMs?: number;
  lateMs?: number;
}): boolean {
  const {
    isInstant,
    sessionDate,
    sessionStartTime,
    sessionEndTime,
    durationMinutes,
    nowMs,
    earlyMs = 30 * 60 * 1000,
    lateMs = 2 * 60 * 60 * 1000,
  } = params;

  if (isInstant) return true;

  const date = parseUtcDate(sessionDate);
  const startMin = parseUtcTimeMinutes(sessionStartTime);
  if (!date || startMin === null) return false;

  const parsedEnd = sessionEndTime ? parseUtcTimeMinutes(sessionEndTime) : null;
  const endMin = parsedEnd ?? startMin + (durationMinutes || 60);

  const startMs = Date.UTC(
    date.year,
    date.month - 1,
    date.day,
    Math.floor(startMin / 60),
    startMin % 60
  );

  // If end time is on the next day (e.g. 23:00 → 00:30)
  const endDay = date.day + (endMin < startMin ? 1 : 0);
  const endMs = Date.UTC(
    date.year,
    date.month - 1,
    endDay,
    Math.floor(endMin / 60),
    endMin % 60,
    59,
    999
  );

  return nowMs >= startMs - earlyMs && nowMs <= endMs + lateMs;
}
