import { EmailService } from "@/lib/assets";
import { ArrowBack } from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";

export default function ForgetPassword() {
  return (
    <>
      <div className="max-w-lg w-11/12 m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
              <Link className="" href="/login">
                <button className="absolute top-4 left-5 flex gap-1 items-center text-sm">
                 <ArrowBack/>
                  back
                </button>
              </Link>
              <div className="img flex justify-center">
                <Image src={EmailService} alt=""/>
              </div>
              <div className="desc text-center my-5">
                <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
                  Forgot password?
                </h3>
                <p className="text-[#6C6C6C] font-light text-sm">
                  Don&apos;t worry! Please enter the email address linked with
                  your account.
                </p>
              </div>
              <div className="frm my-3">
                <label htmlFor="" className="font-light text-[#0B0B0B]">
                  Email address
                </label>
                <div className="mail_bg icn_bg relative my-1.5">
                  <input
                    type="email"
                    className="bg-white border border-[#D8DAE5] py-5 ps-12 pe-5 w-full outline-0 rounded-xl"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="btn mt-5">
                <Link href="/otp-verification">
                  <button className="bg-[#53A2EB] w-full rounded-xl  text-white p-4 font-medium cursor-pointer">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
    </>
  );
}
