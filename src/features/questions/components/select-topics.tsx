"use client";

import { DataLoader } from "@/components/loaders/data-loader";
import { useGetTopics } from "@/features/questions/queries/use-get-topics";
import { ChevronRight } from "@/lib/icons";
import Link from "next/link";
import { toast } from "sonner";

export function SelectTopics() {
  const { data, isPending, error } = useGetTopics();

  if (isPending) {
    return <DataLoader />;
  }

  if (error) {
    toast.error(error.message);
  }

  if (data) {
    const topics = data.data;

    return (
      <div className="grid grid-cols-3 gap-7">
        {topics.map(({ id, subjects, topicName }) => (
          <div key={id} className="md:col-span-1 col-span-3">
            <div className="itm p-2 bg-white rounded-xl shadow-xl">
              <div className="hed bg-[#F5F5F5] rounded-xl content-center text-center min-h-24">
                <h3 className="font-bold md:text-2xl text-xl">{topicName}</h3>
              </div>
              <ul>
                {subjects.map(({ id, subjectName }) => (
                  <li
                    key={id}
                    className="flex justify-between border-b border-[#DEDEDE] p-5 items-center"
                  >
                    <Link
                      className="w-full flex items-center justify-between"
                      href="/number-and-algebra/AASL"
                    >
                      <p className="font-semibold uppercase">{subjectName}</p>
                      <span>
                        <ChevronRight color="black" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
