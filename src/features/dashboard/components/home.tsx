"use client";

import { useHomeTopics } from "@/features/dashboard/queries/use-home";
import { ClockFading, HelpLightBulb, SyncCheck } from "@/lib/icons";

export function Home() {
  const { data } = useHomeTopics();

  return (
    <div className="grid grid-cols-3 gap-8 rounded-xl bg-white p-8">
      <div className="col-span-3">
        <h3 className="border-b border-[#D9D9D9] pb-3 text-2xl font-semibold text-[#505050]">
          Dashboard
        </h3>
      </div>
      <div className="col-span-3 md:col-span-1">
        <div className="grid min-h-80 content-center justify-items-center gap-4 rounded-2xl border border-dashed border-[#53A2EB] bg-[#F2F9FF]">
          <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-white">
            <HelpLightBulb />
          </div>
          <div className="desc text-center">
            <h3 className="mb-2.5 text-4xl font-bold">
              {data?.data?.totalQuizzes}
            </h3>
            <p className="text-xl font-light">Total Quiz</p>
          </div>
        </div>
      </div>
      <div className="col-span-3 md:col-span-1">
        <div className="grid min-h-80 content-center justify-items-center gap-4 rounded-2xl border border-dashed border-[#FBBE1B] bg-[#FFFAEB]">
          <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-white">
            <ClockFading />
          </div>
          <div className="desc text-center">
            <h3 className="mb-2.5 text-4xl font-bold">
              {data?.data?.overallProgress}
            </h3>
            <p className="text-xl font-light">In Progress Topics</p>
          </div>
        </div>
      </div>
      <div className="col-span-3 md:col-span-1">
        <div className="grid min-h-80 content-center justify-items-center gap-4 rounded-2xl border border-dashed border-[#13C38B] bg-[#EFFFFA]">
          <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-white">
            <SyncCheck />
          </div>
          <div className="desc text-center">
            <h3 className="mb-2.5 text-4xl font-bold">
              {data?.data?.topicsCompleted}
            </h3>
            <p className="text-xl font-light">Completed Topics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
