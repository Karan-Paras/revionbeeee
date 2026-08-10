import { RevisionBee } from "@/assets/icons";
import { TeacherLoginForm } from "@/features/auth/components/teacher-login-form";
import { paths } from "@/routes";
import { Monitor } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teacher Login - Revision Bee",
  description: "Sign in to your Revision Bee teacher account.",
};

export default function TeacherSignIn() {
  return (
    <main className="h-dvh overflow-hidden bg-[#f4f4f4] p-3 sm:p-4">
      <div className="mx-auto grid h-full max-w-[1440px] lg:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-hidden px-4 py-3 sm:px-10">
          <div className="w-full max-w-[475px]">
            <div className="mb-3 flex justify-center">
              <RevisionBee width={54} height={65} />
            </div>

            <div className="mb-5 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-black sm:text-[30px]">
                Welcome to Revision Bee
              </h1>
              <p className="mt-2 text-xs text-[#777] sm:text-sm">
                Sign in to continue teaching.
              </p>
            </div>

            <TeacherLoginForm />

            <div className="my-5 flex items-center gap-5 text-xs text-[#9a9a9a] sm:text-sm">
              <span className="h-px flex-1 bg-[#d7d7d7]" />
              <span>Or continue with</span>
              <span className="h-px flex-1 bg-[#d7d7d7]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium transition hover:shadow-md"
              >
                <span className="text-xl font-bold text-[#4285f4]">G</span>
                Google
              </button>
              <button
                type="button"
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium transition hover:shadow-md"
              >
                <Monitor size={21} className="text-[#1473e6]" />
                Outlook
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-[#555]">
              Not registered yet?{" "}
              <Link
                href={paths.teacherSignup()}
                className="font-semibold text-[#499ff0] underline underline-offset-2"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden h-full overflow-hidden rounded-2xl border-2 border-white lg:block">
          <Image
            src="/images/teacher-signin.png"
            alt="Teacher holding a tablet in a classroom"
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
