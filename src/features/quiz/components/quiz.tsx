"use client";

import { ArrowLeft, ArrowRight, Exit, RevisionBee } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useGetQuiz } from "@/features/quiz/queries/use-get-quiz";
import { DataLoader } from "@/components/loaders/data-loader";
import { Link } from "lucide-react";
import { paths } from "@/routes";
import { VideoPlayer } from "@/features/videos/components/video-player";

type Options = 0 | 1 | 2 | 3;

export function Quiz() {
  const [displayQuestionIdx, setDisplayQuestionIdx] = useState(0);

  const [selectedOption, setSelectedOption] = useState<Options | null>(null);

  const router = useRouter();

  let { subjectId } = useParams();
  subjectId = subjectId?.toString?.() ?? "";

  const handleSelectedOption = (option: number) => {
    if (option === 0 || option === 1 || option === 2 || option === 3) {
      setSelectedOption(option);
    }
  };

  const { data, pending, totalQuestions } = useGetQuiz(subjectId);

  console.log(pending);

  if (pending || !data || data.length === 0) {
    return <DataLoader />;
  }

  if (data) {
    const currentQuestion = data[displayQuestionIdx]?.data?.[0];
    if (!currentQuestion) {
      return <DataLoader />;
    }
    const { question, answer, questionVideo } = currentQuestion;

    const onNextQuestion = () => {
      setDisplayQuestionIdx((val) => {
        return val < totalQuestions ? val + 1 : val;
      });
      setSelectedOption(null);
    };

    const onPreviousQuestion = () => {
      setDisplayQuestionIdx((val) => {
        return val > 0 ? val - 1 : val;
      });
      setSelectedOption(null);
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
                  <p>
                    {displayQuestionIdx + 1}/{totalQuestions}
                  </p>
                </div>
              </div>

              <div className="load w-full relative mt-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((displayQuestionIdx + 1) / totalQuestions) * 100}%`,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="h-2 rounded-2xl bg-[#FBBE1B] absolute left-0 right-0"
                  style={{
                    width: `${((displayQuestionIdx + 1) / totalQuestions) * 100}%`,
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
              <Link
                href={paths.subjectDetails(subjectId)}
                className="flex justify-end md:mb-0 mb-4 items-center gap-2 cursor-pointer ms-auto"
              >
                <span className="text-[#F15642] text-xl font-semibold">
                  Exit
                </span>
                <Exit color="#F15642" />
              </Link>
            </div>
            <div className="order-4 col-span-6 bg-[#F6F6F6] p-4 rounded-xl grid justify-items-center md:-mt-[50px] md:min-h-[75vh]">
              <div className="md:w-6/12 w-full max-w-lg mt-5 md:mb-10 mb-5 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayQuestionIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
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
                      <h3
                        className="font-semibold text-xl"
                        dangerouslySetInnerHTML={{
                          __html: question,
                        }}
                      />
                      {questionVideo && <VideoPlayer src={questionVideo} />}
                    </div>
                  </div>

                  {answer.map(({ answer, answerVideo }, index) => (
                    <motion.div
                      key={index + 6}
                      onClick={() => handleSelectedOption(index)}
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
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
                        <p
                          dangerouslySetInnerHTML={{
                            __html: answer,
                          }}
                        />
                        {answerVideo && <VideoPlayer src={answerVideo} />}
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
                {displayQuestionIdx < totalQuestions - 1 && (
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
                {displayQuestionIdx === totalQuestions - 1 && (
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
}
