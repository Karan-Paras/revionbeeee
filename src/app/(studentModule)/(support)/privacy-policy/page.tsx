import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { PrivacyPolicy } from "@/features/support/components/privacy-policy";
import { paths } from "@/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Revision Bee",
  description:
    "Read how we protect your data and privacy while using our learning platform.",
};

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
