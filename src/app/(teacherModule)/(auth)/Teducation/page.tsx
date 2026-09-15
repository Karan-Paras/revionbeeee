"use client";

import { BackLink } from "@/components/common/back-link";
import { addTeacherQualification as submitTeacherQualification } from "@/features/teacher/actions/add-qualification";
import { AddTeacherQualificationSchema } from "@/features/teacher/schemas";
import { useQualificationStore } from "@/features/teacher/stores/use-qualification-store";
import { paths } from "@/routes";
import { ChevronDown, GraduationCap, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const selectClassName =
  "h-12 w-full appearance-none rounded-lg border border-[#d7dce4] bg-white px-4 pr-10 text-sm text-[#999] outline-none transition focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10";

export default function TeacherEducation() {
  const router = useRouter();
  const qualifications = useQualificationStore((state) => state.qualifications);
  const removeQualification = useQualificationStore(
    (state) => state.removeQualification
  );
  const addQualification = useQualificationStore(
    (state) => state.addQualification
  );

  const [showForm, setShowForm] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    institutionName?: string[];
    degree?: string[];
    fieldOfStudy?: string[];
    graduationYear?: string[];
    degreeDocument?: string[];
  }>({});
  const [degreeDocument, setDegreeDocument] = useState<{
    name: string;
    type: string;
    url: string;
  }>();

  function handleRemoveQualification(id: string) {
    removeQualification(id);
  }

  function validateField(
    field: keyof typeof AddTeacherQualificationSchema.shape,
    value: unknown
  ) {
    const result = AddTeacherQualificationSchema.shape[field].safeParse(value);
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
    setDegreeDocument(undefined);
    setShowForm(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmitError("");
    setFieldErrors({});

    startTransition(async () => {
      const result = await submitTeacherQualification(formData);

      if (!result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        setSubmitError(result.error ?? "");
        return;
      }

      addQualification({
        id: crypto.randomUUID(),
        institution: result.qualification.institutionName,
        degree: result.qualification.degree,
        fieldOfStudy: result.qualification.fieldOfStudy,
        graduationYear: result.qualification.graduationYear,
        documentName: degreeDocument?.name,
        documentType: degreeDocument?.type,
        documentUrl: degreeDocument?.url,
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
              <BackLink href={paths.teacherPersonalInfo()} className="mb-4" />
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

            {/* Qualifications list */}
            {qualifications.length > 0 && (
              <div className="mt-6 max-h-[min(280px,32vh)] space-y-3 overflow-x-hidden overflow-y-auto pr-2">
                {qualifications.map((qualification) => (
                  <article
                    key={qualification.id}
                    className="relative flex min-w-0 gap-3 rounded-xl bg-white p-3 pr-9 shadow-sm"
                  >
                    <div className="relative grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#f0d6d6] bg-[#fff8f8] text-center">
                      {qualification.documentUrl &&
                      qualification.documentType?.startsWith("image/") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={qualification.documentUrl}
                          alt={qualification.documentName ?? "Degree document"}
                          className="h-full w-full object-contain p-1"
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
                        handleRemoveQualification(qualification.id)
                      }
                      className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-[#ff3547] text-white"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </article>
                ))}
              </div>
            )}

            {/* Inline add-qualification form */}
            {showForm && (
              <div className="mt-5 rounded-2xl border border-[#e5e8ed] bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-[#111]">
                    Add Qualification
                  </h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="text-xs font-medium text-[#222]">
                      Institution Name
                      <span className="relative mt-2 block">
                        <select
                          name="institutionName"
                          defaultValue=""
                          onChange={(e) =>
                            validateField("institutionName", e.target.value)
                          }
                          className={selectClassName}
                        >
                          <option value="" disabled>
                            Enter Institution Name
                          </option>
                          <option value="University">University</option>
                          <option value="College">College</option>
                          <option value="School">School</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                        />
                      </span>
                      {fieldErrors.institutionName?.[0] && (
                        <span className="mt-1 block text-[11px] text-red-600">
                          {fieldErrors.institutionName[0]}
                        </span>
                      )}
                    </label>

                    <label className="text-xs font-medium text-[#222]">
                      Degree
                      <span className="relative mt-2 block">
                        <select
                          name="degree"
                          defaultValue=""
                          onChange={(e) =>
                            validateField("degree", e.target.value)
                          }
                          className={selectClassName}
                        >
                          <option value="" disabled>
                            Choose Degree
                          </option>
                          <option value="Bachelor's">Bachelor&apos;s</option>
                          <option value="Master's">Master&apos;s</option>
                          <option value="Doctorate">Doctorate</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                        />
                      </span>
                      {fieldErrors.degree?.[0] && (
                        <span className="mt-1 block text-[11px] text-red-600">
                          {fieldErrors.degree[0]}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="text-xs font-medium text-[#222]">
                      Field of Study
                      <span className="relative mt-2 block">
                        <select
                          name="fieldOfStudy"
                          defaultValue=""
                          onChange={(e) =>
                            validateField("fieldOfStudy", e.target.value)
                          }
                          className={selectClassName}
                        >
                          <option value="" disabled>
                            Choose Field
                          </option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Science">Science</option>
                          <option value="English">English</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                        />
                      </span>
                      {fieldErrors.fieldOfStudy?.[0] && (
                        <span className="mt-1 block text-[11px] text-red-600">
                          {fieldErrors.fieldOfStudy[0]}
                        </span>
                      )}
                    </label>

                    <label className="text-xs font-medium text-[#222]">
                      Graduation Year
                      <span className="relative mt-2 block">
                        <select
                          name="graduationYear"
                          defaultValue=""
                          onChange={(e) =>
                            validateField("graduationYear", e.target.value)
                          }
                          className={selectClassName}
                        >
                          <option value="" disabled>
                            Choose Year
                          </option>
                          {Array.from({ length: 30 }, (_, index) => {
                            const year = new Date().getFullYear() - index;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                        />
                      </span>
                      {fieldErrors.graduationYear?.[0] && (
                        <span className="mt-1 block text-[11px] text-red-600">
                          {fieldErrors.graduationYear[0]}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="relative flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#c9cdd4] bg-white text-center transition hover:border-[#53a2eb]">
                    {degreeDocument?.type.startsWith("image/") ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
                        <div className="relative h-16 w-full overflow-hidden rounded-md bg-[#f8fafc]">
                          <img
                            src={degreeDocument.url}
                            alt="Degree document preview"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="max-w-full truncate text-xs font-medium text-[#666]">
                          {degreeDocument.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload
                          size={20}
                          strokeWidth={1.5}
                          className="text-[#888]"
                        />
                        <span className="mt-2 text-sm font-medium text-[#777]">
                          {degreeDocument?.name ?? "Upload Degree Document"}
                        </span>
                        <span className="mt-1 text-[10px] leading-4 text-[#aaa]">
                          PDF, JPG, PNG
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      name="degreeDocument"
                      accept="application/pdf,image/jpeg,image/png"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        validateField("degreeDocument", file);
                        if (
                          ![
                            "application/pdf",
                            "image/jpeg",
                            "image/png",
                          ].includes(file.type)
                        ) {
                          event.target.value = "";
                          setDegreeDocument(undefined);
                          setFieldErrors((errors) => ({
                            ...errors,
                            degreeDocument: [
                              "Please upload a PDF, JPG, or PNG document",
                            ],
                          }));
                          return;
                        }
                        setFieldErrors((errors) => ({
                          ...errors,
                          degreeDocument: undefined,
                        }));
                        if (degreeDocument?.url) {
                          URL.revokeObjectURL(degreeDocument.url);
                        }
                        setDegreeDocument({
                          name: file.name,
                          type: file.type,
                          url: URL.createObjectURL(file),
                        });
                      }}
                    />
                  </label>
                  {fieldErrors.degreeDocument?.[0] && (
                    <p className="text-[11px] text-red-600">
                      {fieldErrors.degreeDocument[0]}
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
                disabled={qualifications.length === 0}
                onClick={() => router.push(paths.teacherCertifications())}
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
