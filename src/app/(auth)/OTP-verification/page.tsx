import { OTPVerify } from "@/lib/assets";
import { ArrowBack } from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";

export default function OtpVerification() {
  return (
    <>
      <section className="mths_bg p-5 h-screen bg-no-repeat bg-cover ">
        <div className="container mx-auto h-full">
          <div className="grid h-full content-center">
            <div className="max-w-lg w-11/12 m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
              <Link className="" href="/forget-password">
                <button className="absolute top-4 left-5 flex gap-1 items-center text-sm">
                  <ArrowBack />
                    back
                </button>
              </Link>  
              <div className="img flex justify-center">
                <Image src={OTPVerify} alt=""></Image>
              </div>
              <div className="desc text-center my-5">
                <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
                  OTP Verification
                </h3>
                <p className="text-[#6C6C6C] font-light text-sm">
                  Enter the code sent to your registered email to reset your
                  password.
                </p>
              </div>
              <div className="frm grid grid-cols-4 gap-2.5 my-3 w-8/12 mx-auto">
                <div className="col-span-1 bg-[#F2F2F2] rounded-lg">
                  <input type="number" className="w-full h-full outline-0 p-2 min-h-14 text-center inp_spc"  />
                </div>
                <div className="col-span-1 bg-[#F2F2F2] rounded-lg">
                   <input type="number" className="w-full h-full outline-0 p-2 min-h-14 text-center inp_spc"  />
                </div>
                <div className="col-span-1 bg-[#F2F2F2] rounded-lg">
                   <input type="number" className="w-full h-full outline-0 p-2 min-h-14 text-center inp_spc"  />
                </div>
                <div className="col-span-1 bg-[#F2F2F2] rounded-lg">
                  <input type="number" className="w-full h-full outline-0 p-2 min-h-14 text-center inp_spc"  />
                </div>
              </div>
              <div className="dec text-center mt-5">
                  <p>Didn’t receive OTP?  <Link className="text-[#53A2EB]" href="">Resend OTP</Link></p>
              </div>
              <div className="btn mt-5">
                <Link href="/confirm-password">
                    <button className="bg-[#53A2EB] w-full rounded-xl  text-white p-4 font-medium cursor-pointer">
                    Verify
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
