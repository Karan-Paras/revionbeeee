import { PassIcn } from "@/lib/assets";
import { ArrowBack, EyeClose } from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";

export default function ConfirmPassword() {
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
                <Image src={PassIcn} alt=""/>
              </div>
              <div className="desc text-center my-5">
                <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
                  Create new password
                </h3>
                <p className="text-[#6C6C6C] font-light text-sm">
                  Your new password must be unique from those previously used
                </p>
              </div>
              <div className="spc_frm mt-9">
                <form action="">
                  <div className="itm relative mb-5">
                    <label htmlFor="" className="w-full text-sm">
                      Password
                    </label>
                    <div className="pass_bg icn_bg  relative my-1.5">
                      <input
                        type="email"
                        className="bg-white py-5 ps-12 pe-12 w-full border border-[#D8DAE5] outline-0 rounded-xl "
                        placeholder="Enter password"
                      />
                      {/* password icon */}
                      <button className="pass_icon absolute right-5 top-0 bottom-0 h-full content-center cursor-pointer">
                        <span>
                         <EyeClose/>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="itm relative mb-5">
                    <label htmlFor="" className="w-full text-sm">
                      Confirm password
                    </label>
                    <div className="pass_bg icn_bg  relative my-1.5">
                      <input
                        type="email"
                        className="bg-white py-5 ps-12 pe-12 w-full border border-[#D8DAE5] outline-0 rounded-xl "
                        placeholder="Confirm password"
                      />
                      {/* password icon */}
                      <button className="pass_icon absolute right-5 top-0 bottom-0 h-full content-center cursor-pointer">
                        <span>
                         <EyeClose/>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="btn mt-5">
                <Link href="/password-changed">
                  <button className="bg-[#53A2EB] w-full rounded-xl  text-white p-4 font-medium cursor-pointer">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
    </>
  );
}
