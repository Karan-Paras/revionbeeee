import Image from "next/image";

import { verifyToken } from "@/features/auth/api/forgot-password";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

import { PassIcn } from "@/lib/assets";

interface ResetPasswordProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPassword({ params }: ResetPasswordProps) {
  const { token } = await params;

  await verifyToken(token);

  return (
    <div className="max-w-lg md:w-11/12 w-full m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
      <div className="img flex justify-center">
        <Image src={PassIcn} alt="" />
      </div>
      <div className="desc text-center my-5">
        <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
          Create new password
        </h3>
        <p className="text-[#6C6C6C] font-light text-sm">
          Your new password must be unique from those previously used
        </p>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
