"use client";

import { connectTeacherStripe } from "@/features/teacher/actions/connect-stripe";
import { paths } from "@/routes";
import { ArrowLeft, LoaderCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function TeacherBankDetails() {
  const hasStarted = useRef(false);
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);

  const connectToStripe = useCallback(async () => {
    setError("");
    setIsConnecting(true);

    const result = await connectTeacherStripe();
    if (!result.success) {
      setError(result.error);
      setIsConnecting(false);
      return;
    }

    window.location.replace(result.url);
  }, []);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    void connectToStripe();
  }, [connectToStripe]);

  return (
    <main className="grid min-h-dvh place-items-center bg-[#f4f6f8] p-5">
      <section className="w-full max-w-[500px] rounded-2xl bg-white px-7 py-10 text-center shadow-[0_16px_45px_rgba(30,50,70,0.10)] sm:px-10">
        {isConnecting ? (
          <>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#edf7ff] text-[#53a2eb]">
              <LoaderCircle size={30} className="animate-spin" />
            </span>
            <h1 className="mt-6 text-xl font-bold text-[#151515]">
              Connecting to Stripe
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#707780]">
              Please wait while we securely redirect you to Stripe to add your
              bank account.
            </p>
          </>
        ) : (
          <>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#fff1f2] text-[#ef4452]">
              <RefreshCw size={28} />
            </span>
            <h1 className="mt-6 text-xl font-bold text-[#151515]">
              Stripe connection failed
            </h1>
            <p role="alert" className="mt-3 text-sm leading-6 text-[#d33d49]">
              {error || "Unable to connect to Stripe. Please try again."}
            </p>
            <button
              type="button"
              onClick={connectToStripe}
              className="mt-7 h-12 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white transition hover:bg-[#4395df]"
            >
              Try Again
            </button>
            <Link
              href={paths.teacherAvailability()}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#d9dee3] text-sm font-medium text-[#667085] hover:bg-[#f8fafb]"
            >
              <ArrowLeft size={17} /> Back
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
