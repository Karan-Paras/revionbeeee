"use client";

import { DataLoader } from "@/components/loaders/data-loader";
import { useGetTopics } from "@/features/subjects/queries/use-get-topics";
import { cn } from "@/lib/utils";
import type { ID } from "@/types/globals";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  selectedTopicId: ID | null;
  setSelectedTopicId: React.Dispatch<React.SetStateAction<ID | null>>;
}

export function SelectLevel({ selectedTopicId, setSelectedTopicId }: Props) {
  const { data, isPending, error } = useGetTopics();

  useEffect(() => {
    if (data?.data && !selectedTopicId) {
      setSelectedTopicId(data.data[0]?.id || null);
    }
  }, [
    data,
    selectedTopicId,
    setSelectedTopicId, // No need for this, this is from setState
  ]);

  return (
    <div className="col-span-12 lg:col-span-4 md:col-span-5">
      <div className="lvl">
        <div className="h-[90vh] overflow-y-auto rounded-2xl border border-[#CECECE] bg-white px-5 py-6">
          <h3 className="mb-3.5 text-xl font-bold">Select From Level</h3>
          {(() => {
            if (isPending) {
              return <DataLoader />;
            }

            if (error) {
              toast.error(error.message);
            }
            if (data) {
              const topics = data.data || [];
              return (
                <ul className="trc_itm">
                  {topics.map(({ topicName, id }, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedTopicId(id);
                      }}
                      className={cn(
                        "mb-5 flex cursor-pointer items-center justify-between rounded-lg border px-5 py-3 font-medium transition-all duration-150",
                        selectedTopicId === id
                          ? "active border-[#53A2EB] bg-white text-[#53A2EB]"
                          : "border-transparent bg-[#FBFBFB] text-[#505050]"
                      )}
                    >
                      {topicName}
                    </li>
                  ))}
                </ul>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
}
