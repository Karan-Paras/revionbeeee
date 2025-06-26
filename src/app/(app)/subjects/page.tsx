import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { SelectTopics } from "@/features/subjects/components/select-topics";
import { paths } from "@/routes";

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
          <SelectTopics />
        </div>
      </section>
    </>
  );
}
