"use client";

import { TimeSelect } from "@/components/ui/time-select";
import { addTeacherAvailability } from "@/features/teacher/actions/add-availability";
import { getTeacherAvailabilities } from "@/features/teacher/actions/get-availabilities";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  /** Per-slot validation error (end ≤ start) */
  error?: string;
};
type DayState = { enabled: boolean; slots: Slot[] };

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const createEmptyState = (): Record<string, DayState> =>
  Object.fromEntries(days.map((day) => [day, { enabled: false, slots: [] }]));

export default function UpdateTeacherAvailabilityPage() {
  const router = useRouter();
  const [availability, setAvailability] =
    useState<Record<string, DayState>>(createEmptyState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, startTransition] = useTransition();

  useEffect(() => {
    getTeacherAvailabilities()
      .then((result) => {
        if (!result) toast.error("Availability returned an empty response.");
        else if (!result.success) toast.error(result.error);
        else {
          const next = createEmptyState();
          result.data.forEach((item, index) => {
            const day = days[item.dayOfWeek];
            if (!day || !item.isAvailable) return;
            next[day].enabled = true;
            next[day].slots.push({
              id: String(item.id ?? `slot-${index}`),
              // API returns "HH:MM:SS" in 24-hour format; take first 5 chars
              startTime: item.startTime.slice(0, 5),
              endTime: item.endTime.slice(0, 5),
            });
          });
          setAvailability(next);
        }
      })
      .catch((error: unknown) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load availability."
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  /** Convert 24-hr "HH:MM" to 12-hr + meridiem for the API. */
  function toApiTime(value: string) {
    const [hourText, minute] = value.split(":");
    const hour = Number(hourText);
    return {
      time: `${String(hour % 12 || 12).padStart(2, "0")}:${minute}`,
      meridiem: (hour >= 12 ? "PM" : "AM") as "AM" | "PM",
    };
  }

  /** Return an error string when end ≤ start, otherwise undefined. */
  function slotError(startTime: string, endTime: string): string | undefined {
    if (!startTime || !endTime) return undefined;
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    if (eh * 60 + em <= sh * 60 + sm)
      return "End time must be after start time";
    return undefined;
  }

  function toggleDay(day: string) {
    setAvailability((current) => {
      const enabled = !current[day].enabled;
      return {
        ...current,
        [day]: {
          enabled,
          slots:
            enabled && !current[day].slots.length
              ? [{ id: crypto.randomUUID(), startTime: "", endTime: "" }]
              : current[day].slots,
        },
      };
    });
  }

  function addSlot(day: string) {
    setAvailability((current) => ({
      ...current,
      [day]: {
        ...current[day],
        slots: [
          ...current[day].slots,
          { id: crypto.randomUUID(), startTime: "", endTime: "" },
        ],
      },
    }));
  }

  function changeSlot(
    day: string,
    id: string,
    field: "startTime" | "endTime",
    value: string
  ) {
    setAvailability((current) => {
      const updatedSlots = current[day].slots.map((slot) => {
        if (slot.id !== id) return slot;
        const next = { ...slot, [field]: value };
        return { ...next, error: slotError(next.startTime, next.endTime) };
      });
      return { ...current, [day]: { ...current[day], slots: updatedSlots } };
    });
  }

  function removeSlot(day: string, id: string) {
    setAvailability((current) => ({
      ...current,
      [day]: {
        ...current[day],
        slots: current[day].slots.filter((slot) => slot.id !== id),
      },
    }));
  }

  function save() {
    const hasAvailableSlot = days.some(
      (day) =>
        availability[day].enabled &&
        availability[day].slots.some((slot) => slot.startTime && slot.endTime)
    );
    if (!hasAvailableSlot)
      return toast.error("Please add at least one available time slot.");

    const hasIncompleteEnabledDay = days.some(
      (day) =>
        availability[day].enabled &&
        (availability[day].slots.length === 0 ||
          availability[day].slots.some(
            (slot) => !slot.startTime || !slot.endTime
          ))
    );
    if (hasIncompleteEnabledDay)
      return toast.error("Enter a start and end time for every checked day.");

    const hasSlotErrors = days.some(
      (day) =>
        availability[day].enabled &&
        availability[day].slots.some((slot) => !!slot.error)
    );
    if (hasSlotErrors)
      return toast.error("Please fix the time errors before saving.");

    const items = days
      .map((day, dayOfWeek) =>
        availability[day].enabled
          ? availability[day].slots
              .filter((slot) => slot.startTime && slot.endTime)
              .map((slot) => {
                const start = toApiTime(slot.startTime);
                const end = toApiTime(slot.endTime);
                return {
                  dayOfWeek,
                  startTime: start.time,
                  startMeridiem: start.meridiem,
                  endTime: end.time,
                  endMeridiem: end.meridiem,
                  isAvailable: 1 as const,
                };
              })
          : [{ dayOfWeek, isAvailable: 0 as const }]
      )
      .flat();

    startTransition(async () => {
      const result = await addTeacherAvailability({ availabilities: items });
      if (!result || !result.success) {
        toast.error(
          result?.error ?? "Availability update returned an empty response."
        );
        return;
      }
      toast.success("Availability updated successfully");
      router.push("/teacher/profile/availability");
      router.refresh();
    });
  }

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1100px]">
        <button
          type="button"
          onClick={() => router.push("/teacher/profile/availability")}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#667085] hover:text-[#53a2eb]"
        >
          <ArrowLeft size={18} /> Back to availability
        </button>
        <section className="mt-5 rounded-[22px] bg-white p-6 shadow-[0_1px_3px_rgba(20,30,40,0.04)] sm:p-8">
          <div className="border-b border-[#edf0f2] pb-5">
            <h1 className="text-xl font-bold text-[#111]">
              Update Availability
            </h1>
            <p className="mt-2 text-sm text-[#777]">
              Choose the days and times when students can book lessons.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-4 py-7 md:grid-cols-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-xl bg-[#f0f2f4]"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 py-7 md:grid-cols-2">
              {days.map((day) => {
                const state = availability[day];
                return (
                  <div
                    key={day}
                    className="rounded-xl border border-[#e1e5e9] bg-[#fafbfc] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={state.enabled}
                          onChange={() => toggleDay(day)}
                          className="h-4 w-4 accent-[#53a2eb]"
                        />
                        {day}
                      </label>
                      {state.enabled ? (
                        <button
                          type="button"
                          onClick={() => addSlot(day)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#53a2eb]"
                        >
                          <Plus size={14} /> Add more
                        </button>
                      ) : (
                        <span className="text-xs text-[#ff3547]">
                          Unavailable
                        </span>
                      )}
                    </div>

                    {state.enabled && (
                      <div className="mt-3 space-y-1">
                        {state.slots.map((slot) => (
                          <div key={slot.id}>
                            <div className="grid grid-cols-[1fr_1fr_28px] gap-2">
                              <TimeSelect
                                value={slot.startTime}
                                ariaLabel={`${day} start time`}
                                onChange={(v) =>
                                  changeSlot(day, slot.id, "startTime", v)
                                }
                              />
                              <TimeSelect
                                value={slot.endTime}
                                ariaLabel={`${day} end time`}
                                error={!!slot.error}
                                onChange={(v) =>
                                  changeSlot(day, slot.id, "endTime", v)
                                }
                              />
                              <button
                                type="button"
                                aria-label={`Remove ${day} slot`}
                                onClick={() => removeSlot(day, slot.id)}
                                className="grid place-items-center text-[#777] hover:text-[#ff3547]"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            {slot.error && (
                              <p
                                role="alert"
                                className="mt-0.5 pl-1 text-xs text-red-500"
                              >
                                {slot.error}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-col justify-end gap-3 border-t border-[#edf0f2] pt-5 sm:flex-row">
            <button
              type="button"
              onClick={() => router.push("/teacher/profile/availability")}
              className="h-12 rounded-lg border border-[#d8dde1] px-10 text-sm font-medium text-[#667085]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={isLoading || isSaving}
              className="h-12 rounded-lg bg-[#53a2eb] px-12 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Updating..." : "Update Availability"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
