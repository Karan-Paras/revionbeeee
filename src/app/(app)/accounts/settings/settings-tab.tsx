"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type TabKey = "changePassword" | "aboutUs" | "contactUs" | "termsAndPolicy";

export interface TabDefinition {
  key: TabKey;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabDefinition[];
  defaultActiveKey?: TabKey;
}

export function SettingsTab({ tabs, defaultActiveKey }: TabsProps) {
  const [activeKey, setActiveKey] = useState<TabKey>(
    defaultActiveKey || tabs[0]?.key
  );

  const activeContent = tabs.find((tab) => tab.key === activeKey)?.content;

  return (
    <div className="mx-auto mt-10 w-full">
      <div className="flex border-b border-gray-300 md:flex-nowrap flex-wrap md:gap-0 gap-4 md:pb-0 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            className={cn(
              "md:px-4 px-2 py-2 font-medium focus:outline-none md:w-auto w-full md:text-center text-left",
              activeKey === tab.key
                ? "border-b-2 border-[#53A2EB] text-[#53A2EB]"
                : "text-gray-500"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="px-3 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
