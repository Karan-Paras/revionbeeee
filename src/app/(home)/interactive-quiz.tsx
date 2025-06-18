import Image from "next/image";

import { Lft, Sub, SubTwo } from "@/lib/assets";
import {
  Certificate,
  LaptopUser,
  LibraryBig,
  MessageStar,
  MoveUpRight,
} from "@/lib/icons";

export function InteractiveQuiz() {
  return (
    <section id="about" className="py-20 px-10 relative 2xl:px-0 xl:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-10">
          <div className="lg:col-span-1 md:col-span-2 col-span-2">
            <div className="flex justify-center gap-4 md:flex-nowrap flex-wrap">
              <div className="lft md:w-6/12 w-full gap-5 flex flex-col justify-center">
                <div className="img h-80 overflow-hidden rounded-xl">
                  <Image
                    className="w-full h-full object-cover"
                    src={Lft}
                    alt=""
                  />
                </div>
                <div className="border rounded-xl border-[#DFDFDF] 2xl:p-4 lg:p-3 px-7">
                  <div className="grid grid-cols-2">
                    <div className="xl:col-span-1 col-span-2 md:text-left text-center ">
                      <div className="itm size-12 rounded-full overflow-hidden inline-flex -ms-3 border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                      <div className="itm size-12 rounded-full overflow-hidden inline-flex -ms-3 border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                      <div className="itm size-12 rounded-full overflow-hidden inline-flex -ms-3 border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                      <div className="itm size-12 rounded-full overflow-hidden inline-flex -ms-3 border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                    </div>
                    <div className="xl:col-span-1 col-span-2 md:text-left text-center">
                      <h3 className="text-xl font-bold">Top -Students</h3>
                      <p>All Over the words</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rft md:w-6/12 w-full gap-4 flex flex-col">
                <div className="img h-80 overflow-hidden rounded-xl">
                  <Image
                    className="w-full h-full object-cover"
                    src={Sub}
                    alt=""
                  />
                </div>
                <div className="img h-80 overflow-hidden rounded-xl">
                  <Image
                    className="w-full h-full object-cover"
                    src={SubTwo}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 md:col-span-2 col-span-2">
            <div className="itm flex items-center gap-1.5">
              {/* <span>
                <Minus color="#53A2EB" />
              </span> */}
              <p className="text-[#53A2EB] capitalize">
                Flexible supported learning
              </p>
            </div>
            <div className="hed">
              <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl text-3xl font-bold xl:leading-normal lg:leading-10 mb-3">
                Interactive Quizzes for Curious Young Minds
              </h3>
              <p className="text-[#505050] leading-10 lg:leading-7 2xl:text-lg lg:text-base text-base font-light">
                Engage students with fun, educational quizzes designed to spark
                curiosity, reinforce learning, and build confidence across a
                wide range of subjects and grade levels.
              </p>
            </div>
            <div className="grid grid-cols-2 my-7 gap-7">
              <div className="md:col-span-1 col-span-2">
                <div className="flex gap-4">
                  <div className="itm">
                    <LibraryBig />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold xl:text-5xl lg:text-4xl xl:mb-4 lg:mb-2">
                      70+
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-2">
                <div className="flex gap-4">
                  <div className="itm">
                    <MessageStar />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold xl:text-5xl lg:text-4xl xl:mb-4 lg:mb-2">
                      9/10
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-2">
                <div className="flex gap-4">
                  <div className="itm">
                    <LaptopUser />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold xl:text-5xl lg:text-4xl xl:mb-4 lg:mb-2">
                      95%
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-2">
                <div className="flex gap-4">
                  <div className="itm">
                    <Certificate />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold xl:text-5xl lg:text-4xl xl:mb-4 lg:mb-2">
                      40k
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex justify-center">
                  <button className="border-[#53A2EB] text-[#53A2EB] font-semibold flex gap-2 items-center rounded-xl border-2 px-10 py-4 cursor-pointer hover:bg-[#53A2EB] hover:text-white group">
                    Learn More
                    <MoveUpRight
                      width={14}
                      height={14}
                      color="#53A2EB"
                      className="group-hover:fill-[#fff]"
                    />
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
