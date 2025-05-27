"use client";

import { Button } from "@/components/ui/button";
import useForgotPasswordStore from "@/features/auth/stores/use-forgot-password";
import { PassChng } from "@/lib/assets";
import { paths } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PasswordChangedCard() {
  const { hasChangedPassword, setHasChangedPassword } =
    useForgotPasswordStore();

  const router = useRouter();

  if (!hasChangedPassword) {
    setHasChangedPassword(false);
    router.push(paths.forgotPassword());
    return null;
  }

  return (
    <section className="mths_bg p-5 md:h-[calc(100vh-50px)] min-h-screen bg-no-repeat bg-cover ">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="max-w-lg w-11/12 m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
            <div className="img flex justify-center">
              <Image src={PassChng} alt="" />
            </div>
            <div className="desc text-center my-5">
              <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
                Password Changed!
              </h3>
              <p className="text-[#6C6C6C] font-light text-sm">
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
