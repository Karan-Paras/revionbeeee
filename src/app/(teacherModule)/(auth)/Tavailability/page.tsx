"use client";

import { addTeacherAvailability } from "@/features/teacher/actions/add-availability";
import { AddTeacherAvailabilitySchema } from "@/features/teacher/schemas";
import { paths } from "@/routes";
import { Clock3, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

type DayAvailability = {
  enabled: boolean;
  slots: TimeSlot[];
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const initialAvailability: Record<string, DayAvailability> = Object.fromEntries(
  days.map((day) => [
    day,
    {
      enabled: false,
      slots: [],
    },
  ])
);

export default function TeacherAvailabilityPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState("");
  const [availability, setAvailability] =
    useState<Record<string, DayAvailability>>(initialAvailability);

  function toTwelveHourTime(time: string) {
    const [hourText, minute] = time.split(":");
    const hour = Number(hourText);

    return {
      time: `${String(hour % 12 || 12).padStart(2, "0")}:${minute}`,
      meridiem: (hour >= 12 ? "PM" : "AM") as "AM" | "PM",
    };
  }

  function handleSave() {
    setSubmitError("");

    const availabilities = days.flatMap((day, dayIndex) => {
      const dayAvailability = availability[day];
      if (!dayAvailability.enabled) return [];

      return dayAvailability.slots
        .filter((slot) => slot.startTime && slot.endTime)
        .map((slot) => {
          const start = toTwelveHourTime(slot.startTime);
          const end = toTwelveHourTime(slot.endTime);

          return {
            dayOfWeek: dayIndex,
            startTime: start.time,
            startMeridiem: start.meridiem,
            endTime: end.time,
            endMeridiem: end.meridiem,
            isAvailable: 1 as const,
          };
        });
    });

    const validation = AddTeacherAvailabilitySchema.safeParse({
      availabilities,
    });

    if (!validation.success) {
      setSubmitError(
        validation.error.issues[0]?.message ??
          "Please check your availability details."
      );
      return;
    }

    startTransition(async () => {
      const result = await addTeacherAvailability(validation.data);

      if (!result.success) {
        setSubmitError(result.error);
        return;
      }

      router.push(paths.teacherBankDetails());
    });
  }

  function toggleDay(day: string) {
    setSubmitError("");
    setAvailability((current) => {
      const enabled = !current[day].enabled;
      return {
        ...current,
        [day]: {
          enabled,
          slots:
            enabled && current[day].slots.length === 0
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

  function removeSlot(day: string, slotId: string) {
    setAvailability((current) => ({
      ...current,
      [day]: {
        ...current[day],
        slots: current[day].slots.filter((slot) => slot.id !== slotId),
      },
    }));
  }

  function updateSlot(
    day: string,
    slotId: string,
    field: "startTime" | "endTime",
    value: string
  ) {
    setSubmitError("");
    setAvailability((current) => ({
      ...current,
      [day]: {
        ...current[day],
        slots: current[day].slots.map((slot) =>
          slot.id === slotId ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  }

  return (
    <main className="h-dvh overflow-hidden bg-[#444] p-1.5">
      <div className="grid h-full w-full overflow-hidden rounded-xl bg-[#f4f4f4] lg:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-hidden px-6 py-5 sm:px-12">
          <div className="flex max-h-full w-full max-w-[470px] flex-col py-2">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                Availability
              </h1>
              <p className="mt-2 text-xs text-[#666] sm:text-sm">
                Choose the days and times when students can book lessons.
              </p>
            </div>

            <div
              className="mt-6 flex justify-center gap-1.5"
              aria-label="Step 4 of 6"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-12 rounded-full bg-[#fbbe1b]"
                />
              ))}
              {Array.from({ length: 2 }).map((_, index) => (
                <span
                  key={`remaining-${index}`}
                  className="h-1.5 w-12 rounded-full bg-[#d1d1d1]"
                />
              ))}
            </div>

            <div className="mt-6 min-h-0 flex-1 space-y-4 overflow-y-auto pr-2">
              {days.map((day) => {
                const dayAvailability = availability[day];

                return (
                  <div key={day}>
                    <div className="flex h-6 items-center justify-between text-xs">
                      <label className="flex cursor-pointer items-center gap-2 font-medium text-[#222]">
                        <input
                          type="checkbox"
                          checked={dayAvailability.enabled}
                          onChange={() => toggleDay(day)}
                          className="h-4 w-4 accent-[#53a2eb]"
                        />
                        {day}
                      </label>

                      {dayAvailability.enabled ? (
                        <button
                          type="button"
                          onClick={() => addSlot(day)}
                          className="inline-flex items-center gap-1 font-medium text-[#53a2eb]"
                        >
                          <Plus size={15} />
                          Add more
                        </button>
                      ) : (
                        <span className="text-[#ff3547]">Unavailable</span>
                      )}
                    </div>

                    {dayAvailability.enabled && (
                      <div className="mt-2 space-y-2">
                        {dayAvailability.slots.map((slot) => (
                          <div
                            key={slot.id}
                            className="grid grid-cols-[1fr_1fr_28px] gap-3"
                          >
                            <label className="relative block">
                              <Clock3
                                size={16}
                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9aa7be]"
                              />
                              <input
                                type="time"
                                aria-label={`${day} start time`}
                                value={slot.startTime}
                                onChange={(event) =>
                                  updateSlot(
                                    day,
                                    slot.id,
                                    "startTime",
                                    event.target.value
                                  )
                                }
                                className="h-11 w-full rounded-lg border border-transparent bg-white pr-2 pl-9 text-xs text-[#777] outline-none focus:border-[#53a2eb]"
                              />
                            </label>
                            <label className="relative block">
                              <Clock3
                                size={16}
                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9aa7be]"
                              />
                              <input
                                type="time"
                                aria-label={`${day} end time`}
                                value={slot.endTime}
                                onChange={(event) =>
                                  updateSlot(
                                    day,
                                    slot.id,
                                    "endTime",
                                    event.target.value
                                  )
                                }
                                className="h-11 w-full rounded-lg border border-transparent bg-white pr-2 pl-9 text-xs text-[#777] outline-none focus:border-[#53a2eb]"
                              />
                            </label>
                            <button
                              type="button"
                              aria-label={`Remove ${day} time slot`}
                              onClick={() => removeSlot(day, slot.id)}
                              className="grid h-11 place-items-center text-[#555] hover:text-[#ff3547]"
                            >
                              <X size={17} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 space-y-3">
              {submitError && (
                <p role="alert" className="text-center text-sm text-red-600">
                  {submitError}
                </p>
              )}
              <Link
                href={paths.teacherBankDetails()}
                className="grid h-12 w-full place-items-center rounded-lg border border-[#53a2eb] bg-white text-sm font-medium text-[#53a2eb] transition hover:bg-[#53a2eb]/5"
              >
                Skip
              </Link>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Saving..." : "Save & Next"}
              </button>
            </div>
          </div>
        </section>

        <section className="relative hidden h-full overflow-hidden rounded-xl border-2 border-white lg:block">
          <Image
            src="/images/teacher-personal-info.svg"
            alt="Teacher presenting a lesson at a whiteboard"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </section>
      </div>
    </main>
  );
}
