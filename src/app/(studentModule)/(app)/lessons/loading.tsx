import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { paths } from "@/routes";

export default function LessonsLoading() {
  return (
    <>
      <BreadcrumbBanner
        title="Lessons"
        breadcrumbs={[
          { label: "Home", href: paths.dashboard() },
          { label: "Lessons", href: paths.lessons() },
        ]}
      />
      <DataLoader />
    </>
  );
}
