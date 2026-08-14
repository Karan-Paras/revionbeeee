"use client";

import { useCertificationStore } from "@/features/teacher/stores/use-certification-store";
import { paths } from "@/routes";
import { Award, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TeacherCertifications() {
  const certifications = useCertificationStore((state) => state.certifications);
  const removeCertification = useCertificationStore(
    (state) => state.removeCertification
  );

  function handleRemove(id: string, certificateUrl?: string) {
    if (certificateUrl) URL.revokeObjectURL(certificateUrl);
    removeCertification(id);
  }

  return (
    <main className="h-dvh overflow-hidden bg-[#444] p-1.5">
      <div className="grid h-full w-full overflow-hidden rounded-xl bg-[#f4f4f4] lg:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-hidden px-6 py-5 sm:px-12">
          <div className="w-full max-w-[470px]">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                Certifications
              </h1>
              <p className="mt-2 text-xs text-[#555] sm:text-sm">
                Add your certifications to highlight your professional
                expertise.
              </p>
            </div>

            <div className="mt-7 flex gap-1.5" aria-label="Step 3 of 6">
              {Array.from({ length: 3 }).map((_, index) => (
                <span
                  key={`complete-${index}`}
                  className="h-1.5 w-12 rounded-full bg-[#fbbe1b]"
                />
              ))}
              {Array.from({ length: 3 }).map((_, index) => (
                <span
                  key={`remaining-${index}`}
                  className="h-1.5 w-12 rounded-full bg-[#d1d1d1]"
                />
              ))}
            </div>

            {certifications.length === 0 ? (
              <div className="mt-16 text-center sm:mt-20">
                <Image
                  src="/images/teacher-certifications.png"
                  alt="Professional certificate, diploma, and briefcase"
                  width={250}
                  height={160}
                  className="mx-auto h-[150px] w-[235px] object-contain mix-blend-multiply"
                />
                <h2 className="mt-2 text-base font-bold text-[#111]">
                  Add your certifications
                </h2>
                <p className="mt-1 text-xs text-[#666]">
                  Add your academic certifications
                </p>
              </div>
            ) : (
              <div className="mt-8 max-h-[300px] space-y-3 overflow-y-auto pr-2">
                {certifications.map((certification) => (
                  <article
                    key={certification.id}
                    className="relative flex min-w-0 gap-3 rounded-xl bg-white p-3 pr-9 shadow-sm"
                  >
                    <div className="relative grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#f5f5f5]">
                      {certification.certificateUrl &&
                      certification.certificateType?.startsWith("image/") ? (
                        <Image
                          src={certification.certificateUrl}
                          alt={certification.certificateName ?? "Certificate"}
                          fill
                          unoptimized
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <Award size={28} className="text-[#53a2eb]" />
                      )}
                    </div>
                    <dl className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,auto)] gap-x-3 gap-y-1 text-[10px]">
                      <dt className="text-[#666]">Certification Name</dt>
                      <dd className="max-w-36 truncate text-right font-semibold text-[#111]">
                        {certification.certificationName}
                      </dd>
                      <dt className="text-[#666]">Issuing Authority</dt>
                      <dd className="max-w-36 truncate text-right font-semibold text-[#111]">
                        {certification.issuingAuthority}
                      </dd>
                      <dt className="text-[#666]">Issue Date</dt>
                      <dd className="max-w-36 truncate text-right font-semibold text-[#111]">
                        {new Date(
                          `${certification.issueDate}T00:00:00`
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </dd>
                    </dl>
                    <button
                      type="button"
                      aria-label="Remove certification"
                      onClick={() =>
                        handleRemove(
                          certification.id,
                          certification.certificateUrl
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
              href={paths.teacherAddCertification()}
              className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-dashed border-[#bdbdbd] bg-white text-sm text-[#777] transition hover:border-[#53a2eb] hover:text-[#53a2eb]"
            >
              <Plus size={17} strokeWidth={1.5} />
              Add
            </Link>

            <div className="mt-12 space-y-3">
              <Link
                href={paths.teacherAvailability()}
                className="grid h-12 w-full place-items-center rounded-lg border border-[#53a2eb] bg-white text-sm font-medium text-[#53a2eb] transition hover:bg-[#53a2eb]/5"
              >
                Skip
              </Link>
              <Link
                href={paths.teacherAvailability()}
                aria-disabled={certifications.length === 0}
                className={`grid h-12 w-full place-items-center rounded-lg text-sm font-medium transition ${certifications.length === 0 ? "pointer-events-none bg-[#d2d2d2] text-[#777]" : "bg-[#53a2eb] text-white hover:bg-[#4395df]"}`}
              >
                Save &amp; Next
              </Link>
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
