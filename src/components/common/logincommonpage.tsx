import { RevisionBee } from "@/assets/icons";
import { paths } from "@/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type RoleSelectionPageProps = {
  mode?: "login" | "signup";
};

export default function LoginCommonPage({
  mode = "login",
}: RoleSelectionPageProps) {
  const isSignup = mode === "signup";
  const roles = [
    {
      title: "Student",
      href: isSignup ? paths.studentSignup() : paths.studentLogin(),
    },
    {
      title: "Teacher",
      href: isSignup ? paths.teacherSignup() : paths.teacherLogin(),
    },
  ] as const;

  return (
    <main className="relative flex min-h-[calc(100vh-40px)] items-center justify-center overflow-hidden rounded-xl bg-[#f7f9fc] px-5 py-10">
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[#53a2eb]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -bottom-32 h-80 w-80 rounded-full bg-[#fbbe1b]/15 blur-3xl"
      />

      <section className="relative w-full max-w-2xl rounded-3xl border border-white bg-white/95 px-6 py-10 text-center shadow-[0_24px_70px_rgba(37,65,101,0.12)] sm:px-12 sm:py-12">
        {isSignup && (
          <Link
            href={paths.login()}
            className="absolute top-5 left-5 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#1b1613] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#53a2eb]"
            aria-label="Back to login"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Back
          </Link>
        )}
        <div className="mx-auto mb-5 flex w-fit justify-center">
          <RevisionBee width={66} height={80} />
        </div>

        <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-[#53a2eb] uppercase">
          Welcome to Revision Bee
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#1b1613] sm:text-4xl">
          {isSignup ? "Sign up as" : "Login as"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6b7280] sm:text-base">
          Choose your role to {isSignup ? "create" : "access"} your Revision Bee
          account.
        </p>

        <div className="mx-auto mt-9 grid max-w-md grid-cols-2 rounded-xl bg-[#f2f5f8] p-1.5">
          {roles.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="grid h-12 place-items-center rounded-lg bg-white text-sm font-semibold text-[#1b1613] shadow-sm transition hover:bg-[#53a2eb] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#53a2eb]"
            >
              {title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
