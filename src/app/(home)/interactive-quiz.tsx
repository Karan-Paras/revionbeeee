import { HeroImg, Lft, LogBg, ProfileJordan, Sub, SubTwo } from "@/lib/assets";
import { Certificate, LaptopUser, LibraryBig, MessageStar } from "@/lib/icons";
import { paths } from "@/routes";
import Image from "next/image";

const AVATAR_STACK = [ProfileJordan, LogBg, Lft, HeroImg];

export function InteractiveQuiz() {
  return (
    <section
      id={paths.home.aboutUs().split("#")[1]}
      className="relative px-10 py-20 xl:px-20 2xl:px-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-2 md:col-span-2 xl:col-span-1">
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
                    <div className="2xl:col-span-1 lg:col-span-2 col-span-2 justify-center text-center md:text-left flex items-center">
                      {AVATAR_STACK.map((img, index) => (
                        <div
                          key={index}
                          className="itm -ms-3 inline-flex size-12 overflow-hidden rounded-full border-4 border-[#fff]"
                        >
                          <Image src={img} alt={`avatar-${index}`} />
                        </div>
                      ))}
                      <div className="itm -ms-3 inline-flex size-12 overflow-hidden rounded-full border-4 border-white bg-[#53A2EB]">
                        <div className="bg-muted flex h-full w-full items-center justify-center rounded-full font-bold text-white">
                          65+
                        </div>
                      </div>
                    </div>
                    <div className="2xl:col-span-1 lg:col-span-2 col-span-2 md:text-left ">
                      <h3 className="text-xl font-bold 2xl:text-start xl:text-center text-center">
                        Top-Students
                      </h3>
                      <p className="2xl:text-start xl:text-center text-center">
                        All Over the words
                      </p>
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
          <div className="col-span-2 md:col-span-2 xl:col-span-1">
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
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-2 xl:text-5xl mb-4">
                      70+
                    </h4>
                    <h6 className="font-semibold text-xl">Subjects Covered</h6>
                    <p>
                      Our platform offers quizzes in more than 70 subjects to
                      support comprehensive learning at all levels.
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
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-2 xl:text-5xl mb-4">
                      9/10
                    </h4>
                    <h6 className="font-semibold text-xl">
                      Student Satisfaction
                    </h6>
                    <p>
                      Students consistently rate our quizzes highly for being
                      fun, helpful, and easy to follow.
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
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-2 xl:text-5xl mb-4">
                      95%
                    </h4>
                    <h6 className="font-semibold text-xl">
                      Improved Understanding
                    </h6>
                    <p>
                      The majority of learners report better comprehension after
                      using our interactive quizzes.
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
                    <h4 className="font-bold lg:mb-2 lg:text-4xl xl:mb-2 xl:text-5xl mb-4">
                      40k
                    </h4>
                    <h6 className="font-semibold text-xl">Learners</h6>
                    <p>
                      Over 40,000 students have joined and benefited from our
                      growing learning community.
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
