import Link from "next/link";

import { SelectTopics as SelectTopicsComponent } from "@/features/subjects/components/select-topics";

import { MoveUpRight } from "@/lib/icons";

import { paths } from "@/routes";

export function SelectTopics() {
  return (
    <section
      id="topics"
      className="py-20 mths_bg relative 2xl:px-0 xl:px-20 px-10"
    >
      <div className="container mx-auto relative">
        <div className="flex mb:mb-8 mb-5 lg:gap-4 gap-7 justify-between md:flex-nowrap flex-wrap">
          <div className="hed">
            <div className="itm mb-5 flex items-center gap-1.5 capitalize">
              {/* <span>
                <Minus width={42} height={2} color="#53A2EB" />
              </span> */}
              <p className="text-[#53A2EB]">Select your Subject</p>
            </div>
            <h2 className="text-4xl font-bold">Select Your Topics!</h2>
          </div>
          <div className="btn">
            <Link
              href={paths.subjects()}
              className="border-[#53A2EB] text-[#53A2EB] font-semibold flex gap-2 items-center rounded-xl border-2 px-6 py-4 cursor-pointer hover:bg-[#53A2EB] hover:text-white group"
            >
              Browse all Subjects
              <MoveUpRight
                width={14}
                height={14}
                color="#53A2EB"
                className="group-hover:fill-[#fff]"
              />
            </Link>
          </div>
        </div>
        <SelectTopicsComponent maxLength={6} />
      </div>
    </section>
  );
}
