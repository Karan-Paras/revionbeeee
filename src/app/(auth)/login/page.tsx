import { EyeClose, RevisionBee } from "@/lib/icons";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <section className="bg-[#F3F3F3] p-5">
        <div className="grid grid-cols-2 h-[calc(100vh-50px)]">
          <div className="col-span-1">
            <div className="mx-auto max-w-md w-11/12 h-full content-center">
              <div className="icn flex justify-center">
                <span>
                  <RevisionBee/>
                </span>
              </div>
              <div className="hed my-3.5 text-center">
                <h1 className="text-3xl font-bold text-center mb-2">
                  Welcome to Revision Bee
                </h1>
                <p className="text-[#505050] text-sm">
                  Master your exams with smart, simple, and engaging revision
                  tools and tips
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
                  <div className="flex justify-between items-center mb-8">
                    <div className="chk flex gap-1.5">
                      <input
                        className="size-5 accent-blue bg-transparent rounded-xl"
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      />
                      <label
                        htmlFor="vehicle1"
                        className="text-[#0B0B0B] font-light text-sm"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="lnk">
                      <Link
                        href="/forget-password"
                        className="text-[#53A2EB] font-medium"
                      >
                        Forgot password?
                      </Link>
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
                        href="/signup"
                      >
                        Sign Up
                      </Link>{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="img relative rounded-xl border-2 border-white flex overflow-hidden log_bg h-full bg-no-repeat bg-cover bg-center">
              {/* <Image className="object-cover w-full h-full" src={LogBg} alt="log in" />*/}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
