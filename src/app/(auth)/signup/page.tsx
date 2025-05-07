import { EyeClose, RevisionBee } from "@/lib/icons";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <div className="mx-auto max-w-md w-11/12 h-full content-center">
                  <div className="icn flex justify-center">
                    <span>
                     <RevisionBee/>
                    </span>
                  </div>
                  <div className="hed my-3.5 text-center">
                    <h1 className="text-3xl font-bold text-center mb-2">
                      Let’s get started.
                    </h1>
                    <p className="text-[#505050] text-sm">
                      Create an account by filling in the information belows
                    </p>
                  </div>
                  <div className="spc_frm mt-9">
                    <form action="">
                      <div className="itm relative mb-3.5">
                        <label htmlFor="" className="w-full text-sm">
                          Email address
                        </label>
                        <div className="mail_bg icn_bg relative my-1.5">
                          <input
                            type="email"
                            className="bg-white py-5 ps-12 pe-5 w-full outline-0 rounded-xl"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="itm relative mb-5">
                        <label htmlFor="" className="w-full text-sm">
                          Password
                        </label>
                        <div className="pass_bg icn_bg  relative my-1.5">
                          <input
                            type="email"
                            className="bg-white py-5 ps-12 pe-12 w-full outline-0 rounded-xl "
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
                            className="bg-white py-5 ps-12 pe-12 w-full outline-0 rounded-xl "
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
                      <div className="flex justify-between items-center mb-8">
                        <div className="chk flex gap-1.5 items-start flex-wrap">
                          <input
                            className="size-5 accent-blue bg-transparent rounded-xl"
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                          />
                          <label
                            htmlFor="vehicle1"
                            className="text-[#0B0B0B] font-light text-sm w-8/12"
                          >
                            By signing up, you are agreeing to our{" "}
                            <Link
                              className="text-[#53A2EB] underline underline-offset-5 font-semibold"
                              href="/signup"
                            >
                              Terms & Conditions{" "}
                            </Link>{" "}
                            and{" "}
                            <Link
                              className="text-[#53A2EB] underline underline-offset-5 font-semibold"
                              href="/signup"
                            >
                              {" "}
                              Privacy Policy.
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="btn">
                        <button className="bg-[#53A2EB] w-full rounded-md text-white p-4 font-medium cursor-pointer">
                          Sign In
                        </button>
                      </div>
                      <div className="lnk my-10">
                        <p className="text-center text-[#505050]">
                          Not registered yet?{" "}
                          <Link
                            className="text-[#53A2EB] underline underline-offset-5 font-semibold"
                            href="/login"
                          >
                            Sign in
                          </Link>{" "}
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
    </>
  );
}
