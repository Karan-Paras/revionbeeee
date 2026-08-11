import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { MyLessonsList } from "@/features/lessons/components/my-lessons-list";
import { paths } from "@/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Lessons - Revision Bee",
  description: "Review your upcoming and requested lessons.",
  robots: { index: false, follow: false },
};

export default function MyLessonsPage() {
  return (
    <>
      <BreadcrumbBanner
        title="My Lessons"
        breadcrumbs={[
          { label: "Home", href: paths.dashboard() },
          { label: "My Lessons", href: paths.myLessons() },
        ]}
      />
      <MyLessonsList />
    </>
  );
}
