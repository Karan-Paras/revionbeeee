import { ForgotPasswordForm } from "@/features/forgot-password/components/forgot-password-form";
import { EmailService } from "@/lib/assets";
import { ArrowBack } from "@/lib/icons";
import { paths } from "@/routes";
import Image from "next/image";
import Link from "next/link";

export default function ForgetPassword() {
  return (
    <div className="max-w-lg w-11/12 m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
      <Link href={paths.login()}>
        <button className="absolute top-4 left-5 flex gap-1 items-center text-sm cursor-pointer">
          <ArrowBack />
          back
        </button>
      </Link>
      <div className="img flex justify-center">
        <Image src={EmailService} alt="email-service" />
      </div>
      <div className="desc text-center my-5">
        <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
          Forgot password?
        </h3>
        <p className="text-[#6C6C6C] font-light text-sm">
          Don&apos;t worry! Please enter the email address linked with your
          account.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
