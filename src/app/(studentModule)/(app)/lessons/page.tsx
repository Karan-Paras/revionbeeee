import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { TeacherList } from "@/features/lessons/components/teacher-list";
import { paths } from "@/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lessons - Revision Bee",
  description: "Browse available teachers and book your next lesson.",
  robots: { index: false, follow: false },
};

export default function LessonsPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Lessons"
        breadcrumbs={[
          { label: "Home", href: paths.dashboard() },
          { label: "Lessons", href: paths.lessons() },
        ]}
      />
      <TeacherList />
    </>
  );
}
