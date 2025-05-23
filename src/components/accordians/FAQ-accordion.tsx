"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const PlusIcon = () => (
  <svg width="15" height="23" viewBox="0 0 23 23" fill="none">
    <path
      d="M13.9643 9.44643C13.7375 9.44643 13.5536 9.26253 13.5536 9.03572V0H9.44643V9.03572C9.44643 9.26253 9.26253 9.44643 9.03572 9.44643H0V13.5536H9.03572C9.26253 13.5536 9.44643 13.7375 9.44643 13.9643V23H13.5536V13.9643C13.5536 13.7375 13.7375 13.5536 13.9643 13.5536H23V9.44643H13.9643Z"
      fill="#53A2EB"
    />
  </svg>
);

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
    <div className="w-full my-4">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-xl bg-white mb-5">
          <button
            className="flex items-center justify-between w-full cursor-pointer px-4 py-5 text-left rounded-xl font-medium text-[#000000] text-xl"
            onClick={() => toggle(index)}
          >
            <span>{item.title}</span>
            <motion.div
              initial={false}
              animate={{ rotate: openIndex === index ? 0 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {openIndex === index ? <MinusIcon /> : <PlusIcon />}
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
