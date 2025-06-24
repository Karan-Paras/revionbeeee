"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useForgotPasswordStore } from "@/features/auth/stores/use-forgot-password-store";

import { PassChng } from "@/lib/assets";

import { paths } from "@/routes";

export function PasswordChangedCard() {
  const { hasChangedPassword, setHasChangedPassword } =
    useForgotPasswordStore();
  const router = useRouter();

  useEffect(() => {
    if (!hasChangedPassword) {
      setHasChangedPassword(false);
      router.push(paths.forgotPassword());
    }
  }, [hasChangedPassword, router, setHasChangedPassword]);

  if (!hasChangedPassword) {
    return null;
  }

  return (
    <section className="mths_bg min-h-screen bg-cover bg-no-repeat p-5 md:h-[calc(100vh-50px)]">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="relative m-auto w-11/12 max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
            <div className="img flex justify-center">
              <Image src={PassChng} alt="" />
            </div>
            <div className="desc my-5 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                Password Changed!
              </h3>
              <p className="text-sm font-light text-[#6C6C6C]">
                Your password has been successfully changed
              </p>
            </div>
            <div className="btn mt-5">
              <Link href={paths.login()}>
                <Button type="button" variant="rounded">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
