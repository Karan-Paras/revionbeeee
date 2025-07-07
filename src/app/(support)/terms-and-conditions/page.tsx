import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { TermsAndConditions } from "@/features/support/components/terms-and-conditions";
import { paths } from "@/routes";

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
