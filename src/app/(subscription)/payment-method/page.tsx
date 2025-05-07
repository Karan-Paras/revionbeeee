import { ArrowBack } from "@/lib/icons";
import Link from "next/link";

export default function PaymentMethod() {
  return (
    <>
      <section className="mths_bg p-5 h-screen bg-no-repeat bg-cover ">
        <div className="container mx-auto h-full">
          <div className="grid h-full content-center">
            <div className="max-w-lg w-11/12 m-auto rounded-xl border border-gray-100 shadow-2xl p-8 relative bg-white">
              <Link className="" href="/subscription-plans">
                <button className="absolute top-4 left-5 flex gap-1 items-center text-sm">
                  <ArrowBack />
                  back
                </button>
              </Link>
              <div className="desc text-center my-5">
                <h3 className="text-[#0B0B0B] font-bold text-2xl mb-3">
                  Payment Method
                </h3>
                <p className="text-[#6C6C6C] font-light text-sm">
                  Please enter your credit/debit card information
                </p>
              </div>
              <div className="frm mt-8">
                <form action="">
                  <div className="itm flex flex-col gap-2 mb-4">
                    <label htmlFor="" className="text-sm font-normal">
                      Card Holder,s Name
                    </label>
                    <input
                      type="text"
                      className="bg-white py-5 px-6 border border-[#D8DAE5] pe-5 w-full outline-0 rounded-xl"
                      placeholder="Enter the name on card"
                    />
                  </div>
                  <div className="itm flex flex-col gap-2 mb-4">
                    <label htmlFor="" className="text-sm font-normal">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="bg-white py-5 px-6 border border-[#D8DAE5] pe-5 w-full outline-0 rounded-xl"
                      placeholder="Enter card number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4.5 mb-4">
                    <div className="col-span-1">
                      <div className="itm inline-flex flex-col w-full">
                        <label htmlFor="" className="text-sm font-normal">
                          Card Number
                        </label>
                        <input
                          type="date"
                          className="bg-white py-5 px-6 border border-[#D8DAE5] pe-5 w-full outline-0 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="itm inline-flex flex-col w-full">
                        <label htmlFor="" className="text-sm font-normal">
                          Card Number
                        </label>
                        <input
                          type="date"
                          className="bg-white py-5 px-6 border border-[#D8DAE5] pe-5 w-full outline-0 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="itm text-center mt-6 mb-4">
                    <p className="font-light">
                      Total Amount :{" "}
                      <span className="font-semibold"> $130</span>
                    </p>
                  </div>
                  <div className="mb-4">
                    <Link href="/payment-complete">
                      <button className="bg-[#53A2EB] w-full rounded-xl  text-white p-4 font-medium cursor-pointer">
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
    </>
  );
}
