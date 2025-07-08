import { ArrowBack } from "@/assets/icons";
import { EmailService } from "@/assets/images";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { paths } from "@/routes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password - Revision Bee",
  description:
    "Recover your Revision Bee account with a secure password reset link.",
};

export default function ForgetPassword() {
  return (
    <div className="relative m-auto mt-10 w-full max-w-lg rounded-xl border border-gray-100 bg-white p-5 shadow-2xl md:mt-0 md:w-11/12 md:p-8">
      <Link href={paths.login()}>
        <button className="absolute top-4 left-5 flex cursor-pointer items-center gap-1 text-sm">
          <ArrowBack />
          back
        </button>
      </Link>
      <div className="img flex justify-center">
        <Image src={EmailService} alt="email-service" />
      </div>
      <div className="desc my-5 text-center">
        <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
          Forgot password?
        </h3>
        <p className="text-sm font-light text-[#6C6C6C]">
          Don&apos;t worry! Please enter the email address linked with your
          account.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
