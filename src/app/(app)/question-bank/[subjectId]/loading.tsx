import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { paths } from "@/routes";

export default function QuestionBankLoading() {
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
    {
      label: "Question Bank",
      href: paths.questionBank("#"),
    },
  ];

  return (
    <>
      <BreadcrumbBanner title="Question Bank" breadcrumbs={breadcrumbs} />
      <DataLoader />
    </>
  );
}
