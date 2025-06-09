"use client";

import { useState } from "react";
import { useGetLevelTopics } from "../queries/use-get-level-topics";

export function SelectLevel() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { data } = useGetLevelTopics();
  console.log(data, "topics level data");

  return (
    <>
      <div className="md:col-span-3 col-span-12">
        <div className="lvl">
          <div className="p-6 border border-[#CECECE] rounded-2xl bg-white">
            <h3 className="font-bold text-xl mb-3.5">Select From Level</h3>
            <ul className="trc_itm">
              {data?.data?.map(({ topicName }, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex justify-between items-center 
                      cursor-pointer px-4 py-2 border rounded-lg font-medium mb-5 
                      transition-all duration-150 ${
                        selectedIndex === index
                          ? "border-[#53A2EB] text-[#53A2EB] bg-white active"
                          : "border-transparent text-[#505050] bg-[#FBFBFB]"
                      }`}
                >
                  {topicName}
                </li>
              ))}
              {/*                     
                     <li className="bg-[#FBFBFB] p-3 border-transparent border font-medium text-[#505050] rounded-lg mb-5">
                      AA SL
                    </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
