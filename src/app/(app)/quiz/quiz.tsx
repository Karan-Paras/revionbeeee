"use client";

import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { SelectTopics } from "@/features/subjects/components/select-topics";
import { paths } from "@/routes";

export default function Quiz() {
  return (
    <>
      <BreadcrumbBanner
        title="Quiz"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.dashboard(),
          },
          {
            label: "Quiz",
            href: paths.quiz(),
          },
        ]}
      />
      <section
        id="topics"
        className="mths_bg relative px-10 2xl:py-20 py-10 md:px-0 lg:px-20 2xl:px-0"
      >
        <div className="relative container mx-auto">
          <SelectTopics href={paths.quizDetails} />
        </div>
      </section>
    </>
  );
}
