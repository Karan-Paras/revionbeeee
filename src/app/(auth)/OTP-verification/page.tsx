import { OTPVerify } from "@/lib/assets";
import Image from "next/image";

export default function OtpVerification() {
  return (
    <>
      <section className="mths_bg p-5 h-screen bg-no-repeat bg-cover ">
        <div className="container mx-auto h-full">
          <div className="grid h-full content-center">
            <div className="max-w-lg w-11/12 m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
              <button className="absolute top-4 left-5 flex gap-1 items-center text-sm">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M5.32715 0.224609C5.71987 -0.0958594 6.29885 -0.0730529 6.66504 0.292969C7.03077 0.659001 7.05436 1.2382 6.73438 1.63086L6.66504 1.70703L3.41406 4.95703H10.917L11.0186 4.96191C11.523 5.01297 11.917 5.43915 11.917 5.95703C11.9169 6.47482 11.5229 6.90111 11.0186 6.95215L10.917 6.95703H3.41211L6.66504 10.21L6.73438 10.2852C7.0545 10.6779 7.03107 11.258 6.66504 11.624C6.29898 11.9896 5.71975 12.0124 5.32715 11.6924L5.25098 11.624L0.292969 6.66504C0.20373 6.57576 0.135359 6.47309 0.0869141 6.36426C0.0832893 6.35615 0.0795852 6.34807 0.0761719 6.33984C0.0460374 6.26694 0.0258271 6.19115 0.0136719 6.11426C0.00554986 6.06297 1.15479e-05 6.0106 0 5.95703C0 5.8016 0.0363367 5.65465 0.0996094 5.52344C0.118789 5.48366 0.140284 5.4447 0.165039 5.40723C0.20496 5.3467 0.250975 5.29061 0.302734 5.24023L5.25098 0.292969L5.32715 0.224609Z"
                    fill="#373737"
                  />
                </svg>
                back
              </button>
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
              <div className="frm grid grid-cols-4 my-3 w-6/12 mx-auto">
                <div className="col-span-1">
                  <input type="text" />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
              </div>
              <div className="btn mt-5">
                <button className="bg-[#53A2EB] w-full rounded-xl  text-white p-4 font-medium cursor-pointer">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
