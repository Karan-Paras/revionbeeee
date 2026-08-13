"use client";

import { addTeacherCertification as submitTeacherCertification } from "@/features/teacher/actions/add-certification";
import { useCertificationStore } from "@/features/teacher/stores/use-certification-store";
import { paths } from "@/routes";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";

const inputClassName =
  "mt-1.5 h-12 w-full rounded-lg border border-[#d7dce4] bg-white px-4 text-sm text-[#333] outline-none transition placeholder:text-[#999] focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10";

export default function TeacherAddCertificationPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#f4f4f4]" />}>
      <TeacherAddCertification />
    </Suspense>
  );
}

function TeacherAddCertification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedReturnPath = searchParams.get("returnTo");
  const returnPath =
    requestedReturnPath === "/teacher/profile/certifications"
      ? requestedReturnPath
      : paths.teacherCertifications();
  const addCertification = useCertificationStore(
    (state) => state.addCertification
  );
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

      router.push(returnPath);
    });
  }

  return (
    <main className="mths_bg relative grid min-h-dvh place-items-center overflow-hidden bg-cover bg-center bg-no-repeat p-5 before:absolute before:inset-0 before:bg-white/45">
      <section className="relative z-10 w-full max-w-[540px] rounded-2xl bg-white p-6 shadow-[0_20px_55px_rgba(53,67,87,0.14)] sm:p-7">
        <Link
          href={returnPath}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#222] transition hover:text-[#53a2eb]"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-bold text-[#111] sm:text-[28px]">
            Add Certifications
          </h1>
          <p className="mx-auto mt-2 max-w-[300px] text-xs leading-5 text-[#666]">
            Add the details of your professional certification.
          </p>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
          <label className="block text-xs font-medium text-[#222]">
            Certification Name
            <input
              name="certificationName"
              type="text"
              placeholder="Enter Certification Name"
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
            <span className="relative block">
              <select
                name="issuingAuthority"
                defaultValue=""
                className={`${inputClassName} appearance-none pr-10 text-[#999]`}
              >
                <option value="" disabled>
                  Enter Authority
                </option>
                <option value="University">University</option>
                <option value="Professional Organization">
                  Professional Organization
                </option>
                <option value="Training Institute">Training Institute</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute top-[calc(50%+3px)] right-3 -translate-y-1/2 text-[#999]"
              />
            </span>
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
              className={`${inputClassName} text-[#999]`}
            />
            {fieldErrors.issueDate?.[0] && (
              <span className="mt-1 block text-[11px] text-red-600">
                {fieldErrors.issueDate[0]}
              </span>
            )}
          </label>

          <label className="relative flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#c9cdd4] bg-white text-center transition hover:border-[#53a2eb]">
            <Upload size={22} strokeWidth={1.5} className="text-[#888]" />
            <span className="mt-3 text-sm font-medium text-[#777]">
              {certificate?.name ?? "Upload Certificate"}
            </span>
            <span className="mt-2 text-[10px] leading-4 text-[#aaa]">
              Supported Documents: PDF, JPG, PNG
              <br />
              Maximum File Size: 10 MB
            </span>
            <input
              type="file"
              name="certificationFile"
              accept="application/pdf,image/jpeg,image/png"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                if (
                  !["application/pdf", "image/jpeg", "image/png"].includes(
                    file.type
                  )
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

                if (certificate?.url) URL.revokeObjectURL(certificate.url);

                setCertificate({
                  name: file.name,
                  type: file.type,
                  url: URL.createObjectURL(file),
                });
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
            className="h-14 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df]"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </form>
      </section>
    </main>
  );
}
