"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForgotPasswordStore } from "@/features/auth/stores/use-forgot-password-store";

import { PassChng } from "@/lib/assets";

import { paths } from "@/routes";

export function EmailSentCard() {
  const { hasFilledEmail, setHasFilledEmail } = useForgotPasswordStore();
  const router = useRouter();

  useEffect(() => {
    if (!hasFilledEmail) {
      setHasFilledEmail(false);
      router.push(paths.forgotPassword());
    }
  }, [hasFilledEmail, router, setHasFilledEmail]);

  if (!hasFilledEmail) {
    return null;
  }

  return (
    <section className="mths_bg p-5 md:h-[calc(100vh-50px)] min-h-screen bg-no-repeat bg-cover ">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="max-w-lg md:w-11/12 w-full m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
            <div className="img flex justify-center">
              <Image src={PassChng} alt="" />
            </div>
            <div className="desc text-center my-5">
              <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
                Email Sent Successfully
              </h3>
              <p className="text-[#6C6C6C] font-light text-sm">
                We have sent you an email with a link to reset your password.
                Please check your inbox and follow the instructions in the
                email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
