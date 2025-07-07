import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { AboutUs } from "@/features/support/components/about-us";
import { paths } from "@/routes";

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
