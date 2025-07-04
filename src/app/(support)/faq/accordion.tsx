"use client";

import { Minus2, Plus } from "@/lib/icons";
import { AnimatePresence, motion } from "framer-motion";
import { type JSX, useState } from "react";

type AccordionItem = {
  id: number;
  title: string;
  content: JSX.Element;
};

interface AccordionProps {
  faqs: AccordionItem[];
}

export function Accordion({ faqs }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="my-4 w-full">
      {faqs.map((item, index) => (
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
              {openIndex === index ? <Minus2 /> : <Plus color="#53A2EB" />}
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
