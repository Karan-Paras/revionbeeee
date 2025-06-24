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
    <section className="mths_bg min-h-screen bg-cover bg-no-repeat p-5 md:h-[calc(100vh-50px)]">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="relative m-auto w-full max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl md:w-11/12">
            <div className="img flex justify-center">
              <Image src={PassChng} alt="" />
            </div>
            <div className="desc my-5 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                Email Sent Successfully
              </h3>
              <p className="text-sm font-light text-[#6C6C6C]">
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
