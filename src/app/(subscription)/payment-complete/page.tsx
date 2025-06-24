import Image from "next/image";
import Link from "next/link";

import { PassChng } from "@/lib/assets";

import { paths } from "@/routes";

export default function PaymentComplete() {
  return (
    <section className="mths_bg h-screen bg-cover bg-no-repeat p-5">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="relative m-auto w-11/12 max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
            <div className="img flex justify-center">
              <Image src={PassChng} alt="" />
            </div>
            <div className="desc my-5 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                Payment Method
              </h3>
              <p className="text-sm font-light text-[#6C6C6C]">
                Payment has been done for purchasing subscription plan
              </p>
              <p className="mt-5 text-xl font-bold text-[#6C6C6C]">$130 </p>
            </div>
            <div className="btn">
              <Link href={paths.dashboard()}>
                <button className="w-full cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
