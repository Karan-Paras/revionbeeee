import { AboutUs } from "@/app/(studentModule)/(app)/accounts/settings/about-us";
import {
  SettingsTab,
  TabDefinition,
} from "@/app/(studentModule)/(app)/accounts/settings/settings-tab";
import { TermsAndPolicy } from "@/app/(studentModule)/(app)/accounts/settings/terms-and-policy";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { ContactUsForm } from "@/features/support/components/contact-us-form";
import { paths } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - Revision Bee",
  description: "Customize your account settings and preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

const TABS: TabDefinition[] = [
  {
    key: "changePassword",
    label: "Change Password",
    content: <ChangePasswordForm />,
  },
  {
    key: "aboutUs",
    label: "About Us",
    content: <AboutUs />,
  },
  {
    key: "contactUs",
    label: "Contact Us",
    content: <ContactUsForm />,
  },
  {
    key: "termsAndPolicy",
    label: "Terms & Policy",
    content: <TermsAndPolicy />,
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
