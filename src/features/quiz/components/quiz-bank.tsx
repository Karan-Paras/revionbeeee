"use client";

import { ArrowLeft, ArrowRight, Exit, RevisionBee } from "@/assets/icons";
import { VideoPlayer } from "@/components/common/video-player";
import { ApiError } from "@/components/errors/api-error";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetQuiz } from "@/features/quiz/queries/use-get-quiz";
import { useSubmitQuiz } from "@/features/quiz/queries/use-submit-quiz";
import { useQuizResult } from "@/features/quiz/stores/use-quiz-result";
import type { Option, Result } from "@/features/quiz/types";
import {
  getQuizAnswerVideoUrl,
  getQuizQuestionVideoUrl,
} from "@/lib/media-urls";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import DOMPurify from "dompurify";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function QuizBank() {
  const [displayQuestionIdx, setDisplayQuestionIdx] = useState(0);

  const [options, setOptions] = useState<Result[]>([]);

  const router = useRouter();

  let { subjectId } = useParams();
  subjectId = subjectId?.toString?.() ?? "";

  const { data, pending, totalQuestions, error } = useGetQuiz(subjectId);

  const mutation = useSubmitQuiz();

  const { setQuizResult } = useQuizResult();

  useEffect(() => {
    if (pending || !data || data.length === 0) {
      return;
    }
    const correctOptions: Result[] = data?.map((item) => ({
      selectedOption: -1,
      correctOption: item?.data[0].answer.findIndex(
        (ans) => ans.isCorrect
      ) as Option,
    }));
    setOptions(correctOptions);
  }, [data, pending]);

  const handleSelectedOption = (option: number) => {
    if (option === 0 || option === 1 || option === 2 || option === 3) {
      setOptions((prev) => {
        const newOptions = [...prev];
        newOptions[displayQuestionIdx] = {
          ...newOptions[displayQuestionIdx],
          selectedOption: option,
        };
        return newOptions;
      });
    }
  };

  if (error) {
    return <ApiError error={error.message} />;
  }

  if (pending || !data || data.length <= 0 || totalQuestions <= 0) {
    return <DataLoader />;
  }

  if (data) {
    const currentQuestion = data[displayQuestionIdx]?.data?.[0];
    if (!currentQuestion) {
      return <DataLoader />;
    }

    const {
      id,
      quizID,
      question,
      answer,
      questionVideo,
      quiz: { title },
    } = currentQuestion;

    const onNextQuestion = () => {
      setDisplayQuestionIdx((val) => {
        return val < totalQuestions ? val + 1 : val;
      });
    };

    const onPreviousQuestion = () => {
      setDisplayQuestionIdx((val) => {
        return val > 0 ? val - 1 : val;
      });
    };

    const onSubmit = () => {
      const totalAttempted = options.filter(
        (option) => option.selectedOption !== -1
      ).length;

      const totalCorrect = options.filter(
        (option) => option.selectedOption === option.correctOption
      ).length;

      const percentage = Math.round((totalCorrect / totalQuestions) * 100);

      setQuizResult(
        subjectId,
        totalAttempted,
        totalQuestions,
        percentage,
        options
      );

      mutation.mutate(
        {
          quizId: quizID,
          totalAttempts: totalAttempted,
          progress: percentage,
        },
        {
          onSuccess: () => router.replace(paths.quizFinished(subjectId)),
        }
      );
    };

    return (
      <section className="px-5 py-5 xl:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-6">
            <div className="order-2 col-span-6 mb-5 md:order-1 md:col-span-1 md:mb-0">
              <div className="flex items-center justify-between">
                <div className="hed">
                  <h3 className="text-2xl font-semibold">Questions</h3>
                </div>
                <div className="count">
                  <p>
                    {displayQuestionIdx + 1}/{totalQuestions}
                  </p>
                </div>
              </div>
              <div className="load relative mt-2.5 w-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((displayQuestionIdx + 1) / totalQuestions) * 100}%`,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="absolute right-0 left-0 h-2 rounded-2xl bg-[#FBBE1B]"
                  style={{
                    width: `${((displayQuestionIdx + 1) / totalQuestions) * 100}%`,
                  }}
                />
                <div className="load h-2 w-full rounded-2xl bg-[#EDEDED]" />
              </div>
            </div>
            <div className="bg_shp relative col-span-4 hidden md:order-2 md:block">
              <div className="lgo relative mx-auto flex size-[160px] items-center justify-center rounded-full border border-[#f7f7f7] bg-white shadow-xl">
                <RevisionBee />
              </div>
            </div>
            <div className="order-1 col-span-6 md:order-3 md:col-span-1">
              <Link
                href={paths.subjectDetails(subjectId)}
                className="ms-auto mb-4 flex cursor-pointer items-center justify-end gap-2 md:mb-0"
              >
                <button className="flex cursor-pointer items-center gap-2">
                  <span className="text-xl font-semibold text-[#F15642]">
                    Exit
                  </span>
                  <Exit color="#F15642" />
                </button>
              </Link>
            </div>
            <div className="order-4 col-span-6 grid justify-items-center rounded-xl bg-[#F6F6F6] p-4 md:-mt-[50px] md:min-h-[75vh]">
              <div className="relative mt-5 mb-5 w-full max-w-lg md:mb-10 md:w-6/12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  />

                  <h2 className="mb-8 text-center lg:text-4xl md:text-3xl text-2xl font-bold md:pt-20">
                    {title}
                  </h2>

                  <div className="question_blk mb-5 flex flex-wrap items-start gap-2.5">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white font-semibold">
                      {displayQuestionIdx + 1}
                    </div>
                    <div className="hed w-10/12">
                      <h3 className="text-xl font-semibold">
                        <span
                          className="img_spc"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(question),
                          }}
                        />
                      </h3>

                      {questionVideo && (
                        <VideoPlayer
                          src={getQuizQuestionVideoUrl(questionVideo)}
                        />
                      )}
                    </div>
                  </div>

                  {answer.map(({ answer, answerVideo }, index) => (
                    <motion.div
                      key={index + 1000}
                      onClick={() => handleSelectedOption(index)}
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className={cn(
                        "itm mb-5 cursor-pointer rounded-xl px-5 py-6 duration-150 ease-in-out hover:shadow-xl/5",
                        options[displayQuestionIdx]?.selectedOption === index
                          ? "bg-[#FBBE1B]"
                          : "bg-white"
                      )}
                    >
                      <div className="flex flex-wrap gap-1 text-lg">
                        <p className="font-bold">
                          {String.fromCharCode(65 + index)}.
                        </p>
                        <p>
                          <span
                            className="img_spc"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(answer),
                            }}
                          />
                        </p>
                        {answerVideo && (
                          <VideoPlayer
                            src={getQuizAnswerVideoUrl(answerVideo)}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="order-5 col-span-6">
              <div className="mt-7 flex flex-wrap justify-center gap-3 md:flex-nowrap">
                {displayQuestionIdx > 0 && (
                  <motion.button
                    disabled={mutation.isPending}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={onPreviousQuestion}
                    className="group flex min-w-48 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#505050] bg-white p-4 font-medium text-[#505050] duration-150 ease-in-out hover:bg-[#505050] hover:text-white hover:shadow-lg"
                  >
                    <span>
                      <ArrowLeft color="#505050" />
                    </span>
                    Previous
                  </motion.button>
                )}
                {displayQuestionIdx < totalQuestions - 1 && (
                  <motion.button
                    disabled={mutation.isPending}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={onNextQuestion}
                    className="group flex min-w-48 cursor-pointer items-center justify-center gap-2 rounded-xl border border-transparent bg-[#53A2EB] p-4 font-medium text-white duration-150 ease-in-out hover:border-[#53A2EB] hover:bg-transparent hover:text-[#53A2EB] hover:shadow-lg"
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
                    disabled={mutation.isPending}
                    onClick={onSubmit}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    className="group flex min-w-48 cursor-pointer items-center justify-center gap-2 rounded-xl border border-transparent bg-[#53A2EB] p-4 font-medium text-white duration-150 ease-in-out hover:border-[#53A2EB] hover:bg-transparent hover:text-[#53A2EB] hover:shadow-lg"
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
