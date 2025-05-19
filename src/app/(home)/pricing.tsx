import { ListCheck } from "@/lib/icons";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 2xl:px-0 lg:px-20 px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-7">
          <div className="col-span-3">
            <div className="lay md:w-6/12 w-full mx-auto text-center">
              <div className="itm mb-5 flex items-center justify-center gap-1.5">
                <span>
                  <svg width="42" height="2" viewBox="0 0 42 2" fill="none">
                    <rect y="0.5" width="42" height="1" fill="#53A2EB" />
                  </svg>
                </span>
                <p className="text-[#53A2EB]">Select your Subject</p>
              </div>
              <div className="hed">
                <h3 className="md:text-5xl text-3xl font-bold leading-normal">
                  Choose Your <br /> Subscription plan
                </h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 col-span-3">
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
                    Create Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 col-span-3">
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
                        {" "}
                        <ListCheck />
                      </span>{" "}
                      <p className="text-[#505050] ">Proving helpings tips </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        {" "}
                        <ListCheck />
                      </span>{" "}
                      <p className="text-[#505050] ">Cover 10 topic in a day</p>
                    </li>
                  </ul>
                </div>
                <div className="btn mt-14">
                  <button className="bg-[#53A2EB] w-full rounded-xl text-white p-4 font-medium cursor-pointer">
                    Create Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 col-span-3">
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
                        {" "}
                        <ListCheck />
                      </span>{" "}
                      <p className="text-[#505050] ">Unlock 10 questions</p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        {" "}
                        <ListCheck />
                      </span>{" "}
                      <p className="text-[#505050] ">
                        Real time suggest answers{" "}
                      </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        {" "}
                        <ListCheck />
                      </span>{" "}
                      <p className="text-[#505050] ">Proving helpings tips </p>
                    </li>
                    <li className="flex gap-1.5 my-5 items-center">
                      <span>
                        {" "}
                        <ListCheck />
                      </span>{" "}
                      <p className="text-[#505050] ">Cover 10 topic in a day</p>
                    </li>
                  </ul>
                </div>
                <div className="btn mt-14">
                  <button className="bg-[#53A2EB] w-full rounded-xl text-white p-4 font-medium cursor-pointer">
                    Create Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
