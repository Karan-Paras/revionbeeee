import Link from "next/link";

import { ArrowBack } from "@/lib/icons";

import { paths } from "@/routes";

export default function PaymentMethod() {
  return (
    <section className="mths_bg h-screen bg-cover bg-no-repeat p-5">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="relative m-auto w-11/12 max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
            <Link className="" href="/subscription-plans">
              <button className="absolute top-4 left-5 flex items-center gap-1 text-sm">
                <ArrowBack />
                back
              </button>
            </Link>
            <div className="desc my-5 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                Payment Method
              </h3>
              <p className="text-sm font-light text-[#6C6C6C]">
                Please enter your credit/debit card information
              </p>
            </div>
            <div className="frm mt-8">
              <form action="">
                <div className="itm mb-4 flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-normal">
                    Card Holder,s Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#D8DAE5] bg-white px-6 py-5 pe-5 outline-0"
                    placeholder="Enter the name on card"
                  />
                </div>
                <div className="itm mb-4 flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-normal">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#D8DAE5] bg-white px-6 py-5 pe-5 outline-0"
                    placeholder="Enter card number"
                  />
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4.5">
                  <div className="col-span-1">
                    <div className="itm inline-flex w-full flex-col">
                      <label htmlFor="" className="text-sm font-normal">
                        Card Number
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-[#D8DAE5] bg-white px-6 py-5 pe-5 outline-0"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="itm inline-flex w-full flex-col">
                      <label htmlFor="" className="text-sm font-normal">
                        Card Number
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-[#D8DAE5] bg-white px-6 py-5 pe-5 outline-0"
                      />
                    </div>
                  </div>
                </div>
                <div className="itm mt-6 mb-4 text-center">
                  <p className="font-light">
                    Total Amount : <span className="font-semibold"> $130</span>
                  </p>
                </div>
                <div className="mb-4">
                  <Link href={paths.paymentComplete()}>
                    <button className="w-full cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white">
                      Verify
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
