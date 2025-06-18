"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { ContactUsForm } from "@/features/support/components/contact-us-form";

import { RevisionBee } from "@/lib/icons";

import { cn } from "@/lib/utils";

export function SettingsTab() {
  const tabContent = {
    changePassword: <ChangePasswordForm />,
    aboutUs: (
      <>
        <div className="img bg-[#FFFAEB] size-40 flex rounded-full justify-center items-center mx-auto mt-10">
          <RevisionBee width={100} />
        </div>
        <div className="desc">
          <h4 className="text-xl">About Us</h4>
          <p>
            Welcome to Revision Bee, your go-to destination for fun and engaging
            math quizzes designed specifically for students! Our mission is to
            make math exciting, accessible, and rewarding for learners of all
            ages. Whether you&apos;re brushing up on basic arithmetic or
            tackling more advanced topics like algebra and geometry, our
            interactive quizzes are here to support your learning journey.
          </p>
          <p>
            At Revision Bee, we believe that learning math doesn&apos;t have to
            be boring. That&apos;s why we&apos;ve created a variety of quiz
            levels, challenges, and game-based formats to keep you motivated and
            entertained while you learn. Each quiz is carefully designed to
            match curriculum standards and help you practice essential skills at
            your own pace.
          </p>
          <p>
            Join thousands of students who are transforming the way they learn
            math. Whether you&apos;re studying for an exam or just love a good
            challenge, Revision Bee is here to make math your new favorite
            subject. Start quizzing today and discover the fun side of math!
          </p>
        </div>
      </>
    ),
    contactUs: <ContactUsForm />,
    termsAndPolicy: (
      <div className="desc">
        <h4 className="text-xl font-bold mb-3">AGREEMENT TO TERMS</h4>
        <p className="text-base font-normal text-[#505050] mb-3">
          These Terms and Conditions constitute a legally binding agreement made
          between you, whether personally or on behalf of an entity (“you”) and
          [business entity name] (“we,” “us” or “our”), concerning your access
          to and use of the [website name.com] website as well as any other
          media form, media channel, mobile website or mobile application
          related, linked, or otherwise connected thereto (collectively, the
          “Site”).
        </p>
        <p className="text-base font-normal text-[#505050] mb-3">
          You agree that by accessing the Site, you have read, understood, and
          agree to be bound by all of these Terms and Conditions. If you do not
          agree with all of these Terms and Conditions, then you are expressly
          prohibited from using the Site and you must discontinue use
          immediately.
        </p>
        <p className="text-base font-normal text-[#505050] mb-3">
          Supplemental terms and conditions or documents that may be posted on
          the Site from time to time are hereby expressly incorporated herein by
          reference. We reserve the right, in our sole discretion, to make
          changes or modifications to these Terms and Conditions at any time and
          for any reason.
        </p>
        <p className="text-base font-normal text-[#505050] mb-3">
          We will alert you about any changes by updating the “Last updated”
          date of these Terms and Conditions, and you waive any right to receive
          specific notice of each such change.
        </p>
      </div>
    ),
  };
  const [activeTab, setActiveTab] = useState("changePassword");
  return (
    <div className="w-full mx-auto mt-10">
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
      {/* Tabs Content */}
      <div className="py-5 px-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tabContent[activeTab as keyof typeof tabContent]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
