import { RevisionBee } from "@/assets/icons";
import { RegisterForm } from "@/features/auth/components/register-form";
import { SocialRegisterButtons } from "@/features/auth/components/social-register-buttons";
import { paths } from "@/routes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Sign Up - Revision Bee",
  description: "Create your Revision Bee student account.",
};

type StudentSignupProps = {
  searchParams: Promise<{ socialError?: string }>;
};

export default async function StudentSignup({
  searchParams,
}: StudentSignupProps) {
  const { socialError } = await searchParams;
  return (
    <div className="mx-auto h-full w-full max-w-md content-center py-2 md:w-11/12">
      <div className="flex justify-center">
        <RevisionBee width={44} height={54} />
      </div>
      <div className="my-1.5 text-center">
        <h1 className="mb-1 text-2xl font-bold md:text-[28px]">
          Let&apos;s get started.
        </h1>
        <p className="text-sm text-[#505050]">
          Create an account by filling in the information below
        </p>
      </div>
      <div className="mb-4 grid grid-cols-2 rounded-xl bg-white p-1 shadow-sm">
        <Link
          href={paths.studentSignup()}
          aria-current="page"
          className="grid h-11 place-items-center rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.18)] transition"
        >
          Student
        </Link>
        <Link
          href={paths.teacherSignup()}
          className="grid h-11 place-items-center rounded-lg text-sm font-semibold text-[#667085] transition hover:bg-[#f2f7fc] hover:text-[#398edc]"
        >
          Teacher
        </Link>
      </div>
      <RegisterForm
        compact
        userType="student"
        socialOptions={
          <SocialRegisterButtons
            compact
            userType="student"
            error={socialError}
          />
        }
      />
    </div>
  );
}
