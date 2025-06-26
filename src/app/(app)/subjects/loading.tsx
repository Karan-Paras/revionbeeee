import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { paths } from "@/routes";

export default function SubjectDetailsLoading() {
  const breadcrumbs = [
    {
      label: "Home",
      href: paths.dashboard(),
    },
    {
      label: "Subjects",
      href: paths.subjects(),
    },
    {
      label: "Loading...",
      href: "#",
    },
  ];

  return (
    <>
      <BreadcrumbBanner title="Loading..." breadcrumbs={breadcrumbs} />
      <DataLoader />
    </>
  );
}
