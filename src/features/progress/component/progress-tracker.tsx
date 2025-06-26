"use client";

import { ApiError } from "@/components/errors/api-error";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetProgress } from "@/features/progress/queries/use-get-progress";
import type { ID } from "@/types/globals";

interface Props {
  topicId: ID | null;
}

export function ProgressTracker({ topicId }: Props) {
  const { data, isLoading, error } = useGetProgress(topicId);

  return (
    <div className="col-span-12 md:col-span-8">
      <div className="h-[90vh] overflow-y-auto rounded-2xl border border-[#CECECE] bg-white p-8">
        <h3 className="mb-3.5 text-xl font-bold">Progress Tracker</h3>

        {(() => {
          if (isLoading) {
            return <DataLoader />;
          }

          if (error) {
            return <ApiError error={error.message} />;
          }

          if (data) {
            const progressData = data.data || [];
            return progressData.map(({ subjectName, progress }, index) => {
              const progressValue = +progress.replace("%", "");
              const progressColor =
                progressValue > 0 ? "#FBBE1B" : "transparent";

              return (
                <div
                  key={index}
                  className="itm mb-4 rounded-xl border border-[#E0E0E0] p-5"
                >
                  <div className="grid grid-cols-12 items-end justify-between gap-4">
                    <div className="col-span-9 md:col-span-11">
                      <h2>{subjectName}</h2>
                      <div className="prog relative">
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 z-10 h-full w-[75%] rounded-xl bg-[#FBBE1B]"
                          style={{
                            width: `${progressValue}%`,
                            backgroundColor: progressColor,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="relative mt-3.5 h-2 w-full rounded-xl bg-[#F4F4F4]" />
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <div className="pro_load text-center">
                        <h4 className="text-xl font-bold lg:text-2xl">
                          {progress}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          }
        })()}
      </div>
    </div>
  );
}
