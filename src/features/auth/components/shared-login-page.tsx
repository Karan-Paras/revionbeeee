import { RevisionBee } from "@/assets/icons";
import { paths } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { SocialRegisterButtons } from "./social-register-buttons";
import { TeacherLoginForm } from "./teacher-login-form";

type SharedLoginPageProps = {
  socialError?: string;
  userType?: "student" | "teacher";
};

export function SharedLoginPage({
  socialError,
  userType = "student",
}: SharedLoginPageProps) {
  return (
    <main className="h-dvh w-full overflow-hidden bg-[#f4f4f4]">
      <div className="grid h-full w-full lg:grid-cols-2">
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
                Sign in to continue to your account.
              </p>
            </div>
            <TeacherLoginForm />
            <SocialRegisterButtons
              mode="login"
              userType={userType}
              error={socialError}
            />
            <p className="mt-5 text-center text-sm text-[#555]">
              Not registered yet?{" "}
              <Link
                href={paths.signup()}
                className="font-semibold text-[#499ff0] underline underline-offset-2"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </section>
        <section className="relative hidden h-full overflow-hidden lg:block">
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
