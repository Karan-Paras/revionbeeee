import { paths } from "@/routes";
import { BadgeCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile Created - Revision Bee",
  description: "Your Revision Bee teacher profile has been created.",
};

export default function TeacherProfileCreated() {
  return (
    <main className="mths_bg relative grid h-dvh place-items-center overflow-hidden bg-cover bg-center bg-no-repeat p-5 before:absolute before:inset-0 before:bg-white/35">
      <section className="relative z-10 w-full max-w-[440px] rounded-2xl border border-white bg-white px-6 py-7 text-center shadow-[0_20px_55px_rgba(53,67,87,0.16)]">
        <BadgeCheck
          aria-hidden="true"
          size={64}
          strokeWidth={2.5}
          className="mx-auto fill-[#8bd8c5] text-white"
        />
        <h1 className="mt-3 text-2xl font-bold text-[#111]">Profile Created</h1>
        <p className="mt-1.5 text-sm text-[#666]">
          Your profile has been successfully created
        </p>
        <Link
          href={paths.teacherDashboard()}
          className="mt-5 grid h-12 w-full place-items-center rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df]"
        >
          Continue
        </Link>
      </section>
    </main>
  );
}
