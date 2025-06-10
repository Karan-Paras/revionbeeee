"use client";

import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { ProgressTracker } from "@/features/progress/component/progress-tracker";
import { SelectLevel } from "@/features/progress/component/select-level";
import { paths } from "@/routes";
import { useState } from "react";

export default function Progress() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  return (
    <>
      <BreadcrumbBanner
        title="Track Progress"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.dashboard(),
          },
          {
            label: "Track Progress",
            href: paths.progress(),
          },
        ]}
      />
      <section className="bg-[#F6F6F6] py-16 md:px-0 px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 md:gap-10 gap-5">
            <SelectLevel setSelectedTopicId={setSelectedTopicId} />

            <ProgressTracker topicId={selectedTopicId} />
          </div>
        </div>
      </section>
    </>
  );
}
