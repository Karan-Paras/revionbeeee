"use client";

import { NoData } from "@/lib/assets";
import Image from "../../../../node_modules/next/image";
import { useGetStudentProgress } from "../queries/use-get-student-progress";

interface Props {
  topicId: string | null;
}

export function ProgressTracker({ topicId }: Props) {
  // let { subjectId } = useParams();
  // subjectId = subjectId?.toString?.() ?? "";

  const { data } = useGetStudentProgress(topicId || "");
  console.log(data?.data, "student progress data");

  if (!topicId) return <div className="md:col-span-9">Loading topic...</div>;
  return (
    <>
      <div className="md:col-span-8 col-span-12 ">
        <div className="p-8 border border-[#CECECE] rounded-2xl bg-white h-[90vh] overflow-y-auto">
          <h3 className="font-bold text-xl mb-3.5">Progress Tracker</h3>

          {Array.isArray(data?.data) && data?.data?.length > 0 ? (
            data?.data?.map(({ subjectName, progress }, index) => {
              const progressValue = parseInt(progress.replace("%", ""));
              let progressColor = "#FBBE1B";
              if (progressValue < 30) progressColor = "#F87171";
              else if (progressValue < 70) progressColor = "#FBBE1B";
              else progressColor = "#34D399";

              return (
                <div
                  key={index}
                  className="itm border border-[#E0E0E0] p-5 rounded-xl mb-4"
                >
                  <div className="grid grid-cols-12 gap-4 justify-between items-end">
                    <div className="md:col-span-11 col-span-9">
                      <h2>{subjectName}</h2>
                      <div className="prog relative">
                        <div
                          className="absolute w-[75%] bg-[#FBBE1B] top-0 left-0 
                  right-0 bottom-0 z-10 rounded-xl h-full"
                          style={{
                            width: `${progressValue}%`,
                            backgroundColor: progressColor,
                            transition: "width 0.3s ease",
                          }}
                        ></div>
                        <div className="w-full relative bg-[#F4F4F4] h-2 mt-3.5 rounded-xl"></div>
                      </div>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                      <div className="pro_load text-center">
                        <h4 className="font-bold lg:text-2xl text-xl">
                          {progress}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center align-center justify-center flex-col relative">
              <Image src={NoData} alt="" height={300} width={300}></Image>
              <h3 className="text-3xl font-medium">No Data Found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
