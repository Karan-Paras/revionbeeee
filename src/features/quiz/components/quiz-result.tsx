"use client";

import { VideoPlayer } from "@/components/common/video-player";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetQuiz } from "@/features/quiz/queries/use-get-quiz";
import { useQuizResult } from "@/features/quiz/stores/use-quiz-result";
import { ChevronUp, RevisionBee } from "@/lib/icons";
import {
  getQuizAnswerVideoUrl,
  getQuizQuestionVideoUrl,
} from "@/lib/media-urls";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";

type State = { visible: number };

function reducer(state: State, action: State): State {
  if (action.visible !== undefined) {
    return { visible: action.visible };
  }
  return state;
}

export function QuizResult() {
  let { subjectId } = useParams();
  subjectId = subjectId?.toString?.() ?? "";

  const [state, dispatch] = useReducer(reducer, { visible: -1 });

  const handleToggle = (index: number) => {
    dispatch({ visible: state.visible === index ? -1 : index });
  };

  const router = useRouter();

  const { quizResult } = useQuizResult();

  const { subjectID, totalQuestions, result } = quizResult;

  const { data, pending } = useGetQuiz(subjectId);

  useEffect(() => {
    if (subjectId != subjectID) {
      router.replace(paths.quiz());
    }
  }, [router, subjectID, subjectId]);

  if (subjectId != subjectID) {
    return null;
  }

  if (pending || !data || data.length <= 0 || totalQuestions <= 0) {
    return <DataLoader className="mx-auto" />;
  }

  if (data) {
    const questions = data
      .filter((item) => item !== undefined)
      .map((item) => ({ ...item.data[0] }));

    return (
      <section className="py-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-6">
            <div className="col-span-1">
              <div className="flex items-center justify-between">
                <div className="hed">
                  <h3 className="text-2xl font-semibold">Questions</h3>
                </div>
                <div className="count">
                  <p>
                    {totalQuestions}/{totalQuestions}
                  </p>
                </div>
              </div>
              <div className="load relative mt-2.5 w-full">
                <div className="absolute right-0 left-0 h-2 w-full rounded-2xl bg-[#FBBE1B]" />
                <div className="load h-2 w-full rounded-2xl bg-[#EDEDED]" />
              </div>
            </div>
            <div className="bg_shp relative col-span-4">
              <div className="lgo relative mx-auto flex size-[160px] items-center justify-center rounded-full border border-[#f7f7f7] bg-white shadow-xl">
                <RevisionBee />
              </div>
            </div>
            <div className="col-span-1" />
            <div className="col-span-6 -mt-[50px] grid rounded-xl bg-[#F6F6F6] px-10 py-4 pt-40">
              {questions.map(({ question, id, answer, questionVideo }, idx) => (
                <div key={id} className="grid grid-cols-12">
                  <div
                    className={cn(
                      "itm relative col-span-7 col-start-4 mb-5 cursor-pointer rounded-xl bg-white p-5 shadow-md",
                      result[idx].selectedOption === result[idx].correctOption
                        ? "bg-[#FBBE1B]"
                        : "bg-[#ff77774a] text-[#cb3c3c]"
                    )}
                    onClick={() => handleToggle(idx)}
                  >
                    <span className="absolute -left-14 size-10 content-center rounded-full bg-white text-center font-bold text-black shadow-sm">
                      {idx + 1}
                    </span>
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

                    <button className="absolute top-7 right-3 cursor-pointer">
                      <ChevronUp
                        color="#000"
                        className={cn(
                          "transition-transform duration-300",
                          state.visible === idx ? "rotate-0" : "rotate-180"
                        )}
                      />
                    </button>
                  </div>
                  {state.visible === idx && (
                    <div className="relative col-span-7 col-start-4 mb-5 rounded-xl bg-white p-5 shadow-md">
                      <div className="desc_blk p-5">
                        <p className="mb-2 text-lg font-semibold">
                          Your Answer:
                        </p>
                        {result[idx].selectedOption === -1 ? (
                          <p className="text-red-500">
                            You did not attempt this question.
                          </p>
                        ) : (
                          <>
                            <p className="mb-2 font-semibold">
                              option:&nbsp;
                              {String.fromCharCode(
                                65 + result[idx].selectedOption
                              )}
                            </p>
                            <p>
                              <span
                                className="img_spc"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    answer[result[idx].selectedOption].answer
                                  ),
                                }}
                              />
                            </p>
                            {answer[result[idx].selectedOption].answerVideo && (
                              <VideoPlayer
                                src={getQuizAnswerVideoUrl(
                                  answer[result[idx].selectedOption]
                                    .answerVideo as string
                                )}
                              />
                            )}
                          </>
                        )}
                        <hr className="my-3 border-gray-300" />
                        <p className="mt-4 mb-2 text-lg font-semibold">
                          Correct Answer:
                        </p>
                        <p className="mb-2 font-semibold">
                          option:&nbsp;
                          {String.fromCharCode(65 + result[idx].correctOption)}
                        </p>

                        <p>
                          <span
                            className="img_spc"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                answer[result[idx].correctOption].answer
                              ),
                            }}
                          />
                        </p>
                        {answer[result[idx].correctOption].answerVideo && (
                          <VideoPlayer
                            src={getQuizAnswerVideoUrl(
                              answer[result[idx].correctOption]
                                .answerVideo as string
                            )}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-6">
              <div className="btn flex justify-center">
                <Link
                  href={paths.quiz()}
                  className="mt-8 cursor-pointer rounded-2xl bg-[#53A2EB] p-4 px-16 font-medium text-white hover:shadow-sm"
                >
                  View All Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
