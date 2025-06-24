"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Plus } from "@/lib/icons";

type AccordionItem = {
  id: number;
  title: string;
  content: string;
};

const items: AccordionItem[] = [
  {
    id: 1,
    title: "Are there any scholarships options available?",
    content:
      "Metus dictum at tempor commodo ullamcorper a lacus vestibulum. In hendrerit gravida rutrum quisque non tellus. Egestas sed sed risus pretium quam vulputate.",
  },
  {
    id: 2,
    title: "Are there any scholarships options available?",
    content:
      "Metus dictum at tempor commodo ullamcorper a lacus vestibulum. In hendrerit gravida rutrum quisque non tellus. Egestas sed sed risus pretium quam vulputate.",
  },
  {
    id: 3,
    title: "Are there any scholarships options available?",
    content:
      "Metus dictum at tempor commodo ullamcorper a lacus vestibulum. In hendrerit gravida rutrum quisque non tellus. Egestas sed sed risus pretium quam vulputate.",
  },
  {
    id: 4,
    title: "Are there any scholarships options available?",
    content:
      "Metus dictum at tempor commodo ullamcorper a lacus vestibulum. In hendrerit gravida rutrum quisque non tellus. Egestas sed sed risus pretium quam vulputate.",
  },
];

const MinusIcon = () => (
  <svg width="15" height="5" viewBox="0 0 24 5" fill="none">
    <rect y="0.763428" width="24" height="4" fill="#53A2EB" />
  </svg>
);

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="my-4 w-full">
      {items.map((item, index) => (
        <div key={item.id} className="mb-5 rounded-xl bg-white">
          <button
            className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-5 text-left text-xl font-medium text-[#000000]"
            onClick={() => toggle(index)}
          >
            <span>{item.title}</span>
            <motion.div
              initial={false}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {openIndex === index ? <MinusIcon /> : <Plus color="#53A2EB" />}
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: "auto", opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 py-5 font-light">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
