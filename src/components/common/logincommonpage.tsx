import { RevisionBee } from "@/assets/icons";
import { paths } from "@/routes";
import { GraduationCap, School } from "lucide-react";
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
      description: isSignup
        ? "Create your student account and start learning"
        : "Continue learning and track your progress",
      href: isSignup ? paths.studentSignup() : paths.studentLogin(),
      icon: GraduationCap,
    },
    {
      title: "Teacher",
      description: isSignup
        ? "Create your teacher account and start teaching"
        : "Manage your classes and support your students",
      href: isSignup ? paths.teacherSignup() : paths.teacherLogin(),
      icon: School,
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

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {roles.map(({ title, description, href, icon: Icon }, index) => (
            <Link
              key={title}
              href={href}
              className="group flex min-h-44 flex-col items-center justify-center rounded-2xl border border-[#e5e7eb] bg-white px-5 py-6 transition duration-200 hover:-translate-y-1 hover:border-[#53a2eb] hover:shadow-[0_14px_32px_rgba(83,162,235,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#53a2eb]"
            >
              <span
                className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${
                  index === 0
                    ? "bg-[#53a2eb]/12 text-[#398edc]"
                    : "bg-[#fbbe1b]/18 text-[#d79700]"
                }`}
              >
                <Icon aria-hidden="true" size={30} strokeWidth={1.8} />
              </span>
              <span className="text-lg font-bold text-[#1b1613]">{title}</span>
              <span className="mt-1.5 text-sm leading-5 text-[#6b7280]">
                {description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
