import { Lft, Sub, SubTwo } from "@/lib/assets";
import { Certificate, LaptopUser, LibraryBig, MessageStar } from "@/lib/icons";
import { paths } from "@/routes";
import Image from "next/image";

export function InteractiveQuiz() {
  return (
    <section
      id={paths.home.aboutUs().split("#")[1]}
      className="relative px-10 py-20 xl:px-20 2xl:px-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap">
              <div className="lft flex w-full flex-col justify-center gap-5 md:w-6/12">
                <div className="img h-80 overflow-hidden rounded-xl">
                  <Image
                    className="h-full w-full object-cover"
                    src={Lft}
                    alt=""
                  />
                </div>
                <div className="rounded-xl border border-[#DFDFDF] px-7 lg:p-3 2xl:p-4">
                  <div className="grid grid-cols-2">
                    <div className="col-span-2 text-center md:text-left xl:col-span-1">
                      <div className="itm -ms-3 inline-flex size-12 overflow-hidden rounded-full border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                      <div className="itm -ms-3 inline-flex size-12 overflow-hidden rounded-full border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                      <div className="itm -ms-3 inline-flex size-12 overflow-hidden rounded-full border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                      <div className="itm -ms-3 inline-flex size-12 overflow-hidden rounded-full border-4 border-[#fff]">
                        <Image src={Lft} alt="" />
                      </div>
                    </div>
                    <div className="col-span-2 text-center md:text-left xl:col-span-1">
                      <h3 className="text-xl font-bold">Top -Students</h3>
                      <p>All Over the words</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rft flex w-full flex-col gap-4 md:w-6/12">
                <div className="img h-80 overflow-hidden rounded-xl">
                  <Image
                    className="h-full w-full object-cover"
                    src={Sub}
                    alt=""
                  />
                </div>
                <div className="img h-80 overflow-hidden rounded-xl">
                  <Image
                    className="h-full w-full object-cover"
                    src={SubTwo}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="itm flex items-center gap-1.5">
              <p className="text-[#53A2EB] capitalize">
                Flexible supported learning
              </p>
            </div>
            <div className="hed">
              <h3 className="mb-3 text-3xl font-bold lg:text-4xl lg:leading-10 xl:text-5xl xl:leading-normal 2xl:text-6xl">
                Interactive Quizzes for Curious Young Minds
              </h3>
              <p className="text-base leading-10 font-light text-[#505050] lg:text-base lg:leading-7 2xl:text-lg">
                Engage students with fun, educational quizzes designed to spark
                curiosity, reinforce learning, and build confidence across a
                wide range of subjects and grade levels.
              </p>
            </div>
            <div className="my-7 grid grid-cols-2 gap-7">
              <div className="col-span-2 md:col-span-1">
                <div className="flex gap-4">
                  <div className="itm">
                    <LibraryBig />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-4 xl:text-5xl">
                      70+
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex gap-4">
                  <div className="itm">
                    <MessageStar />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-4 xl:text-5xl">
                      9/10
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex gap-4">
                  <div className="itm">
                    <LaptopUser />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-4 xl:text-5xl">
                      95%
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex gap-4">
                  <div className="itm">
                    <Certificate />
                  </div>
                  <div className="desc">
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-4 xl:text-5xl">
                      40k
                    </h4>
                    <p>
                      Metus dictum at tempor commodo ullamcorper a lacus
                      vestibulum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
