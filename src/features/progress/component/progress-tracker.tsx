"use client";

import { useGetStudentProgress } from "../queries/use-get-student-progress";

export function ProgressTracker() {
  // let { subjectId } = useParams();
  // subjectId = subjectId?.toString?.() ?? "";

  const { data } = useGetStudentProgress("20");
  console.log(data, "student progress data");
  return (
    <>
      <div className="md:col-span-9 col-span-12">
        <div className="p-8 border border-[#CECECE] rounded-2xl bg-white">
          <h3 className="font-bold text-xl mb-3.5">Progress Tracker</h3>
          <div className="itm border border-[#E0E0E0] p-5 rounded-xl mb-4">
            <div className="grid grid-cols-12 gap-4 justify-between items-end">
              <div className="md:col-span-11 col-span-9">
                <h2>Number & Algebra</h2>
                <div className="prog relative">
                  <div className="absolute w-[75%] bg-[#FBBE1B] top-0 left-0 right-0 bottom-0 z-10 rounded-xl h-full"></div>
                  <div className="w-full relative bg-[#F4F4F4] h-2 mt-3.5 rounded-xl"></div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-3">
                <div className="pro_load text-center">
                  <h4 className="font-bold lg:text-2xl text-xl">75%</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="itm border border-[#E0E0E0] p-5 rounded-xl mb-4">
            <div className="grid grid-cols-12 gap-4 justify-between items-end">
              <div className="md:col-span-11 col-span-9">
                <h2>Functions</h2>
                <div className="prog relative">
                  <div className="absolute w-[60%] bg-[#FBBE1B] top-0 left-0 right-0 bottom-0 z-10 rounded-xl h-full"></div>
                  <div className="w-full relative bg-[#F4F4F4] h-2 mt-3.5 rounded-xl"></div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-3">
                <div className="pro_load text-center">
                  <h4 className="font-bold lg:text-2xl text-xl">60%</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="itm border border-[#E0E0E0] p-5 rounded-xl mb-4">
            <div className="grid grid-cols-12 gap-4 justify-between items-end">
              <div className="md:col-span-11 col-span-9">
                <h2>Geometry & Trigonometry</h2>
                <div className="prog relative">
                  <div className="absolute w-[22%] bg-[#FBBE1B] top-0 left-0 right-0 bottom-0 z-10 rounded-xl h-full"></div>
                  <div className="w-full relative bg-[#F4F4F4] h-2 mt-3.5 rounded-xl"></div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-3">
                <div className="pro_load text-center">
                  <h4 className="font-bold lg:text-2xl text-xl">22%</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="itm border border-[#E0E0E0] p-5 rounded-xl mb-4">
            <div className="grid grid-cols-12 gap-4 justify-between items-end">
              <div className="md:col-span-11 col-span-9">
                <h2>Statistics & Probability</h2>
                <div className="prog relative">
                  <div className="absolute w-[80%] bg-[#FBBE1B] top-0 left-0 right-0 bottom-0 z-10 rounded-xl h-full"></div>
                  <div className="w-full relative bg-[#F4F4F4] h-2 mt-3.5 rounded-xl"></div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-3">
                <div className="pro_load text-center">
                  <h4 className="font-bold lg:text-2xl text-xl">80%</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="itm border border-[#E0E0E0] p-5 rounded-xl mb-4">
            <div className="grid grid-cols-12 gap-4 justify-between items-end">
              <div className="md:col-span-11 col-span-9">
                <h2>Calculus</h2>
                <div className="prog relative">
                  <div className="absolute w-[12%] bg-[#FBBE1B] top-0 left-0 right-0 bottom-0 z-10 rounded-xl h-full"></div>
                  <div className="w-full relative bg-[#F4F4F4] h-2 mt-3.5 rounded-xl"></div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-3">
                <div className="pro_load text-center">
                  <h4 className="font-bold lg:text-2xl text-xl">12%</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
