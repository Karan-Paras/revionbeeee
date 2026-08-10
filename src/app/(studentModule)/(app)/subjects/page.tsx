import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { SelectSubjects } from "@/features/subjects/components/select-subjects";
import { paths } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subjects - Revision Bee",
  description: "Browse all subjects to start revising efficiently.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Subjects() {
  return (
    <>
      <BreadcrumbBanner
        title="Subjects"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.dashboard(),
          },
          {
            label: "Subjects",
            href: paths.subjects(),
          },
        ]}
      />
      <section
        id="topics"
        className="mths_bg relative px-10 py-20 md:px-0 lg:px-20 2xl:px-0"
      >
        <div className="relative container mx-auto">
          <SelectSubjects />
        </div>
      </section>
    </>
  );
}
