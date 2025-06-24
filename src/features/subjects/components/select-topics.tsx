"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { DataLoader } from "@/components/loaders/data-loader";
import { useGetTopics } from "@/features/subjects/queries/use-get-topics";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";

import { ChevronRight } from "@/lib/icons";

import { paths } from "@/routes";

import type { ID } from "@/types/globals";

interface SelectTopicsProps {
  maxLength?: number;
  href?: (subjectId: ID) => string;
}

export function SelectTopics({
  maxLength,
  href = paths.subjectDetails,
}: SelectTopicsProps) {
  const { data, isPending, error } = useGetTopics();

  const { setActiveSubject } = useActiveSubjectStore();

  const router = useRouter();

  const onSubjectClick = (
    topicId: ID,
    topicName: string,
    subjectName: string
  ) => {
    setActiveSubject(topicName, subjectName);
    router.push(href(topicId));
  };

  if (isPending) {
    return <DataLoader />;
  }

  if (error) {
    toast.error(error.message);
  }

  if (data) {
    let topics = data.data || [];

    if (maxLength && topics.length > maxLength) {
      topics = topics.slice(0, maxLength);
    }

    return (
      <div className="grid grid-cols-3 gap-4 xl:gap-7">
        {topics?.map(({ id, subjects, topicName }) => (
          <div key={id} className="col-span-3 md:col-span-1">
            <div className="itm rounded-xl bg-white p-2 shadow-xl">
              <div className="hed min-h-24 content-center rounded-xl bg-[#F5F5F5] px-5 text-center">
                <h3 className="font-bold lg:text-xl xl:text-2xl">
                  {topicName}
                </h3>
              </div>
              <ul className="max-h-[410px] min-h-[400px] overflow-y-auto">
                {subjects && subjects.length > 0 ? (
                  subjects?.map(({ id, subjectName }) => (
                    <li
                      key={id}
                      className="flex items-center justify-between border-b border-[#DEDEDE] p-5"
                    >
                      <button
                        className="flex w-full cursor-pointer items-center justify-between"
                        onClick={() =>
                          onSubjectClick(id, topicName, subjectName)
                        }
                      >
                        <p className="font-semibold uppercase">{subjectName}</p>
                        <span>
                          <ChevronRight />
                        </span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-md mt-3 content-center p-1 text-center text-gray-500">
                    No subjects available
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <p>No topics found.</p>;
}
