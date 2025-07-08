import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { TermsAndConditions } from "@/features/support/components/terms-and-conditions";
import { paths } from "@/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Revision Bee",
  description:
    "Review our platform terms, user agreement, and service conditions.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Terms & Conditions"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "Terms & Conditions",
            href: paths.termsAndConditions(),
          },
        ]}
      />
      <TermsAndConditions />
    </>
  );
}
