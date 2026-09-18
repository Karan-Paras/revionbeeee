"use client";

import { BackLink } from "@/components/common/back-link";
import { addTeacherCertification as submitTeacherCertification } from "@/features/teacher/actions/add-certification";
import { AddTeacherCertificationSchema } from "@/features/teacher/schemas";
import { useCertificationStore } from "@/features/teacher/stores/use-certification-store";
import { paths } from "@/routes";
import { Award, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const inputClassName =
  "mt-1.5 h-12 w-full rounded-lg border border-[#d7dce4] bg-white px-4 text-sm text-[#333] outline-none transition placeholder:text-[#999] focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10";

export default function TeacherCertifications() {
  const router = useRouter();
  const certifications = useCertificationStore((state) => state.certifications);
  const removeCertification = useCertificationStore(
    (state) => state.removeCertification
  );
  const addCertification = useCertificationStore(
    (state) => state.addCertification
  );

  const [showForm, setShowForm] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});
  const [certificate, setCertificate] = useState<{
    name: string;
    type: string;
    url: string;
  }>();

  function handleRemove(id: string) {
    removeCertification(id);
  }

  function validateField(
    field: keyof typeof AddTeacherCertificationSchema.shape,
    value: unknown
  ) {
    const result = AddTeacherCertificationSchema.shape[field].safeParse(value);
    setFieldErrors((current) => ({
      ...current,
      [field]: result.success
        ? undefined
        : result.error.issues.map((issue) => issue.message),
    }));
  }

  function resetForm() {
    setFieldErrors({});
    setSubmitError("");
    setCertificate(undefined);
    setShowForm(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmitError("");
    setFieldErrors({});

    startTransition(async () => {
      const result = await submitTeacherCertification(formData);

      if (!result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        setSubmitError(result.error ?? "");
        return;
      }

      addCertification({
        id: crypto.randomUUID(),
        certificationName: String(formData.get("certificationName")),
        issuingAuthority: String(formData.get("issuingAuthority")),
        issueDate: String(formData.get("issueDate")),
        certificateName: certificate?.name,
        certificateType: certificate?.type,
        certificateUrl: certificate?.url,
      });

      resetForm();
    });
  }

  return (
    <main className="h-dvh w-full overflow-hidden bg-[#f4f4f4]">
      <div className="grid h-full w-full overflow-hidden bg-[#f4f4f4] lg:grid-cols-2">
        <section className="flex h-full flex-col overflow-y-auto px-6 py-8 sm:px-12">
          <div className="mx-auto w-full max-w-[470px]">
            <div>
              <BackLink href={paths.teacherEducation()} className="mb-4" />
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

            {/* Certifications list */}
            {certifications.length > 0 && (
              <div className="mt-6 max-h-[min(260px,30vh)] space-y-3 overflow-x-hidden overflow-y-auto pr-2">
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
                      onClick={() => handleRemove(certification.id)}
                      className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-[#ff3547] text-white"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </article>
                ))}
              </div>
            )}

            {/* Inline add-certification form */}
            {showForm && (
              <div className="mt-5 rounded-2xl border border-[#e5e8ed] bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-[#111]">
                    Add Certification
                  </h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <label className="block text-xs font-medium text-[#222]">
                    Certification Name
                    <input
                      name="certificationName"
                      type="text"
                      placeholder="Enter Certification Name"
                      onChange={(e) =>
                        validateField("certificationName", e.target.value)
                      }
                      className={inputClassName}
                    />
                    {fieldErrors.certificationName?.[0] && (
                      <span className="mt-1 block text-[11px] text-red-600">
                        {fieldErrors.certificationName[0]}
                      </span>
                    )}
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    Issuing Authority
                    <input
                      name="issuingAuthority"
                      type="text"
                      placeholder="Enter issuing authority"
                      onChange={(e) =>
                        validateField("issuingAuthority", e.target.value)
                      }
                      className={inputClassName}
                    />
                    {fieldErrors.issuingAuthority?.[0] && (
                      <span className="mt-1 block text-[11px] text-red-600">
                        {fieldErrors.issuingAuthority[0]}
                      </span>
                    )}
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    Issue Date
                    <input
                      name="issueDate"
                      type="date"
                      onChange={(e) =>
                        validateField("issueDate", e.target.value)
                      }
                      className={`${inputClassName} text-[#999]`}
                    />
                    {fieldErrors.issueDate?.[0] && (
                      <span className="mt-1 block text-[11px] text-red-600">
                        {fieldErrors.issueDate[0]}
                      </span>
                    )}
                  </label>

                  <label className="relative flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#c9cdd4] bg-white text-center transition hover:border-[#53a2eb]">
                    <Upload
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#888]"
                    />
                    <span className="mt-2 text-sm font-medium text-[#777]">
                      {certificate?.name ?? "Upload Certificate"}
                    </span>
                    <span className="mt-1 text-[10px] leading-4 text-[#aaa]">
                      PDF, JPG, PNG · Max 10 MB
                    </span>
                    <input
                      type="file"
                      name="certificationFile"
                      accept="application/pdf,image/jpeg,image/png"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        validateField("certificationFile", file);
                        if (
                          ![
                            "application/pdf",
                            "image/jpeg",
                            "image/png",
                          ].includes(file.type)
                        ) {
                          event.target.value = "";
                          setCertificate(undefined);
                          setFieldErrors((errors) => ({
                            ...errors,
                            certificationFile: [
                              "Please upload a PDF, JPG, or PNG document",
                            ],
                          }));
                          return;
                        }
                        setFieldErrors((errors) => ({
                          ...errors,
                          certificationFile: undefined,
                        }));
                        const certReader = new FileReader();
                        certReader.onload = () => {
                          if (typeof certReader.result === "string") {
                            setCertificate({
                              name: file.name,
                              type: file.type,
                              url: certReader.result,
                            });
                          }
                        };
                        certReader.readAsDataURL(file);
                      }}
                    />
                  </label>
                  {fieldErrors.certificationFile?.[0] && (
                    <p className="text-[11px] text-red-600">
                      {fieldErrors.certificationFile[0]}
                    </p>
                  )}

                  {submitError && (
                    <p role="alert" className="text-sm text-red-600">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="h-11 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </form>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="button"
                disabled={certifications.length === 0}
                onClick={() => router.push(paths.teacherAvailability())}
                className="h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-medium text-white transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:bg-[#d2d2d2] disabled:text-[#777]"
              >
                Save &amp; Next
              </button>
            </div>
          </div>
        </section>

        <section className="relative hidden h-full overflow-hidden lg:block">
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
