import { paths } from "@/routes";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request Submitted - Revision Bee",
  description: "Your lesson request has been submitted successfully.",
  robots: { index: false, follow: false },
};

export default function LessonSuccessPage() {
  return (
    <main
      className="fixed inset-0 z-[100001] grid place-items-center overflow-y-auto bg-[#f8faf9] bg-cover bg-center p-5"
      style={{ backgroundImage: "url('/images/math_units.png')" }}
    >
      <section className="w-full max-w-[600px] rounded-2xl bg-white px-6 py-8 text-center shadow-[0_15px_45px_rgba(68,86,94,0.12)] sm:px-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#83d4bd] text-white">
          <Check size={34} strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-[#101010]">
          Request Submitted
        </h1>
        <p className="mt-3 text-sm text-[#727272]">
          Your lesson request has been submitted successfully.
        </p>
        <Link
          href={paths.lessons()}
          className="mt-6 grid h-12 w-full place-items-center rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-md hover:bg-[#398fdc]"
        >
          Continue
        </Link>
      </section>
    </main>
  );
}
