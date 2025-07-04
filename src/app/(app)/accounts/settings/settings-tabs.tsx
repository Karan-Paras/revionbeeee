"use client";

import { AboutUs } from "@/app/(app)/accounts/settings/about-us";
import { TermsAndPolicy } from "@/app/(app)/accounts/settings/terms-and-policy";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { ContactUsForm } from "@/features/support/components/contact-us-form";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { JSX, useState } from "react";

type Tabs = "changePassword" | "aboutUs" | "contactUs" | "termsAndPolicy";

const tabContent: Record<Tabs, JSX.Element> = {
  changePassword: <ChangePasswordForm />,
  aboutUs: <AboutUs />,
  contactUs: <ContactUsForm />,
  termsAndPolicy: <TermsAndPolicy />,
};

export function SettingsTab() {
  const [activeTab, setActiveTab] = useState<Tabs>("changePassword");

  return (
    <div className="mx-auto mt-10 w-full">
      <div className="flex border-b border-gray-300 md:flex-nowrap flex-wrap md:gap-0 gap-4 md:pb-0 pb-4">
        <button
          onClick={() => setActiveTab("changePassword")}
          className={cn(
            "md:px-4 px-2 py-2 font-medium focus:outline-none md:w-auto w-full md:text-center text-left",
            activeTab === "changePassword"
              ? "border-b-2 border-[#53A2EB] text-[#53A2EB]"
              : "text-gray-500"
          )}
        >
          Change Password
        </button>
        <button
          onClick={() => setActiveTab("aboutUs")}
          className={cn(
            "md:px-4 px-2 py-2 font-medium focus:outline-none md:w-auto w-full md:text-center text-left",
            activeTab === "aboutUs"
              ? "border-b-2 border-[#53A2EB] text-[#53A2EB]"
              : "text-gray-500"
          )}
        >
          About Us
        </button>
        <button
          onClick={() => setActiveTab("contactUs")}
          className={cn(
            "md:px-4 px-2 py-2 font-medium focus:outline-none md:w-auto w-full md:text-center text-left",
            activeTab === "contactUs"
              ? "border-b-2 border-[#53A2EB] text-[#53A2EB]"
              : "text-gray-500"
          )}
        >
          Contact Us
        </button>
        <button
          onClick={() => setActiveTab("termsAndPolicy")}
          className={cn(
            "md:px-4 px-2 py-2 font-medium focus:outline-none md:w-auto w-full md:text-center text-left",
            activeTab === "termsAndPolicy"
              ? "border-b-2 border-[#53A2EB] text-[#53A2EB]"
              : "text-gray-500"
          )}
        >
          Term & Policy
        </button>
      </div>
      <div className="px-3 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
