"use client";

import { useQualificationStore } from "@/features/teacher/stores/use-qualification-store";
import { paths } from "@/routes";
import { GraduationCap, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TeacherEducation() {
  const router = useRouter();
  const qualifications = useQualificationStore((state) => state.qualifications);
  const removeQualification = useQualificationStore(
    (state) => state.removeQualification
  );

  function handleRemoveQualification(id: string, documentUrl?: string) {
    if (documentUrl) URL.revokeObjectURL(documentUrl);
    removeQualification(id);
  }

  return (
    <main className="h-dvh overflow-hidden bg-[#444] p-1.5">
      <div className="grid h-full w-full overflow-hidden rounded-xl bg-[#f4f4f4] lg:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-hidden px-6 py-5 sm:px-12">
          <div className="w-full max-w-[470px]">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                Education &amp; Qualification
              </h1>
              <p className="mt-2 text-xs text-[#555] sm:text-sm">
                Add your academic background, qualifications, and certifications
              </p>
            </div>

            <div className="mt-7 flex gap-1.5" aria-label="Step 2 of 6">
              <span className="h-1.5 w-12 rounded-full bg-[#fbbe1b]" />
              <span className="h-1.5 w-12 rounded-full bg-[#fbbe1b]" />
              {Array.from({ length: 4 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-12 rounded-full bg-[#d1d1d1]"
                />
              ))}
            </div>

            {qualifications.length === 0 ? (
              <div className="mt-16 text-center sm:mt-20">
                <Image
                  src="/images/teacher-education.png"
                  alt="Teacher and students with academic qualification"
                  width={250}
                  height={160}
                  className="mx-auto h-[150px] w-[235px] object-contain mix-blend-multiply"
                />
                <h2 className="mt-2 text-base font-bold text-[#111]">
                  Add your qualifications
                </h2>
                <p className="mt-1 text-xs text-[#666]">
                  Add your academic background &amp; qualifications.
                </p>
              </div>
            ) : (
              <div className="mt-8 max-h-[min(360px,40vh)] space-y-3 overflow-x-hidden overflow-y-auto pr-2">
                {qualifications.map((qualification) => (
                  <article
                    key={qualification.id}
                    className="relative flex min-w-0 gap-3 rounded-xl bg-white p-3 pr-9 shadow-sm"
                  >
                    <div className="relative grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#f0d6d6] bg-[#fff8f8] text-center">
                      {qualification.documentUrl &&
                      qualification.documentType?.startsWith("image/") ? (
                        <Image
                          src={qualification.documentUrl}
                          alt={qualification.documentName ?? "Degree document"}
                          fill
                          unoptimized
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="min-w-0 px-1">
                          <GraduationCap
                            size={25}
                            className="mx-auto text-[#233f75]"
                          />
                          <span className="mt-1 block truncate text-[8px] tracking-wide text-[#b15a5a]">
                            {qualification.documentName ?? "CERTIFICATE"}
                          </span>
                        </div>
                      )}
                    </div>
                    <dl className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,auto)] gap-x-3 gap-y-1 text-[10px]">
                      <dt className="text-[#666]">Institution Name</dt>
                      <dd className="max-w-32 truncate text-right font-semibold text-[#111]">
                        {qualification.institution}
                      </dd>
                      <dt className="text-[#666]">Degree</dt>
                      <dd className="max-w-32 truncate text-right font-semibold text-[#111]">
                        {qualification.degree}
                      </dd>
                      <dt className="text-[#666]">Field of Study</dt>
                      <dd className="max-w-32 truncate text-right font-semibold text-[#111]">
                        {qualification.fieldOfStudy}
                      </dd>
                      <dt className="text-[#666]">Graduation Year</dt>
                      <dd className="max-w-32 truncate text-right font-semibold text-[#111]">
                        {qualification.graduationYear}
                      </dd>
                    </dl>
                    <button
                      type="button"
                      aria-label="Remove qualification"
                      onClick={() =>
                        handleRemoveQualification(
                          qualification.id,
                          qualification.documentUrl
                        )
                      }
                      className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-[#ff3547] text-white"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </article>
                ))}
              </div>
            )}

            <Link
              href={paths.teacherAddQualification()}
              className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-dashed border-[#bdbdbd] bg-white text-sm text-[#777] transition hover:border-[#53a2eb] hover:text-[#53a2eb]"
            >
              <Plus size={17} strokeWidth={1.5} />
              Add
            </Link>

            <div className="mt-10 space-y-3">
              <button
                type="button"
                onClick={() => router.push(paths.teacherCertifications())}
                className="grid h-12 w-full place-items-center rounded-lg border border-[#53a2eb] bg-white text-sm font-medium text-[#53a2eb] transition hover:bg-[#53a2eb]/5"
              >
                Skip
              </button>
              <button
                type="button"
                disabled={qualifications.length === 0}
                onClick={() => router.push(paths.teacherCertifications())}
                className="h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-medium text-white transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:bg-[#d2d2d2] disabled:text-[#777]"
              >
                Save &amp; Next
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
