import { PassChng } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export default function PasswordChange() {
  return (
    <>
      <section className="mths_bg p-5 h-[calc(100vh-50px)] bg-no-repeat bg-cover ">
        <div className="container mx-auto h-full">
          <div className="grid h-full content-center">
            <div className="max-w-lg w-11/12 m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
              <div className="img flex justify-center">
                <Image src={PassChng} alt=""></Image>
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
                <Link href="/OTP-verification">
                  <button className="bg-[#53A2EB] w-full rounded-xl  text-white p-4 font-medium cursor-pointer">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
