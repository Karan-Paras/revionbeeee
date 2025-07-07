import {
  SettingsTab,
  TabDefinition,
} from "@/app/(app)/accounts/settings/settings-tab";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { AboutUs } from "@/features/support/components/about-us";
import { ContactUsForm } from "@/features/support/components/contact-us-form";
import { PrivacyPolicy } from "@/features/support/components/privacy-policy";
import { TermsAndConditions } from "@/features/support/components/terms-and-conditions";
import { paths } from "@/routes";

const TABS: TabDefinition[] = [
  {
    key: "changePassword",
    label: "Change Password",
    content: <ChangePasswordForm />,
  },
  {
    key: "contactUs",
    label: "Contact Us",
    content: <ContactUsForm />,
  },
  {
    key: "aboutUs",
    label: "About Us",
    content: <AboutUs />,
  },
  {
    key: "privacyPolicy",
    label: "Privacy Policy",
    content: <PrivacyPolicy />,
  },
  {
    key: "termsAndConditions",
    label: "Term & Conditions",
    content: <TermsAndConditions />,
  },
];

export default function Settings() {
  return (
    <div
      id={paths.accounts.settings.scroll().split("#")[1]}
      className="subs rounded-xl bg-white px-7 py-8"
    >
      <h3 className="border-b border-[#D9D9D9] pb-3 text-2xl font-bold text-[#505050]">
        Settings
      </h3>
      <div className="tbs">
        <SettingsTab defaultActiveKey="changePassword" tabs={TABS} />
      </div>
    </div>
  );
}
