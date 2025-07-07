import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { PrivacyPolicy } from "@/features/support/components/privacy-policy";
import { paths } from "@/routes";

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Privacy Policy"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "Privacy Policy",
            href: paths.privacyPolicy(),
          },
        ]}
      />
      <PrivacyPolicy />
    </>
  );
}
