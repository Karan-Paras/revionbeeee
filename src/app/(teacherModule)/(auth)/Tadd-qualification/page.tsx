"use client";

import { addTeacherQualification as submitTeacherQualification } from "@/features/teacher/actions/add-qualification";
import { AddTeacherQualificationSchema } from "@/features/teacher/schemas";
import { useQualificationStore } from "@/features/teacher/stores/use-qualification-store";
import { paths } from "@/routes";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";

const inputClassName =
  "h-12 w-full rounded-lg border border-[#d7dce4] bg-white px-4 text-sm text-[#222] outline-none transition focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10 placeholder:text-[#999]";

const selectClassName =
  "h-12 w-full appearance-none rounded-lg border border-[#d7dce4] bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10";

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

    const validation = AddTeacherQualificationSchema.safeParse({
      institutionName: formData.get("institutionName"),
      degree: formData.get("degree"),
      fieldOfStudy: formData.get("fieldOfStudy"),
      graduationYear: formData.get("graduationYear"),
      degreeDocument: formData.get("degreeDocument"),
    });

    if (!validation.success) {
      setFieldErrors(validation.error.flatten().fieldErrors);
      return;
    }

    startTransition(async () => {
      const result = await submitTeacherQualification(formData);

      if (!result.success) {
        setSubmitError(
          result.error ?? "Unable to add qualification. Please try again."
        );
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

        <form
          className="mt-5 space-y-4"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <div className="grid grid-cols-2 gap-4">
            <label className="text-xs font-medium text-[#222]">
              Institution Name
              <span className="mt-2 block">
                <input
                  type="text"
                  name="institutionName"
                  placeholder="Enter institution name (e.g., University of Mumbai)"
                  autoComplete="new-password"
                  data-lpignore="true"
                  onFocus={(event) =>
                    event.currentTarget.setAttribute(
                      "autocomplete",
                      "new-password"
                    )
                  }
                  onChange={(event) =>
                    validateField("institutionName", event.target.value)
                  }
                  className={inputClassName}
                />
              </span>
              {fieldErrors.institutionName?.[0] && (
                <span className="mt-1 block text-[11px] text-red-500">
                  {fieldErrors.institutionName[0]}
                </span>
              )}
            </label>

            <label className="text-xs font-medium text-[#222]">
              Degree
              <span className="mt-2 block">
                <input
                  type="text"
                  name="degree"
                  placeholder="Enter degree (e.g., B.Sc, M.A)"
                  autoComplete="new-password"
                  data-lpignore="true"
                  onFocus={(event) =>
                    event.currentTarget.setAttribute(
                      "autocomplete",
                      "new-password"
                    )
                  }
                  onChange={(event) =>
                    validateField("degree", event.target.value)
                  }
                  className={inputClassName}
                />
              </span>
              {fieldErrors.degree?.[0] && (
                <span className="mt-1 block text-[11px] text-red-500">
                  {fieldErrors.degree[0]}
                </span>
              )}
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-xs font-medium text-[#222]">
              Field of Study
              <span className="mt-2 block">
                <input
                  type="text"
                  name="fieldOfStudy"
                  placeholder="Enter field of study (e.g., Mathematics)"
                  autoComplete="new-password"
                  data-lpignore="true"
                  onFocus={(event) =>
                    event.currentTarget.setAttribute(
                      "autocomplete",
                      "new-password"
                    )
                  }
                  onChange={(event) =>
                    validateField("fieldOfStudy", event.target.value)
                  }
                  className={inputClassName}
                />
              </span>
              {fieldErrors.fieldOfStudy?.[0] && (
                <span className="mt-1 block text-[11px] text-red-500">
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
                  autoComplete="new-password"
                  onFocus={(event) =>
                    event.currentTarget.setAttribute(
                      "autocomplete",
                      "new-password"
                    )
                  }
                  onChange={(event) =>
                    validateField("graduationYear", event.target.value)
                  }
                  className={selectClassName}
                >
                  <option value="" disabled>
                    Enter Year
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
                <span className="mt-1 block text-[11px] text-red-500">
                  {fieldErrors.graduationYear[0]}
                </span>
              )}
            </label>
          </div>

          <label className="relative flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#c9cdd4] bg-white text-center transition hover:border-[#53a2eb]">
            {degreeDocument?.type.startsWith("image/") ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
                <div className="relative h-20 w-full overflow-hidden rounded-md bg-[#f8fafc]">
                  <Image
                    src={degreeDocument.url}
                    alt="Degree document preview"
                    fill
                    sizes="100%"
                    className="object-contain"
                  />
                </div>
                <span className="max-w-full truncate text-xs font-medium text-[#666]">
                  {degreeDocument.name}
                </span>
              </div>
            ) : (
              <>
                <Upload size={22} strokeWidth={1.5} className="text-[#888]" />
                <span className="mt-3 text-sm font-medium text-[#777]">
                  {degreeDocument?.name ?? "Upload Degree Document (Optional)"}
                </span>
                <span className="mt-2 text-[10px] leading-4 text-[#aaa]">
                  Supported Documents: PDF, JPG, PNG
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
                  // data URLs don't need to be revoked, but we clear for consistency
                }

                const docReader = new FileReader();
                docReader.onload = () => {
                  if (typeof docReader.result === "string") {
                    setDegreeDocument({
                      name: file.name,
                      type: file.type,
                      url: docReader.result,
                    });
                  }
                };
                docReader.readAsDataURL(file);
              }}
            />
          </label>
          {fieldErrors.degreeDocument?.[0] && (
            <span className="mt-1 block text-[11px] text-red-600">
              {fieldErrors.degreeDocument[0]}
            </span>
          )}

          {submitError && (
            <p role="alert" className="text-sm text-red-500">
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
