import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { paths } from "@/routes";

export default function QuizDetailsLoading() {
  const breadcrumbs = [
    {
      label: "Home",
      href: paths.dashboard(),
    },
    {
      label: "Quiz",
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
