import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { ProgressTracker } from "@/features/progress/component/progress-tracker";
import { SelectLevel } from "@/features/progress/component/select-level";
import { paths } from "@/routes";
import { ID } from "@/types/globals";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Your Progress - Revision Bee",
  description: "Track your learning progress by subject, topic, and quizzes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Progress() {
  const [selectedTopicId, setSelectedTopicId] = useState<ID | null>(null);
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
      <section className="bg-[#F6F6F6] px-10 py-16 md:px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5 lg:gap-10 md:gap-5">
            <SelectLevel
              selectedTopicId={selectedTopicId}
              setSelectedTopicId={setSelectedTopicId}
            />
            <ProgressTracker topicId={selectedTopicId} />
          </div>
        </div>
      </section>
    </>
  );
}
