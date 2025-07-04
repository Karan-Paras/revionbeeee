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
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("changePassword")}
          className={cn(
            "px-4 py-2 font-medium focus:outline-none",
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
            "px-4 py-2 font-medium focus:outline-none",
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
            "px-4 py-2 font-medium focus:outline-none",
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
            "px-4 py-2 font-medium focus:outline-none",
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
