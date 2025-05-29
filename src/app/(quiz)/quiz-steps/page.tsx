"use client";

import { ArrowLeft, ArrowRight, Exit, RevisionBee } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Options = 0 | 1 | 2 | 3;

const questions = [
  {
    question: "What is the value of 3 x (4 + 5)?",
    options: ["27", "32", "35", "12"],
  },
  {
    question: "Solve for x: 2x + 5 = 13",
    options: ["3", "4", "5", "6"],
  },
  {
    question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
    options: ["18", "20", "32", "24"],
  },
  {
    question: "Simplify: 3a + 2a - a",
    options: ["4a", "3a", "5a", "6a"],
  },
  {
    question:
      "The angles of a triangle are in the ratio 2:3:4. What are the angles?",
    options: [
      "30°, 45°, 105°",
      "20°, 30°, 130°",
      "40°, 60°, 80°",
      "36°, 54°, 90",
    ],
  },
  {
    question: "Find the area of a circle with radius 7 cm. Use 𝜋=3.14 π=3.14.",
    options: ["144.22 cm²", "153.86 cm²", "140.34 cm²", "157.08 cm²"],
  },
  {
    question:
      "The sum of three consecutive even numbers is 96. What are the numbers?",
    options: ["30, 32, 34", "28, 30, 32", "32, 34, 36", "26, 28, 30"],
  },
  {
    question: "Find the HCF of 36 and 60.",
    options: ["12", "6", "18", "24"],
  },
  {
    question:
      "A number is divisible by both 3 and 4. Which of the following could it be?",
    options: ["11", "18", "24", "36"],
  },
  {
    question: "What is the next prime number after 47?",
    options: ["49", "51", "53", "57"],
  },
  {
    question: "What is the value of 5 x 4 + 1?",
    options: ["21", "25", "20", "24"],
  },
  {
    question: "What is the value of (7 + 5) - 6?",
    options: ["6", "5", "7", "8"],
  },
  {
    question: "What is the value of 14 - 6 / 2?",
    options: ["11", "10", "8", "9"],
  },
  {
    question: "What is the value of (3 + 2) x (4 - 1)?",
    options: ["15", "12", "10", "18"],
  },
  {
    question: "What is the value of 9 + 6 / 3?",
    options: ["11", "9", "13", "10"],
  },
  {
    question: "What is the value of 20 - (2 x 4)?",
    options: ["12", "14", "10", "16"],
  },
  {
    question: "What is the value of 2 x (6 + 7)?",
    options: ["26", "24", "22", "28"],
  },
  {
    question: "What is the value of (8 x 2) + 3?",
    options: ["19", "18", "17", "21"],
  },
  {
    question: "What is the value of 10 + 5 x 2?",
    options: ["20", "25", "15", "18"],
  },
  {
    question: "What is the value of (16 / 4) + (6 - 2)?",
    options: ["8", "9", "10", "7"],
  },
  {
    question: "What is the value of (9 + 1) / 2?",
    options: ["5", "4", "6", "7"],
  },
  {
    question: "What is the value of 7 x (3 + 1)?",
    options: ["28", "24", "30", "32"],
  },
  {
    question: "What is the value of 10 x 2 - 4?",
    options: ["16", "20", "18", "22"],
  },
  {
    question: "What is the value of (12 - 4) / 2?",
    options: ["4", "5", "3", "6"],
  },
  {
    question: "What is the value of 5 + 3 x 3?",
    options: ["14", "24", "11", "13"],
  },
  {
    question: "What is the value of (6 x 2) + 1?",
    options: ["13", "12", "15", "14"],
  },
  {
    question: "What is the value of 15 - 3 x 2?",
    options: ["9", "10", "8", "6"],
  },
  {
    question: "What is the value of (4 + 6) x 2?",
    options: ["20", "18", "22", "16"],
  },
  {
    question: "What is the value of 18 / (3 + 3)?",
    options: ["3", "4", "2", "6"],
  },
  {
    question: "What is the value of 8 + (2 x 6)?",
    options: ["20", "18", "22", "16"],
  },
];

export default function QuizSteps() {
  const [displayQuestionIdx, setDisplayQuestionIdx] = useState(0);

  const [selectedOption, setSelectedOption] = useState<Options | null>(null);

  const router = useRouter();

  const onNextQuestion = () => {
    setDisplayQuestionIdx((val) => {
      return val < questions.length ? val + 1 : val;
    });
    setSelectedOption(null);
  };

  const onPreviousQuestion = () => {
    setDisplayQuestionIdx((val) => {
      return val > 0 ? val - 1 : val;
    });
    setSelectedOption(null);
  };

  const handleSelectedOption = (option: number) => {
    if (option === 0 || option === 1 || option === 2 || option === 3) {
      setSelectedOption(option);
    }
  };

  return (
    <section className="py-5 xl:px-0 px-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-6 ">
          <div className="md:col-span-1 col-span-6 md:order-1 order-2 md:mb-0 mb-5">
            <div className="flex justify-between items-center">
              <div className="hed">
                <h3 className="font-semibold text-2xl">Questions</h3>
              </div>
              <div className="count">
                <p>{displayQuestionIdx + 1}/30</p>
              </div>
            </div>
            <div className="load w-full relative mt-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((displayQuestionIdx + 1) / questions.length) * 100}%`,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="h-2 rounded-2xl bg-[#FBBE1B] absolute left-0 right-0"
                style={{
                  width: `${((displayQuestionIdx + 1) / questions.length) * 100}%`,
                }}
              />
              <div className="load w-full h-2 bg-[#EDEDED] rounded-2xl" />
            </div>
          </div>
          <div className="col-span-4 relative bg_shp md:order-2 md:block hidden">
            <div className="lgo size-[160px] mx-auto bg-white shadow-xl border border-[#f7f7f7] rounded-full flex justify-center items-center relative">
              <RevisionBee />
            </div>
          </div>
          <div className="md:col-span-1 col-span-6 md:order-3 order-1">
            <button className="flex justify-end md:mb-0 mb-4 items-center gap-2 cursor-pointer ms-auto">
              <span className="text-[#F15642] text-xl font-semibold">Exit</span>
              <Exit color="#F15642" />
            </button>
          </div>
          {/* quiz block */}
          <div className="order-4 col-span-6 bg-[#F6F6F6] p-4 rounded-xl grid justify-items-center md:-mt-[50px] md:min-h-[75vh]">
            <div className="md:w-6/12 w-full max-w-lg mt-5 md:mb-10 mb-5 relative">
              {/* question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayQuestionIdx}
                  initial={{ opacity: 0, y: 10 }} // Fade out + slight downward start
                  animate={{ opacity: 1, y: 0 }} // Fade in + settle to natural position
                  exit={{ opacity: 0, y: -10 }} // Fade out + slight upward exit
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                />
                <div className="question_blk flex items-center gap-2.5 md:pt-32 mb-5 flex-wrap">
                  <div className="size-10 bg-white flex justify-center items-center rounded-full font-semibold">
                    {displayQuestionIdx + 1}
                  </div>
                  <div className="hed w-10/12">
                    <h3 className="font-semibold text-xl">
                      {questions[displayQuestionIdx].question}
                    </h3>
                  </div>
                </div>

                {/* answers   */}
                {/* items */}
                {/* correct answer */}

                {questions[displayQuestionIdx].options.map((option, index) => (
                  <motion.div
                    key={index + 6}
                    onClick={() => handleSelectedOption(index)}
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.1, // Staggered delay
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "itm px-5 py-6 rounded-xl mb-5 cursor-pointer hover:shadow-xl/5 duration-150 ease-in-out",
                      selectedOption === index ? "bg-[#FBBE1B]" : "bg-white"
                    )}
                  >
                    <div className="flex gap-1 text-lg">
                      <p className="font-bold">
                        {String.fromCharCode(65 + index)}.
                      </p>
                      <p>{option}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="order-5 col-span-6">
            <div className="flex justify-center mt-7 gap-3 md:flex-nowrap flex-wrap">
              {displayQuestionIdx > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={onPreviousQuestion}
                  className="bg-white border-[#505050] text-[#505050] border p-4 rounded-xl flex gap-2 items-center justify-center  min-w-48 font-medium cursor-pointer hover:shadow-lg hover:bg-[#505050] hover:text-white duration-150 ease-in-out group"
                >
                  <span>
                    <ArrowLeft color="#505050" />
                  </span>
                  Previous
                </motion.button>
              )}
              {displayQuestionIdx < questions.length - 1 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={onNextQuestion}
                  className="bg-[#53A2EB] border-transparent border p-4 rounded-xl flex gap-2 items-center justify-center text-white min-w-48 font-medium cursor-pointer hover:shadow-lg hover:border-[#53A2EB] hover:text-[#53A2EB] hover:bg-transparent duration-150 ease-in-out group"
                >
                  Next
                  <span>
                    <ArrowRight
                      className="group-hover:fill-[#53A2EB]"
                      color="white"
                    />
                  </span>
                </motion.button>
              )}
              {displayQuestionIdx === questions.length - 1 && (
                <motion.button
                  onClick={() => router.push("/quiz-result")}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#53A2EB] border-transparent border p-4 rounded-xl flex gap-2 items-center justify-center text-white min-w-48 font-medium cursor-pointer hover:shadow-lg hover:border-[#53A2EB] hover:text-[#53A2EB] hover:bg-transparent duration-150 ease-in-out group"
                >
                  Submit
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
