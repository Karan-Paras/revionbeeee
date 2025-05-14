"use client";

import { RevisionBee } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

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

  const onNextQuestion = () => {
    setDisplayQuestionIdx((val) => {
      if (val < questions.length) {
        return val + 1;
      } else {
        return val;
      }
    });
  };

  const onPreviousQuestion = () => {
    setDisplayQuestionIdx((val) => {
      if (val > 0) {
        return val - 1;
      } else {
        return val;
      }
    });
  };

  const handleSelectedOption = (option: number) => {
    if (option === 0 || option === 1 || option === 2 || option === 3) {
      setSelectedOption(option);
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-6 ">
            <div className="col-span-1">
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
                ></motion.div>
                <div className="load w-full h-2 bg-[#EDEDED] rounded-2xl"></div>
              </div>
            </div>
            <div className="col-span-4 relative bg_shp">
              <div className="lgo size-[160px] mx-auto bg-white shadow-xl border border-[#f7f7f7] rounded-full flex justify-center items-center relative">
                <RevisionBee />
              </div>
            </div>
            <div className="col-span-1">
              <button className="flex justify-end items-center gap-2 cursor-pointer ms-auto">
                <span className="text-[#F15642] text-xl font-semibold">
                  Exit
                </span>
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.1582 22.8357V25.9939C3.1582 29.4837 5.98637 32.3103 9.47461 32.3103H25.2656C28.7554 32.3103 31.582 29.4837 31.582 25.9939C31.582 20.7371 31.582 12.3031 31.582 7.04468C31.582 3.55644 28.7554 0.728271 25.2656 0.728271C20.751 0.728271 13.9908 0.728271 9.47461 0.728271C5.98637 0.728271 3.1582 3.55644 3.1582 7.04468V10.2029C3.1582 11.0745 3.86564 11.782 4.7373 11.782C5.60897 11.782 6.31641 11.0745 6.31641 10.2029C6.31641 10.2029 6.31641 8.72326 6.31641 7.04468C6.31641 5.30135 7.73128 3.88647 9.47461 3.88647H25.2656C27.0105 3.88647 28.4238 5.30135 28.4238 7.04468V25.9939C28.4238 27.7388 27.0105 29.1521 25.2656 29.1521C20.751 29.1521 13.9908 29.1521 9.47461 29.1521C7.73128 29.1521 6.31641 27.7388 6.31641 25.9939C6.31641 24.3169 6.31641 22.8357 6.31641 22.8357C6.31641 21.9656 5.60897 21.2566 4.7373 21.2566C3.86564 21.2566 3.1582 21.9656 3.1582 22.8357ZM15.1373 14.9402L13.0955 12.9C12.4796 12.2825 12.4796 11.283 13.0955 10.6656C13.7129 10.0497 14.7125 10.0497 15.3283 10.6656L20.0656 15.4029C20.6831 16.0203 20.6831 17.0198 20.0656 17.6373L15.3283 22.3746C14.7125 22.9904 13.7129 22.9904 13.0955 22.3746C12.4796 21.7572 12.4796 20.7576 13.0955 20.1402L15.1373 18.0984H1.5791C0.707438 18.0984 0 17.391 0 16.5193C0 15.6492 0.707438 14.9402 1.5791 14.9402H15.1373Z"
                    fill="#F15642"
                  />
                </svg>
              </button>
            </div>
            {/* quiz block */}
            <div className="col-span-6 bg-[#F6F6F6] p-4 rounded-xl grid justify-items-center -mt-[50px] min-h-[75vh]">
              <div className="w-6/12 max-w-lg mt-5 mb-10 relative">
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
                  ></motion.div>
                  <div className="question_blk flex items-center gap-2.5 pt-32 mb-5 flex-wrap">
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
                  {/* correct answwer */}

                  {questions[displayQuestionIdx].options.map(
                    (option, index) => (
                      <motion.div
                        key={index}
                        onClick={() => handleSelectedOption(index)}
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.06, // Staggered delay
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
                    )
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex justify-center mt-7 gap-3">
                {displayQuestionIdx > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={onPreviousQuestion}
                    className="bg-white border-[#505050] text-[#505050] border p-4 rounded-xl flex gap-2 items-center justify-center  min-w-48 font-medium cursor-pointer hover:shadow-lg hover:bg-[#505050] hover:text-white duration-150 ease-in-out group"
                  >
                    <span>
                      <svg
                        className="rotate-180"
                        width="17"
                        height=" 11"
                        viewBox="0 0 17 11"
                        fill="none"
                      >
                        <path
                          className="group-hover:fill-white"
                          d="M16.9362 5.81429C16.8511 5.89286 16.8511 5.97143 16.766 6.05L11.6596 10.7643C11.3191 11.0786 10.8085 11.0786 10.4681 10.7643C10.1277 10.45 10.1277 9.97857 10.4681 9.66429L14.1277 6.28571H0.851064C0.340425 6.28571 0 5.97143 0 5.5C0 5.02857 0.340425 4.71429 0.851064 4.71429H14.1277L10.4681 1.33572C10.1277 1.02143 10.1277 0.549999 10.4681 0.235714C10.6383 0.0785713 10.8936 0 11.0638 0C11.234 0 11.4894 0.0785713 11.6596 0.235714L16.766 4.95C16.8511 5.02857 16.9362 5.10714 16.9362 5.18571C17.0213 5.42143 17.0213 5.57857 16.9362 5.81429Z"
                          fill="#505050"
                        />
                      </svg>
                    </span>{" "}
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
                    Next{" "}
                    <span>
                      <svg
                        width="17"
                        height=" 11"
                        viewBox="0 0 17 11"
                        fill="none"
                      >
                        <path
                          className="group-hover:fill-[#53A2EB]"
                          d="M16.9362 5.81429C16.8511 5.89286 16.8511 5.97143 16.766 6.05L11.6596 10.7643C11.3191 11.0786 10.8085 11.0786 10.4681 10.7643C10.1277 10.45 10.1277 9.97857 10.4681 9.66429L14.1277 6.28571H0.851064C0.340425 6.28571 0 5.97143 0 5.5C0 5.02857 0.340425 4.71429 0.851064 4.71429H14.1277L10.4681 1.33572C10.1277 1.02143 10.1277 0.549999 10.4681 0.235714C10.6383 0.0785713 10.8936 0 11.0638 0C11.234 0 11.4894 0.0785713 11.6596 0.235714L16.766 4.95C16.8511 5.02857 16.9362 5.10714 16.9362 5.18571C17.0213 5.42143 17.0213 5.57857 16.9362 5.81429Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
