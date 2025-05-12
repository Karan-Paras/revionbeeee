import { Logo } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <>
      <header className="fixed -top-0.5 left-0 right-0 z-[999] p-10 hed_bg">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 items-center relative">
            <div className="col-span-1">
              <div className="img size-32 absolute -left-[87px] flex items-center justify-center">
                <Link className="" href="/">
                  <Image src={Logo} alt="" fill />
                </Link>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex justify-end w-full gap-5 items-center">
                <div className="links ">
                  <ul className="flex gap-7">
                    <li>
                      <Link
                        className="font-medium text-[#505050] hover:text-[#53A2EB]"
                        href=""
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-medium text-[#505050] hover:text-[#53A2EB]"
                        href=""
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-medium text-[#505050] hover:text-[#53A2EB]"
                        href=""
                      >
                        Topics
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-medium text-[#505050] hover:text-[#53A2EB]"
                        href=""
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-medium text-[#505050] hover:text-[#53A2EB]"
                        href=""
                      >
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="btn">
                  <Link
                    href="/login"
                    className="border-2 rounded-xl border-[#53A2EB text-[#53A2EB] px-8 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
                  >
                    Login Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
