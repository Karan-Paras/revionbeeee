import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchClient = vi.hoisted(() => vi.fn());

vi.mock("@/lib/fetch-client", () => ({ fetchClient }));

const { getTeacherEarnings } = await import("./get-earnings");

const SUMMARY = {
  availablePayout: 0,
  pendingClearing: 220.18999999999999772626324556767940521240234375,
  totalEarning: 220.18999999999999772626324556767940521240234375,
};

const PAYMENT = {
  id: 7,
  paidAt: "2026-09-12",
  topic: "Algebra",
  durationMinutes: 90,
  amount: 220.19,
  status: "pending",
  student: { firstName: "Ava", lastName: "Stone", email: "ava@test.io" },
};

function ok(data: unknown, extra: Record<string, unknown> = {}) {
  return { status: 200, message: "ok", data, ...extra } as never;
}

describe("getTeacherEarnings summary parsing", () => {
  beforeEach(() => fetchClient.mockReset());

  it("reads the summary when nested under data.summary", async () => {
    fetchClient.mockResolvedValue(
      ok({ summary: SUMMARY, payments: [PAYMENT] })
    );

    const { stats, payments } = await getTeacherEarnings();

    expect(stats).toEqual({
      availablePayout: 0,
      pendingClearing: 220.19,
      totalEarnings: 220.19,
    });
    expect(payments).toHaveLength(1);
    expect(payments[0]).toMatchObject({
      client: "Ava Stone",
      topic: "Algebra",
      sessionTime: "1h 30m",
      amount: "$220.19",
      status: "Lead",
    });
  });

  it("reads the summary when it sits beside data", async () => {
    fetchClient.mockResolvedValue(ok([PAYMENT], { summary: SUMMARY }));

    const { stats, payments } = await getTeacherEarnings();

    expect(stats.totalEarnings).toBe(220.19);
    expect(stats.pendingClearing).toBe(220.19);
    expect(payments).toHaveLength(1);
  });

  it("reads the summary when double wrapped", async () => {
    fetchClient.mockResolvedValue(ok({ data: { summary: SUMMARY } }));

    const { stats } = await getTeacherEarnings();

    expect(stats.totalEarnings).toBe(220.19);
  });

  it("falls back to zeroes without throwing on an unknown shape", async () => {
    fetchClient.mockResolvedValue(ok({ unexpected: true }));

    const { stats, payments } = await getTeacherEarnings();

    expect(stats).toEqual({
      availablePayout: 0,
      pendingClearing: 0,
      totalEarnings: 0,
    });
    expect(payments).toEqual([]);
  });
});
