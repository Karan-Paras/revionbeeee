"use client";

import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Landmark,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const teachers = [
  { name: "Wade Warren", image: "/images/yara.png" },
  { name: "Marvin McKinney", image: "/images/jisso.png" },
  { name: "Kristin Watson", image: "/images/camille.png" },
  { name: "Jerome Bell", image: "/images/profile_jordan.png" },
  { name: "Darlene Robertson", image: "/images/pro_img.jpg" },
  { name: "Bessie Cooper", image: "/images/yara.png" },
  { name: "Guy Hawkins", image: "/images/jisso.png" },
  { name: "Kathryn Murphy", image: "/images/camille.png" },
  { name: "Leslie Alexander", image: "/images/profile_jordan.png" },
];

export function TeacherList() {
  const [query, setQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<
    (typeof teachers)[number] | null
  >(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const visibleTeachers = useMemo(
    () =>
      teachers.filter(({ name }) =>
        name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

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
    <section className="bg-white px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-[#121212]">
            List of all Teachers
          </h2>
          <label className="flex h-9 w-full items-center rounded-lg border border-[#7e7e7e] bg-white px-3 sm:w-[285px]">
            <Search size={16} className="shrink-0 text-[#6f6f6f]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none"
            />
            <SlidersHorizontal size={17} className="text-[#555]" />
          </label>
        </div>

        {visibleTeachers.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleTeachers.map((teacher) => (
              <article
                key={teacher.name}
                className="rounded-xl border border-[#dedede] bg-white p-4 shadow-[0_12px_28px_rgba(37,65,92,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold">
                      {teacher.name}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#19bd57]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#19bd57]" />
                      Online
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setIsScheduling(false);
                    }}
                    className="h-8 shrink-0 rounded bg-[#53a2eb] px-4 text-[10px] font-semibold text-white hover:bg-[#398fdc]"
                  >
                    View Details
                  </button>
                </div>
                <p className="mt-4 line-clamp-2 text-[11px] leading-5 text-[#77808f]">
                  We are seeking an experienced Instructional Designer to create
                  engaging and accessible learning materials for health and
                  education.
                </p>
                <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-md bg-[#f1f6fa] text-[11px] text-[#68748a]">
                  <div className="border-r border-[#d7e0e8] px-3 py-2">
                    Subject:{" "}
                    <strong className="ml-2 text-[#202734]">Physics</strong>
                  </div>
                  <div className="flex justify-between px-3 py-2">
                    <span>Price:</span>
                    <strong className="font-medium text-[#202734]">
                      $10 per hour
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

      {isSubmitted && (
        <div
          className="fixed inset-0 z-[100001] grid place-items-center bg-[#f8faf9] bg-cover bg-center p-5"
          style={{ backgroundImage: "url('/images/math_units.png')" }}
        >
          <section className="w-full max-w-[600px] rounded-2xl bg-white px-6 py-8 text-center shadow-[0_15px_45px_rgba(68,86,94,0.12)] sm:px-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#83d4bd] text-white">
              <Check size={34} strokeWidth={2.5} />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#101010]">
              Request Submitted
            </h2>
            <p className="mt-3 text-sm text-[#727272]">
              Your lesson request has been submitted successfully.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setIsScheduling(false);
                setSelectedTeacher(null);
              }}
              className="mt-6 h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-md hover:bg-[#398fdc]"
            >
              Continue
            </button>
          </section>
        </div>
      )}

      {selectedTeacher && !isSubmitted && (
        <div
          onMouseDown={(event) =>
            event.target === event.currentTarget && setSelectedTeacher(null)
          }
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/55 p-3 sm:p-6"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedTeacher.name} profile details`}
            className="relative max-h-[94dvh] w-full max-w-[540px] overflow-y-auto rounded-xl bg-[#f3f4f6] p-4 shadow-2xl sm:p-5"
          >
            <button
              type="button"
              onClick={() => setSelectedTeacher(null)}
              aria-label="Close teacher details"
              className="absolute top-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white shadow hover:bg-[#e9eef3]"
            >
              <X size={17} />
            </button>

            {isScheduling ? (
              <ScheduleLesson
                teacher={selectedTeacher}
                onSubmit={() => setIsSubmitted(true)}
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
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#19bd57]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#19bd57]" />
                        Online
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold">
                        $10
                        <span className="text-[10px] font-normal">/hour</span>
                      </p>
                      <p className="text-[9px] text-[#929292]">Lesson Price</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#ececec] pt-4">
                    <button className="h-11 rounded-lg bg-[#53a2eb] text-sm font-semibold text-white hover:bg-[#398fdc]">
                      Instant Lesson
                    </button>
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
                    Lorem ipsum dolor sit amet consectetur. Amet egestas arcu
                    consectetur augue neque aenean ut eget arcu. Mauris
                    vestibulum sem velit quisque nunc. Elementum est scelerisque
                    aliquam diam. Vitae consectetur nibh nulla est facilisis
                    massa ultrices.
                  </p>
                  <div className="mt-4 flex gap-2">
                    {["Physics", "Math"].map((subject) => (
                      <span
                        key={subject}
                        className="rounded bg-[#e8f4ff] px-2 py-1 text-[10px] font-medium text-[#278bdc]"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="mt-5 rounded-xl border border-[#d9dce0] bg-white p-4">
                  <h3 className="text-sm font-bold">
                    Education &amp; Qualification
                  </h3>
                  <div className="mt-3 space-y-3">
                    {[0, 1].map((item) => (
                      <div
                        key={item}
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
                              BA Mechanical Engineering
                            </dd>
                          </div>
                          <div>
                            <dt>Graduation Year</dt>
                            <dd className="font-bold text-[#111]">2012</dd>
                          </div>
                          <div>
                            <dt>Field of Study</dt>
                            <dd className="font-bold text-[#111]">Civil</dd>
                          </div>
                          <div>
                            <dt>Degree</dt>
                            <dd className="font-bold text-[#111]">B.Tech</dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-5 rounded-xl border border-[#d9dce0] bg-white p-4">
                  <h3 className="text-sm font-bold">Certifications</h3>
                  <div className="mt-3 grid grid-cols-[100px_1fr] gap-4 rounded-xl bg-[#f0f4f8] p-3">
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
                          Engineer Of The Year
                        </dd>
                      </div>
                      <div>
                        <dt>Issuing Authority</dt>
                        <dd className="font-bold text-[#111]">Company Name</dd>
                      </div>
                      <div>
                        <dt>Issue Date</dt>
                        <dd className="font-bold text-[#111]">20 Nov 2012</dd>
                      </div>
                    </dl>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ScheduleLesson({
  teacher,
  onSubmit,
}: {
  teacher: (typeof teachers)[number];
  onSubmit: () => void;
}) {
  const slots = [
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
  ];
  const [selectedSlot, setSelectedSlot] = useState(slots[1]);

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
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#19bd57]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#19bd57]" />
              Online
            </p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold">
              $10<span className="text-[10px] font-normal">/hour</span>
            </p>
            <p className="text-[9px] text-[#929292]">Lesson Price</p>
          </div>
        </div>
        <p className="mt-4 border-t border-[#ececec] pt-4 text-[10px] leading-[1.55] text-[#969696]">
          Lorem ipsum dolor sit amet consectetur. Amet egestas arcu consectetur
          augue neque aenean ut eget arcu. Mauris vestibulum sem velit quisque
          nunc. Elementum est scelerisque aliquam diam.
        </p>
        <div className="mt-3 flex justify-between rounded bg-[#f2f7fb] px-3 py-2 text-[10px] text-[#718096]">
          <span>Subject:</span>
          <strong className="text-[#343b44]">Physics, Math</strong>
        </div>
      </section>

      <FormSection title="Set Date">
        <label className="relative flex h-12 items-center rounded-lg border border-[#d5dce4] px-3 text-[#9a9a9a]">
          <CalendarDays size={17} className="mr-3" />
          <input
            type="date"
            aria-label="Choose lesson date"
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <span className="text-xs">Choose Date</span>
          <ChevronDown size={16} className="ml-auto" />
        </label>
      </FormSection>

      <FormSection title="Choose Slot">
        <div className="grid grid-cols-2 gap-2">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`flex h-11 items-center justify-center gap-2 rounded-lg border text-[11px] ${selectedSlot === slot ? "border-[#53a2eb] bg-[#eef7ff] font-semibold text-[#3598ed]" : "border-[#d5dce4] text-[#9a9a9a]"}`}
            >
              <Clock3 size={16} />
              <span>{slot.replace(" - ", "  -  ")}</span>
            </button>
          ))}
        </div>
      </FormSection>

      <FormSection title="Set your time limit">
        <label className="flex h-12 items-center rounded-lg border border-[#d5dce4] px-3 text-[#9a9a9a]">
          <Clock3 size={17} className="mr-3" />
          <select
            aria-label="Choose lesson duration"
            defaultValue=""
            className="h-full min-w-0 flex-1 appearance-none bg-transparent text-xs outline-none"
          >
            <option value="" disabled>
              Choose your time range
            </option>
            <option>1 hour</option>
            <option>2 hours</option>
            <option>3 hours</option>
          </select>
          <ChevronDown size={16} />
        </label>
      </FormSection>

      <FormSection title="Payable Amount">
        <div className="flex h-12 items-center rounded-lg border border-[#53a2eb] bg-[#f1f8ff] px-3 text-xs">
          <CircleDollarSign size={19} className="mr-3 text-[#53a2eb]" />
          <strong>$120</strong>
          <Landmark
            size={20}
            className="ml-auto rounded bg-[#53a2eb] p-1 text-white"
          />
          <span className="ml-2 text-[10px]">••• 456</span>
          <ChevronDown size={15} className="ml-2" />
        </div>
      </FormSection>

      <button
        type="button"
        onClick={onSubmit}
        className="h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white hover:bg-[#398fdc]"
      >
        Confirm &amp; Pay
      </button>
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
