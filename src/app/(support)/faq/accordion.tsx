"use client";

import { Minus2, Plus } from "@/lib/icons";
import { AnimatePresence, motion } from "framer-motion";
import { type JSX, useState } from "react";

type AccordionItem = {
  id: number;
  title: string;
  content: JSX.Element;
};

const items: AccordionItem[] = [
  {
    id: 1,
    title: "What is RevisionBee?",
    content: (
      <p>
        RevisionBee is an interactive learning platform designed to help IB Math
        students master exam-style questions through <strong>quizzes</strong>, a
        full <strong>question bank</strong>, <strong>video explanations</strong>
        , and <strong>video solutions with smart hints</strong>.
      </p>
    ),
  },
  {
    id: 2,
    title: "What’s included in the free trial?",
    content: (
      <>
        <p>The 3-day free trial gives you full access to everything:</p>
        <ul>
          <li>✅ Quizzes with progress tracking</li>
          <li>✅ Full question bank</li>
          <li>✅ Video topic explanations</li>
          <li>✅ Video solutions with hints</li>
        </ul>
        <p>
          After 3 days, you’ll need to subscribe to continue accessing content.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "How is the platform different from others?",
    content: (
      <>
        <p>We focus purely on IB Math and combine:</p>
        <ul>
          <li>✔️ Real-time feedback on quizzes</li>
          <li>✔️ Detailed video solutions with strategic hints</li>
          <li>✔️ Structured topic coverage</li>
          <li>✔️ Video topic explanation</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    title: "Who is this platform for?",
    content: (
      <>
        <p>
          Primarily for IB Math AA SL/HL students and teachers, but also useful
          for:
        </p>
        <ul>
          <li>• IGCSE & MYP students</li>
          <li>• SAT & math competition students</li>
          <li>• Independent learners who want to improve problem-solving</li>
        </ul>
      </>
    ),
  },
  {
    id: 5,
    title: "Can I track my progress?",
    content: (
      <p>
        Yes! Every quiz you take is tracked so you can monitor your progress by
        topic and see where you need improvement.
      </p>
    ),
  },
  {
    id: 6,
    title: "How often is new content added?",
    content: (
      <p>
        New questions and videos are added weekly, especially during IB exam
        seasons.
      </p>
    ),
  },
  {
    id: 7,
    title: "Do you offer support if I’m stuck on a question?",
    content: (
      <p>
        Yes! Many questions come with hints and step-by-step video solutions.
        We&apos;re also working on a student community section where you can ask
        for help.
      </p>
    ),
  },
  {
    id: 8,
    title: "What are the subscription options?",
    content: (
      <>
        <p>We offer:</p>
        <ul>
          <li>
            🐝 <strong>Free Trial</strong> – 3 days full access
          </li>
          <li>
            🐝 <strong>Monthly Plan</strong> – $19/month
          </li>
          <li>
            🐝 <strong>Yearly Plan</strong> – $99/year
          </li>
        </ul>
        <p>All plans include the same features.</p>
      </>
    ),
  },
  {
    id: 9,
    title: "Can I cancel my subscription anytime?",
    content: (
      <p>
        Yes, you can cancel anytime. You’ll still have access until the end of
        your billing period.
      </p>
    ),
  },
  {
    id: 10,
    title: "Can teachers use this with their students?",
    content: (
      <p>
        Absolutely! Teachers can use our quiz tracking features to assign tasks
        and monitor student progress. More teacher tools are coming soon.
      </p>
    ),
  },
];

export function Accordion() {
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
