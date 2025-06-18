import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { SelectTopics } from "@/features/quiz-list/components/get-topics";

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
        className="py-20 md:px-0 px-10 mths_bg relative 2xl:px-0 lg:px-20"
      >
        <div className="container mx-auto relative">
          <SelectTopics />
        </div>
      </section>
    </>
  );
}
// SelectTopics;
