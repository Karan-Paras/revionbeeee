import { RevisionBee } from "@/assets/icons";
import { RegisterForm } from "@/features/auth/components/register-form";
import { paths } from "@/routes";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Teacher Sign Up - Revision Bee",
  description: "Create your Revision Bee teacher account.",
};

export default function TeacherSignup() {
  return (
    <main className="h-dvh overflow-hidden bg-[#f3f3f3] p-3 sm:p-4">
      <div className="mx-auto grid h-full max-w-[1440px] md:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-hidden px-4 py-2 sm:px-10">
          <div className="w-full max-w-md [&_.spc_frm]:mt-4 [&_.spc_frm_.itm]:mb-2.5 [&_.spc_frm_.mb-8]:mb-4 [&_.spc_frm_.my-10]:my-4 [&_.spc_frm_button]:p-3 [&_.spc_frm_input]:py-3">
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
              signInHref={paths.teacherLogin()}
              userType="teacher"
              successRedirect={paths.teacherPersonalInfo()}
            />
          </div>
        </section>

        <section className="relative hidden h-full overflow-hidden rounded-xl border-2 border-white bg-white md:block">
          <Image
            src="/images/teacher-signup.png"
            alt="Teacher presenting a lesson in a classroom"
            width={675}
            height={908}
            priority
            sizes="50vw"
            className="mx-auto h-full w-auto max-w-full"
          />
        </section>
      </div>
    </main>
  );
}
