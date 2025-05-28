import { ChevronRight, ListCheck } from "@/lib/icons";
import { paths } from "@/routes";
import Link from "next/link";

export default function SubscriptionPlans() {
  return (
    <section className="mths_bg p-5 2xl:h-screen md:min-h-screen bg-no-repeat bg-cover ">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-3 h-full content-center gap-8">
          <div className="col-span-3">
            <div className="hed my-3.5 mb-10 text-center relative">
              <h1 className="text-3xl font-bold text-center mb-2 text-[#000000]">
                Subscription Plans
              </h1>
              <p className="text-[#505050] text-sm">
                Select a subscription plan that best suits your needs.
              </p>
            </div>
          </div>
          <div className="col-span-3 2xl:col-span-1 xl:col-span-1 lg:col-span-1   ">
            <div className="crd border rounded-3xl relative bg-white border-[#D5D5D5] shadow-lg">
              <div className="upr p-6 border-b border-[#D5D5D5]">
                <h3 className="text-2xl text-black font-semibold pb-3.5">
                  Basic Plan
                </h3>
                <p>Best plans for the students</p>
              </div>
              <div className="lwr p-6">
                <div className="flex gap-2.5 items-center">
                  <h4 className="text-3xl font-bold text-black">100 USD</h4>
                  <span className="text-[#9D9D9D] font-normal">Per month</span>
                </div>
                <div className="lst my-8">
                  <ul>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Unlock 10 questions</p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">
                        Real time suggest answers
                      </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Proving helpings tips </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Cover 10 topic in a day</p>
                    </li>
                  </ul>
                </div>
                <div className="btn mt-14">
                  <button className="bg-[#53A2EB] w-full rounded-xl text-white p-4 font-medium cursor-pointer">
                    <Link href={paths.paymentMethod()}>Choose This Plan</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 2xl:col-span-1 xl:col-span-1 lg:col-span-1   ">
            <div className="crd border rounded-3xl relative bg-white border-[#D5D5D5] shadow-lg">
              <div className="upr p-6 border-b border-[#D5D5D5]">
                <h3 className="text-2xl text-black font-semibold pb-3.5">
                  Starter Plan
                </h3>
                <p>Best plans for the students</p>
              </div>
              <div className="lwr p-6">
                <div className="flex gap-2.5 items-center">
                  <h4 className="text-3xl font-bold text-black">130 USD</h4>
                  <span className="text-[#9D9D9D] font-normal">Per month</span>
                </div>
                <div className="lst my-8">
                  <ul>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Unlock 10 questions</p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">
                        Real time suggest answers
                      </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Proving helpings tips </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Cover 10 topic in a day</p>
                    </li>
                  </ul>
                </div>
                <div className="btn mt-14">
                  <button className="bg-[#53A2EB] w-full rounded-xl text-white p-4 font-medium cursor-pointer">
                    <Link href={paths.paymentMethod()}>Choose This Plan</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 2xl:col-span-1 xl:col-span-1 lg:col-span-1   ">
            <div className="crd border rounded-3xl relative bg-white border-[#D5D5D5] shadow-lg">
              <div className="upr p-6 border-b border-[#D5D5D5]">
                <h3 className="text-2xl text-black font-semibold pb-3.5">
                  Advanced Plan
                </h3>
                <p>Best plans for the students</p>
              </div>
              <div className="lwr p-6">
                <div className="flex gap-2.5 items-center">
                  <h4 className="text-3xl font-bold text-black">200 USD</h4>
                  <span className="text-[#9D9D9D] font-normal">Per month</span>
                </div>
                <div className="lst my-8">
                  <ul>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Unlock 10 questions</p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">
                        Real time suggest answers
                      </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Proving helpings tips </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        <ListCheck />
                      </span>
                      <p className="text-[#505050] ">Cover 10 topic in a day</p>
                    </li>
                  </ul>
                </div>
                <div className="btn mt-14">
                  <button className="bg-[#53A2EB] w-full rounded-xl text-white p-4 font-medium cursor-pointer">
                    <Link href={paths.paymentMethod()}>Choose This Plan</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex justify-center relative">
              <Link href={paths.dashboard()}>
                <button className="bg-white ps-10 pe-7 py-4 border border-[#53A2EB] text-[#53A2EB] hover:bg-[#53A2EB] hover:text-[#fff] group font-semibold rounded-xl flex items-center skp_btn cursor-pointer">
                  Skip <ChevronRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
