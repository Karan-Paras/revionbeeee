"use client";

import { addTeacherQualification as submitTeacherQualification } from "@/features/teacher/actions/add-qualification";
import { AddTeacherQualificationSchema } from "@/features/teacher/schemas";
import { useQualificationStore } from "@/features/teacher/stores/use-qualification-store";
import { paths } from "@/routes";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";

const selectClassName =
  "h-12 w-full appearance-none rounded-lg border border-[#d7dce4] bg-white px-4 pr-10 text-sm text-[#999] outline-none transition focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10";

export default function TeacherAddQualificationPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#f4f4f4]" />}>
      <TeacherAddQualification />
    </Suspense>
  );
}

function TeacherAddQualification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedReturnPath = searchParams.get("returnTo");
  const returnPath =
    requestedReturnPath === "/teacher/profile/qualification"
      ? requestedReturnPath
      : paths.teacherEducation();
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
  const addQualification = useQualificationStore(
    (state) => state.addQualification
  );

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

      router.push(returnPath);
    });
  }

  return (
    <main className="mths_bg relative grid h-dvh place-items-center overflow-hidden bg-cover bg-center bg-no-repeat p-5 before:absolute before:inset-0 before:bg-white/35">
      <section className="relative z-10 w-full max-w-[540px] rounded-2xl border border-white bg-white p-6 shadow-[0_20px_55px_rgba(53,67,87,0.16)] sm:p-7">
        <Link
          href={returnPath}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#222] transition hover:text-[#53a2eb]"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-bold text-[#111] sm:text-[28px]">
            Add Qualification
          </h1>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-xs font-medium text-[#222]">
              Institution Name
              <span className="relative mt-2 block">
                <select
                  name="institutionName"
                  defaultValue=""
                  onChange={(event) =>
                    validateField("institutionName", event.target.value)
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
                  onChange={(event) =>
                    validateField("degree", event.target.value)
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
                  onChange={(event) =>
                    validateField("fieldOfStudy", event.target.value)
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
                  onChange={(event) =>
                    validateField("graduationYear", event.target.value)
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

          <label className="relative flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#c9cdd4] bg-white text-center transition hover:border-[#53a2eb]">
            <Upload size={22} strokeWidth={1.5} className="text-[#888]" />
            <span className="mt-3 text-sm font-medium text-[#777]">
              {degreeDocument?.name ?? "Upload Degree Document"}
            </span>
            <span className="mt-2 text-[10px] leading-4 text-[#aaa]">
              Supported Documents: PDF, JPG, PNG
            </span>
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
                  !["application/pdf", "image/jpeg", "image/png"].includes(
                    file.type
                  )
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
            className="h-14 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </form>
      </section>
    </main>
  );
}
