"use client";

import { bookInstantLesson } from "@/features/lessons/api/book-instant-lesson";
import { bookScheduledLesson } from "@/features/lessons/api/book-scheduled-lesson";
import { getAvailableSlots } from "@/features/lessons/api/get-available-slots";
import {
  getVerifiedTeachers,
  type VerifiedTeacher,
} from "@/features/lessons/api/get-verified-teachers";
import { paths } from "@/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

function detailText(record: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" || typeof value === "number")
      return String(value);
  }
  return "";
}

function formatSlotTime(time?: string | null) {
  if (!time) return "";
  const [hourText, minute = "00"] = time.split(":");
  const hour = Number(hourText);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return time;

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${period}`;
}

function formatSelectedDate(date: string) {
  if (!date) return "Choose Date";

  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function TeacherList() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] =
    useState<VerifiedTeacher | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isInstantBooking, setIsInstantBooking] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    data: teachers = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["verified-teachers"],
    queryFn: getVerifiedTeachers,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    retry: 3,
  });
  const visibleTeachers = useMemo(
    () =>
      teachers.filter(({ name }) =>
        name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query, teachers]
  );

  useEffect(() => {
    setSelectedTeacher((currentTeacher) => {
      if (!currentTeacher) return null;

      return (
        teachers.find(
          (teacher) => String(teacher.id) === String(currentTeacher.id)
        ) ?? currentTeacher
      );
    });
  }, [teachers]);

  useEffect(() => {
    if (!selectedTeacher) return;
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && setSelectedTeacher(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedTeacher]);

  return (
    <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-[#121212] lg:text-[28px]">
            List of all Teachers
          </h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={paths.myLessons()}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#53a2eb] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#398fdc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#348edc]"
            >
              <CalendarDays size={18} aria-hidden="true" />
              My Lessons
            </Link>
            <label className="flex h-11 w-full items-center rounded-lg border border-[#7e7e7e] bg-white px-4 sm:w-[320px]">
              <Search size={18} className="shrink-0 text-[#6f6f6f]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                className="min-w-0 flex-1 bg-transparent px-2.5 text-sm outline-none"
              />
              <SlidersHorizontal size={19} className="text-[#555]" />
            </label>
          </div>
        </div>

        {isPending ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[235px] animate-pulse rounded-2xl bg-[#eef2f5]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-dashed border-red-200 py-16 text-center text-sm text-red-500">
            {error instanceof Error
              ? error.message
              : "Unable to load teachers."}
          </div>
        ) : visibleTeachers.length ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {visibleTeachers.map((teacher) => (
              <article
                key={teacher.id}
                className="rounded-2xl border border-[#dedede] bg-white p-5 shadow-[0_12px_28px_rgba(37,65,92,0.08)]"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full object-cover shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold">
                      {teacher.name}
                    </h3>
                    <p
                      className={`mt-1 flex items-center gap-1.5 text-xs ${teacher.isOnline ? "text-[#19bd57]" : "text-[#8a929a]"}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${teacher.isOnline ? "bg-[#19bd57]" : "bg-[#aeb4ba]"}`}
                      />
                      {teacher.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setIsScheduling(false);
                      setIsInstantBooking(false);
                    }}
                    className="h-10 shrink-0 rounded-md bg-[#53a2eb] px-4 text-xs font-semibold text-white hover:bg-[#398fdc]"
                  >
                    View Details
                  </button>
                </div>
                <p className="mt-5 line-clamp-2 text-[13px] leading-6 text-[#667388]">
                  {teacher.bio ||
                    teacher.professionalTitle ||
                    "No profile description available."}
                </p>
                <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-lg bg-[#f1f6fa] text-xs text-[#68748a]">
                  <div className="border-r border-[#d7e0e8] px-4 py-3">
                    <span className="block">Professional Title:</span>
                    <strong className="mt-1 block leading-4 text-[#202734]">
                      {teacher.professionalTitle || "—"}
                    </strong>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span>Price:</span>
                    <strong className="font-medium text-[#202734]">
                      {teacher.hourlyRate
                        ? `$${teacher.hourlyRate} per min`
                        : "—"}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-16 text-center text-sm text-[#68748a]">
            No teachers found for &ldquo;{query}&rdquo;.
          </div>
        )}
      </div>

      {selectedTeacher && (
        <div className="fixed inset-0 z-[100000] flex justify-end bg-black/55">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedTeacher.name} profile details`}
            className={`relative flex h-dvh w-full flex-col overflow-hidden bg-[#f3f4f6] shadow-2xl ${isInstantBooking ? "max-w-[440px]" : "max-w-[540px]"}`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#d9dce0] bg-white px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={() => {
                  if (isScheduling || isInstantBooking) {
                    setIsScheduling(false);
                    setIsInstantBooking(false);
                  } else {
                    setSelectedTeacher(null);
                  }
                }}
                className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#343b44] hover:bg-[#e9eef3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#53a2eb]"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                aria-label="Close teacher details"
                className="grid h-8 w-8 place-items-center rounded-full bg-white shadow hover:bg-[#e9eef3]"
              >
                <X size={17} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
              {isInstantBooking ? (
                <InstantLesson
                  teacher={selectedTeacher}
                  onSubmit={() => router.push(paths.lessonSuccess())}
                />
              ) : isScheduling ? (
                <ScheduleLesson
                  teacher={selectedTeacher}
                  onSubmit={() => router.push(paths.lessonSuccess())}
                />
              ) : (
                <>
                  <section className="rounded-xl border border-[#d9dce0] bg-white p-4">
                    <div className="flex items-center gap-3 pr-8">
                      <Image
                        src={selectedTeacher.image}
                        alt={selectedTeacher.name}
                        width={54}
                        height={54}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-bold">
                          {selectedTeacher.name}
                        </h2>
                        <p
                          className={`mt-0.5 flex items-center gap-1 text-[11px] ${selectedTeacher.isOnline ? "text-[#19bd57]" : "text-[#8a929a]"}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${selectedTeacher.isOnline ? "bg-[#19bd57]" : "bg-[#aeb4ba]"}`}
                          />
                          {selectedTeacher.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold">
                          {selectedTeacher.hourlyRate
                            ? `$${selectedTeacher.hourlyRate}`
                            : "—"}
                          <span className="text-[10px] font-normal">/min</span>
                        </p>
                        <p className="text-[9px] text-[#929292]">
                          Lesson Price
                        </p>
                      </div>
                    </div>
                    <div
                      className={`mt-4 grid gap-3 border-t border-[#ececec] pt-4 ${selectedTeacher.isOnline ? "grid-cols-2" : "grid-cols-1"}`}
                    >
                      {selectedTeacher.isOnline && (
                        <button
                          type="button"
                          onClick={() => setIsInstantBooking(true)}
                          className="h-11 rounded-lg bg-[#53a2eb] text-sm font-semibold text-white hover:bg-[#398fdc]"
                        >
                          Instant Lesson
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsScheduling(true)}
                        className="h-11 rounded-lg border-2 border-[#53a2eb] text-sm font-semibold text-[#53a2eb] hover:bg-[#f3f9ff]"
                      >
                        Schedule Lesson
                      </button>
                    </div>
                  </section>

                  <section className="mt-5 rounded-xl border border-[#d9dce0] bg-white p-4">
                    <h3 className="text-sm font-bold">About me</h3>
                    <p className="mt-3 text-[10px] leading-[1.55] text-[#898989]">
                      {selectedTeacher.bio ||
                        "No profile description available."}
                    </p>
                    <div className="mt-4 flex gap-2">
                      {selectedTeacher.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded bg-[#e8f4ff] px-2 py-1 text-[10px] font-medium text-[#278bdc]"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </section>

                  {selectedTeacher.qualifications.length > 0 && (
                    <section className="mt-5 rounded-xl border border-[#d9dce0] bg-white p-4">
                      <h3 className="text-sm font-bold">
                        Education &amp; Qualification
                      </h3>
                      <div className="mt-3 space-y-3">
                        {selectedTeacher.qualifications.map((item, index) => (
                          <div
                            key={detailText(item, "id") || index}
                            className="grid grid-cols-[84px_1fr] gap-4 rounded-xl bg-[#f0f4f8] p-3"
                          >
                            <Image
                              src="/images/teacher-certifications.png"
                              alt="Qualification certificate"
                              width={84}
                              height={72}
                              className="h-[72px] w-[84px] rounded-md bg-white object-cover"
                            />
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[9px] text-[#5f6670]">
                              <div>
                                <dt>Institution Name</dt>
                                <dd className="font-bold text-[#111]">
                                  {detailText(
                                    item,
                                    "institutionName",
                                    "institution_name",
                                    "institution"
                                  ) || "—"}
                                </dd>
                              </div>
                              <div>
                                <dt>Graduation Year</dt>
                                <dd className="font-bold text-[#111]">
                                  {detailText(
                                    item,
                                    "graduationYear",
                                    "graduation_year",
                                    "year"
                                  ) || "—"}
                                </dd>
                              </div>
                              <div>
                                <dt>Field of Study</dt>
                                <dd className="font-bold text-[#111]">
                                  {detailText(
                                    item,
                                    "fieldOfStudy",
                                    "field_of_study",
                                    "field"
                                  ) || "—"}
                                </dd>
                              </div>
                              <div>
                                <dt>Degree</dt>
                                <dd className="font-bold text-[#111]">
                                  {detailText(item, "degree") || "—"}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {selectedTeacher.certifications.length > 0 && (
                    <section className="mt-5 rounded-xl border border-[#d9dce0] bg-white p-4">
                      <h3 className="text-sm font-bold">Certifications</h3>
                      {selectedTeacher.certifications.map((item, index) => (
                        <div
                          key={detailText(item, "id") || index}
                          className="mt-3 grid grid-cols-[100px_1fr] gap-4 rounded-xl bg-[#f0f4f8] p-3"
                        >
                          <Image
                            src="/images/teacher-education.png"
                            alt="Professional certification"
                            width={100}
                            height={78}
                            className="h-[78px] w-[100px] rounded-md object-cover"
                          />
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[9px] text-[#5f6670]">
                            <div>
                              <dt>Certification Name</dt>
                              <dd className="font-bold text-[#111]">
                                {detailText(
                                  item,
                                  "certificationName",
                                  "certification_name",
                                  "name"
                                ) || "—"}
                              </dd>
                            </div>
                            <div>
                              <dt>Issuing Authority</dt>
                              <dd className="font-bold text-[#111]">
                                {detailText(
                                  item,
                                  "issuingAuthority",
                                  "issuing_authority",
                                  "authority"
                                ) || "—"}
                              </dd>
                            </div>
                            <div>
                              <dt>Issue Date</dt>
                              <dd className="font-bold text-[#111]">
                                {detailText(item, "issueDate", "issue_date") ||
                                  "—"}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      ))}
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function InstantLesson({
  teacher,
  onSubmit,
}: {
  teacher: VerifiedTeacher;
  onSubmit: () => void;
}) {
  const [selectedDuration, setSelectedDuration] = useState("");
  const ratePerMinute = Number(teacher.hourlyRate.replace(/[^\d.]/g, ""));
  const payableAmount =
    selectedDuration && teacher.hourlyRate && Number.isFinite(ratePerMinute)
      ? Number(selectedDuration) * ratePerMinute
      : null;
  const bookLesson = useMutation({
    mutationFn: () =>
      bookInstantLesson({
        teacherID: teacher.id,
        durationMinutes: Number(selectedDuration),
        paymentMethodId: null,
      }),
    onSuccess: onSubmit,
  });

  return (
    <div className="space-y-5 pt-1">
      <section className="rounded-xl border border-[#d9dce0] bg-white p-4">
        <div className="flex items-center gap-3 pr-8">
          <Image
            src={teacher.image}
            alt={teacher.name}
            width={54}
            height={54}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-bold">{teacher.name}</h2>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#19bd57]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#19bd57]" />
              Online
            </p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold">
              {teacher.hourlyRate ? `$${teacher.hourlyRate}` : "—"}
              <span className="text-[10px] font-normal">/min</span>
            </p>
            <p className="text-[9px] text-[#929292]">Lesson Price</p>
          </div>
        </div>
        <p className="mt-4 border-t border-[#ececec] pt-4 text-[10px] leading-[1.55] text-[#969696]">
          {teacher.bio || "No profile description available."}
        </p>
        <div className="mt-3 flex justify-between rounded bg-[#f2f7fb] px-3 py-2 text-[10px] text-[#718096]">
          <span>Professional Title:</span>
          <strong className="text-[#343b44]">
            {teacher.professionalTitle || "—"}
          </strong>
        </div>
      </section>

      <FormSection title="Set your time limit">
        <label className="flex h-12 items-center rounded-lg border border-[#d5dce4] px-3 text-[#9a9a9a]">
          <Clock3 size={17} className="mr-3" />
          <select
            aria-label="Choose lesson duration"
            value={selectedDuration}
            onChange={(event) => setSelectedDuration(event.target.value)}
            className={`h-full min-w-0 flex-1 appearance-none bg-transparent text-xs outline-none ${selectedDuration ? "font-medium text-[#283544]" : "text-[#9a9a9a]"}`}
          >
            <option value="" disabled>
              Choose your time range
            </option>
            <option value="20">20 minutes</option>
            <option value="40">40 minutes</option>
            <option value="60">60 minutes</option>
          </select>
          <ChevronDown size={16} />
        </label>
      </FormSection>

      <FormSection title="Payable Amount">
        <div className="flex h-12 items-center rounded-lg border border-[#53a2eb] bg-[#f1f8ff] px-3 text-xs">
          <CircleDollarSign size={19} className="mr-3 text-[#53a2eb]" />
          <strong>
            {payableAmount === null ? "—" : `$${payableAmount.toFixed(2)}`}
          </strong>
        </div>
      </FormSection>

      <button
        type="button"
        disabled={!selectedDuration || bookLesson.isPending}
        onClick={() => bookLesson.mutate()}
        className="h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white hover:bg-[#398fdc] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {bookLesson.isPending ? "Booking..." : "Continue"}
      </button>
      {bookLesson.error && (
        <p className="text-center text-xs text-red-500">
          {bookLesson.error instanceof Error
            ? bookLesson.error.message
            : "Unable to book the lesson."}
        </p>
      )}
    </div>
  );
}

function ScheduleLesson({
  teacher,
  onSubmit,
}: {
  teacher: VerifiedTeacher;
  onSubmit: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const ratePerMinute = Number(teacher.hourlyRate.replace(/[^\d.]/g, ""));
  const payableAmount =
    selectedDuration && teacher.hourlyRate && Number.isFinite(ratePerMinute)
      ? Number(selectedDuration) * ratePerMinute
      : null;
  const bookLesson = useMutation({
    mutationFn: () =>
      bookScheduledLesson({
        teacherID: teacher.id,
        scheduledDate: selectedDate,
        scheduledStartTime: selectedSlot,
        durationMinutes: Number(selectedDuration),
        paymentMethodId: null,
      }),
    onSuccess: onSubmit,
  });
  const {
    data: slots = [],
    isFetching: areSlotsLoading,
    error: slotsError,
  } = useQuery({
    queryKey: [
      "available-lesson-slots",
      teacher.id,
      selectedDate,
      selectedDuration,
    ],
    queryFn: () =>
      getAvailableSlots(teacher.id, selectedDate, Number(selectedDuration)),
    enabled: Boolean(selectedDate) && Boolean(selectedDuration),
  });

  useEffect(() => {
    setSelectedSlot("");
  }, [selectedDate, selectedDuration]);

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-[#d9dce0] bg-white p-4">
        <div className="flex items-center gap-3 pr-8">
          <Image
            src={teacher.image}
            alt={teacher.name}
            width={54}
            height={54}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-bold">{teacher.name}</h2>
            <p
              className={`mt-0.5 flex items-center gap-1 text-[11px] ${teacher.isOnline ? "text-[#19bd57]" : "text-[#8a929a]"}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${teacher.isOnline ? "bg-[#19bd57]" : "bg-[#aeb4ba]"}`}
              />
              {teacher.isOnline ? "Online" : "Offline"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold">
              {teacher.hourlyRate ? `$${teacher.hourlyRate}` : "—"}
              <span className="text-[10px] font-normal">/min</span>
            </p>
            <p className="text-[9px] text-[#929292]">Lesson Price</p>
          </div>
        </div>
        <p className="mt-4 border-t border-[#ececec] pt-4 text-[10px] leading-[1.55] text-[#969696]">
          {teacher.bio || "No profile description available."}
        </p>
        <div className="mt-3 flex justify-between rounded bg-[#f2f7fb] px-3 py-2 text-[10px] text-[#718096]">
          <span>Professional Title:</span>
          <strong className="text-[#343b44]">
            {teacher.professionalTitle || "—"}
          </strong>
        </div>
      </section>

      <FormSection title="Set Date">
        <div
          role="button"
          tabIndex={0}
          onClick={() => dateInputRef.current?.showPicker()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              dateInputRef.current?.showPicker();
            }
          }}
          className={`relative flex h-12 cursor-pointer items-center rounded-lg border px-3 transition-colors hover:border-[#53a2eb] hover:bg-[#f8fbff] ${selectedDate ? "border-[#53a2eb] bg-[#f8fbff] text-[#283544]" : "border-[#d5dce4] text-[#9a9a9a]"}`}
        >
          <span className="mr-3 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eaf5ff] text-[#53a2eb]">
            <CalendarDays size={16} />
          </span>
          <input
            ref={dateInputRef}
            type="date"
            aria-label="Choose lesson date"
            value={selectedDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(event) => setSelectedDate(event.target.value)}
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          />
          <span className="pointer-events-none text-xs font-medium">
            {formatSelectedDate(selectedDate)}
          </span>
          <ChevronDown
            size={16}
            className="pointer-events-none ml-auto text-[#8a96a3]"
          />
        </div>
      </FormSection>

      <FormSection title="Set your time limit">
        <label className="flex h-12 items-center rounded-lg border border-[#d5dce4] px-3 text-[#9a9a9a]">
          <Clock3 size={17} className="mr-3" />
          <select
            aria-label="Choose lesson duration"
            value={selectedDuration}
            onChange={(event) => setSelectedDuration(event.target.value)}
            className={`h-full min-w-0 flex-1 appearance-none bg-transparent text-xs outline-none ${selectedDuration ? "font-medium text-[#283544]" : "text-[#9a9a9a]"}`}
          >
            <option value="" disabled>
              Choose your time range
            </option>
            <option value="20">20 minutes</option>
            <option value="40">40 minutes</option>
            <option value="60">60 minutes</option>
          </select>
          <ChevronDown size={16} />
        </label>
      </FormSection>
      <FormSection title="Choose Slot">
        {!selectedDate || !selectedDuration ? (
          <p className="py-3 text-center text-xs text-[#9a9a9a]">
            {!selectedDate
              ? "Please choose a date first."
              : "Please choose a duration to view available slots."}
          </p>
        ) : areSlotsLoading ? (
          <p className="py-3 text-center text-xs text-[#9a9a9a]">
            Loading available slots...
          </p>
        ) : slotsError ? (
          <p className="py-3 text-center text-xs text-red-500">
            {slotsError instanceof Error
              ? slotsError.message
              : "Unable to load available slots."}
          </p>
        ) : slots.length ? (
          <div className="grid grid-cols-2 gap-2">
            {slots.map((slot) => {
              if (!slot.time) return null;
              const slotValue = slot.time;
              return (
                <button
                  key={slotValue}
                  type="button"
                  disabled={slot.isBooked}
                  onClick={() => setSelectedSlot(slotValue)}
                  className={`flex h-11 items-center justify-center gap-2 rounded-lg border text-[11px] ${slot.isBooked ? "cursor-not-allowed border-[#e3e6e8] bg-[#f4f5f6] text-[#b5bac0] line-through" : selectedSlot === slotValue ? "border-[#53a2eb] bg-[#eef7ff] font-semibold text-[#3598ed]" : "border-[#d5dce4] text-[#9a9a9a] hover:border-[#53a2eb] hover:text-[#3598ed]"}`}
                >
                  <Clock3 size={16} />
                  <span>{formatSlotTime(slot.time)}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="py-3 text-center text-xs text-[#9a9a9a]">
            No slots are available for this date.
          </p>
        )}
      </FormSection>

      <FormSection title="Payable Amount">
        <div className="flex h-12 items-center rounded-lg border border-[#53a2eb] bg-[#f1f8ff] px-3 text-xs">
          <CircleDollarSign size={19} className="mr-3 text-[#53a2eb]" />
          <strong className="mr-auto">
            {payableAmount === null ? "—" : `$${payableAmount.toFixed(2)}`}
          </strong>
        </div>
      </FormSection>

      <button
        type="button"
        disabled={
          !selectedDate ||
          !selectedSlot ||
          !selectedDuration ||
          bookLesson.isPending
        }
        onClick={() => bookLesson.mutate()}
        className="h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white hover:bg-[#398fdc] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {bookLesson.isPending ? "Booking..." : "Confirm"}
      </button>
      {bookLesson.error && (
        <p className="text-center text-xs text-red-500">
          {bookLesson.error instanceof Error
            ? bookLesson.error.message
            : "Unable to schedule the lesson."}
        </p>
      )}
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#d9dce0] bg-white p-4">
      <h3 className="mb-3 text-xs font-bold">{title}</h3>
      {children}
    </section>
  );
}
