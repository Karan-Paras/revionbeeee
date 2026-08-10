import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { AboutUs } from "@/features/support/components/about-us";
import { paths } from "@/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Revision Bee",
  description:
    "Learn about the team behind Revision Bee and our mission to transform online learning.",
};

export default function AboutUsPage() {
  return (
    <>
      <BreadcrumbBanner
        title="About Us"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "About Us",
            href: paths.aboutUs(),
          },
        ]}
      />

      <AboutUs />
    </>
  );
}
