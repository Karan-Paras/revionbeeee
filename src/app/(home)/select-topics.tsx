import { DataLoader } from "@/components/loaders/data-loader";
import { SelectTopics as SelectTopicsComponent } from "@/features/subjects/components/select-topics";
import type { Topic } from "@/features/subjects/types";
import api from "@/lib/api";
import { MoveUpRight } from "@/lib/icons";
import { paths } from "@/routes";
import Link from "next/link";
import { Suspense, use } from "react";

async function getTopics() {
  const apiUrl = "/topic/list";
  return await api<Array<Topic>>(apiUrl, "GET");
}

function TopicsList() {
  const topics = use(getTopics());
  return <SelectTopicsComponent maxLength={6} initialData={topics} />;
}

export function SelectTopics() {
  return (
    <section
      id={paths.home.topics().split("#")[1]}
      className="mths_bg relative px-10 py-20 xl:px-20 2xl:px-0"
    >
      <div className="relative container mx-auto">
        <div className="mb:mb-8 mb-5 flex flex-wrap justify-between gap-7 md:flex-nowrap lg:gap-4">
          <div className="hed">
            <div className="itm mb-5 flex items-center gap-1.5 capitalize">
              <p className="text-[#53A2EB]">Select your Subject</p>
            </div>
            <h2 className="text-4xl font-bold">Select Your Topics!</h2>
          </div>
          <div className="btn">
            <Link
              href={paths.subjects()}
              className="group flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#53A2EB] px-6 py-4 font-semibold text-[#53A2EB] hover:bg-[#53A2EB] hover:text-white"
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
        <Suspense fallback={<DataLoader />}>
          <TopicsList />
        </Suspense>
      </div>
    </section>
  );
}
