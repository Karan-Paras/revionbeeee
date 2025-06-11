"use client";

import { ClockFading, HelpLightBulb, SyncCheck } from "@/lib/icons";
import { useHomeTopics } from "../queries/use-home";

export function Home() {
  const { data } = useHomeTopics();
  console.log(data?.data, "home data");
  return (
    <div className="grid grid-cols-3 p-8 bg-white rounded-xl gap-8">
      <div className="col-span-3">
        <h3 className="font-semibold text-[#505050] text-2xl pb-3 border-b border-[#D9D9D9]">
          Dashboard
        </h3>
      </div>
      <div className="md:col-span-1 col-span-3">
        <div className="border-dashed border border-[#53A2EB] bg-[#F2F9FF] rounded-2xl grid content-center justify-items-center gap-4 min-h-80">
          <div className="size-32 rounded-full overflow-hidden bg-white flex justify-center items-center">
            <HelpLightBulb />
          </div>
          <div className="desc text-center">
            <h3 className="font-bold text-4xl mb-2.5">
              {data?.data?.totalQuizzes}
            </h3>
            <p className="text-xl font-light">Total Quiz</p>
          </div>
        </div>
      </div>
      <div className="md:col-span-1 col-span-3">
        <div className="border-dashed border border-[#FBBE1B] bg-[#FFFAEB] rounded-2xl grid content-center justify-items-center gap-4 min-h-80">
          <div className="size-32 rounded-full overflow-hidden bg-white flex justify-center items-center">
            <ClockFading />
          </div>
          <div className="desc text-center">
            <h3 className="font-bold text-4xl mb-2.5">
              {data?.data?.overallProgress}
            </h3>
            <p className="text-xl font-light">In Progress Topics</p>
          </div>
        </div>
      </div>
      <div className="md:col-span-1 col-span-3">
        <div className="border-dashed border border-[#13C38B] bg-[#EFFFFA] rounded-2xl grid content-center justify-items-center gap-4 min-h-80">
          <div className="size-32 rounded-full overflow-hidden bg-white flex justify-center items-center">
            <SyncCheck />
          </div>
          <div className="desc text-center">
            <h3 className="font-bold text-4xl mb-2.5">
              {data?.data?.topicsCompleted}
            </h3>
            <p className="text-xl font-light">Completed Topics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
