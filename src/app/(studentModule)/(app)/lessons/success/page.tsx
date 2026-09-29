import { Check } from "lucide-react";
import type { Metadata } from "next";
import { ContinueButton } from "./continue-button";

type LessonSuccessPageProps = {
  searchParams: Promise<{ lessonID?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: LessonSuccessPageProps): Promise<Metadata> {
  const { lessonID } = await searchParams;
  const isPaymentSuccess = Boolean(lessonID);

  return {
    title: isPaymentSuccess
      ? "Payment Successful - Revision Bee"
      : "Request Submitted - Revision Bee",
    description: isPaymentSuccess
      ? "Your lesson payment has been completed successfully."
      : "Your lesson request has been submitted successfully.",
    robots: { index: false, follow: false },
  };
}

export default async function LessonSuccessPage({
  searchParams,
}: LessonSuccessPageProps) {
  const { lessonID } = await searchParams;
  const isPaymentSuccess = Boolean(lessonID);

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
          {isPaymentSuccess ? "Payment Successfully Done" : "Request Submitted"}
        </h1>
        <p className="mt-3 text-sm text-[#727272]">
          {isPaymentSuccess
            ? "Your lesson payment has been completed successfully."
            : "Your lesson request has been submitted successfully."}
        </p>
        <ContinueButton
          lessonID={Array.isArray(lessonID) ? lessonID[0] : lessonID}
        />
      </section>
    </main>
  );
}
