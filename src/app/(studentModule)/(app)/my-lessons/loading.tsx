import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { paths } from "@/routes";

export default function MyLessonsLoading() {
  return (
    <>
      <BreadcrumbBanner
        title="My Lessons"
        breadcrumbs={[
          { label: "Home", href: paths.dashboard() },
          { label: "My Lessons", href: paths.myLessons() },
        ]}
      />
      <DataLoader />
    </>
  );
}
