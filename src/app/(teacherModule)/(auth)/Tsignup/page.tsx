import { RevisionBee } from "@/assets/icons";
import { RegisterForm } from "@/features/auth/components/register-form";
import { SocialRegisterButtons } from "@/features/auth/components/social-register-buttons";
import { paths } from "@/routes";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teacher Sign Up - Revision Bee",
  description: "Create your Revision Bee teacher account.",
};

type TeacherSignupProps = {
  searchParams: Promise<{ socialError?: string }>;
};

export default async function TeacherSignup({
  searchParams,
}: TeacherSignupProps) {
  const { socialError } = await searchParams;
  return (
    <main className="min-h-dvh w-full bg-[#f3f3f3] md:h-dvh md:overflow-hidden">
      <div className="grid min-h-dvh w-full md:h-full md:grid-cols-2">
        <section className="flex min-h-dvh items-start justify-center px-4 py-6 sm:px-10 md:h-dvh md:min-h-0 md:overflow-y-auto">
          <div className="w-full max-w-md [&_.spc_frm]:mt-4 [&_.spc_frm_.itm]:mb-2.5 [&_.spc_frm_.mb-8]:mb-4 [&_.spc_frm_.my-10]:my-4 [&_.spc_frm_button]:p-3 [&_.spc_frm_input]:py-3">
            <div className="mb-4">
              <Link
                href={paths.home()}
                className="inline-flex items-center gap-1.5 text-sm text-[#555] hover:text-[#499ff0] transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </Link>
            </div>
            <div className="flex justify-center">
              <RevisionBee width={46} height={56} />
            </div>
            <div className="my-2 text-center">
              <h1 className="mb-1 text-2xl font-bold md:text-[28px]">
                Let&apos;s get started.
              </h1>
              <p className="text-sm text-[#505050]">
                Create an account by filling in the information below
              </p>
            </div>
            <RegisterForm
              compact
              signInHref={paths.teacherLogin()}
              userType="teacher"
              successRedirect={paths.teacherPersonalInfo()}
              socialOptions={
                <SocialRegisterButtons
                  compact
                  userType="teacher"
                  error={socialError}
                />
              }
            />
          </div>
        </section>

        <section className="sticky top-0 hidden h-dvh overflow-hidden bg-white md:block">
          <Image
            src="/images/teacher-signup.png"
            alt="Teacher presenting a lesson in a classroom"
            width={675}
            height={908}
            priority
            sizes="50vw"
            className="h-full w-full object-contain object-center"
          />
        </section>
      </div>
    </main>
  );
}
