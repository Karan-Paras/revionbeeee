import { verifyToken } from "@/features/auth/api/forgot-password";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { PassIcn } from "@/lib/assets";
import Image from "next/image";

interface ResetPasswordProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPassword({ params }: ResetPasswordProps) {
  const { token } = await params;

  await verifyToken(token);

  return (
    <div className="relative m-auto w-full max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl md:w-11/12">
      <div className="img flex justify-center">
        <Image src={PassIcn} alt="" />
      </div>
      <div className="desc my-5 text-center">
        <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
          Create new password
        </h3>
        <p className="text-sm font-light text-[#6C6C6C]">
          Your new password must be unique from those previously used
        </p>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
