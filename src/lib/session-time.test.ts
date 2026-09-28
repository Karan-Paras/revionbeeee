import { describe, expect, it } from "vitest";

import { isSessionWindowOpen } from "./session-time";

const scheduled = {
  sessionDate: "2026-09-12",
  sessionStartTime: "10:00",
  sessionEndTime: "11:00",
  isInstant: false,
};

const at = (iso: string) => Date.parse(iso);

describe("isSessionWindowOpen", () => {
  it("allows entry 30 minutes before the start", () => {
    expect(
      isSessionWindowOpen({ ...scheduled, nowMs: at("2026-09-12T09:30:00Z") })
    ).toBe(true);
  });

  it("blocks entry before the early window", () => {
    expect(
      isSessionWindowOpen({ ...scheduled, nowMs: at("2026-09-12T09:29:00Z") })
    ).toBe(false);
  });

  it("keeps the late window open for two hours", () => {
    expect(
      isSessionWindowOpen({ ...scheduled, nowMs: at("2026-09-12T12:59:00Z") })
    ).toBe(true);
    expect(
      isSessionWindowOpen({ ...scheduled, nowMs: at("2026-09-12T13:01:00Z") })
    ).toBe(false);
  });

  it("honours a custom late window", () => {
    expect(
      isSessionWindowOpen({
        ...scheduled,
        nowMs: at("2026-09-12T13:30:00Z"),
        lateMs: 3 * 60 * 60 * 1000,
      })
    ).toBe(true);
  });

  it("is always open for instant lessons", () => {
    expect(
      isSessionWindowOpen({
        sessionDate: "",
        sessionStartTime: "instant",
        isInstant: true,
        nowMs: at("2026-01-01T00:00:00Z"),
      })
    ).toBe(true);
  });

  it("falls back to durationMinutes when no end time is given", () => {
    const params = {
      sessionDate: "2026-09-12",
      sessionStartTime: "10:00",
      durationMinutes: 45,
      isInstant: false,
    };
    // 10:00 + 45 min = 10:45 end, plus the default 2 hour late window.
    expect(
      isSessionWindowOpen({ ...params, nowMs: at("2026-09-12T11:00:00Z") })
    ).toBe(true);
    expect(
      isSessionWindowOpen({ ...params, nowMs: at("2026-09-12T13:00:00Z") })
    ).toBe(false);
  });

  it("is false when the schedule cannot be parsed", () => {
    expect(
      isSessionWindowOpen({
        sessionDate: "",
        sessionStartTime: "",
        isInstant: false,
        nowMs: at("2026-09-12T10:30:00Z"),
      })
    ).toBe(false);
  });
});
