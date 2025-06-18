"use client";

import Link from "next/link";
import DOMPurify from "dompurify";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";

import { DataLoader } from "@/components/loaders/data-loader";
import { useGetQuiz } from "@/features/quiz/queries/use-get-quiz";
import { useQuizResult } from "@/features/quiz/stores/use-quiz-result";
import { VideoPlayer } from "@/features/videos/components/video-player";

import { ChevronUp, RevisionBee } from "@/lib/icons";
import {
  getQuizAnswerVideoUrl,
  getQuizQuestionVideoUrl,
} from "@/lib/media-urls";

import { cn } from "@/lib/utils";
import { paths } from "@/routes";

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
          <div className="grid grid-cols-6 ">
            <div className="col-span-1">
              <div className="flex justify-between items-center">
                <div className="hed">
                  <h3 className="font-semibold text-2xl">Questions</h3>
                </div>
                <div className="count">
                  <p>
                    {totalQuestions}/{totalQuestions}
                  </p>
                </div>
              </div>
              <div className="load w-full relative mt-2.5">
                <div className="h-2 rounded-2xl bg-[#FBBE1B] absolute left-0 right-0 w-full" />
                <div className="load w-full h-2 bg-[#EDEDED] rounded-2xl" />
              </div>
            </div>
            <div className="col-span-4 relative bg_shp">
              <div className="lgo size-[160px] mx-auto bg-white shadow-xl border border-[#f7f7f7] rounded-full flex justify-center items-center relative">
                <RevisionBee />
              </div>
            </div>
            <div className="col-span-1" />
            <div className="col-span-6 bg-[#F6F6F6] py-4 px-10 rounded-xl grid -mt-[50px] pt-40">
              {questions.map(({ question, id, answer, questionVideo }, idx) => (
                <div key={id} className="grid-cols-12  grid">
                  <div
                    className={cn(
                      "itm  col-start-4 col-span-7 bg-white p-5 shadow-md rounded-xl mb-5 relative cursor-pointer",
                      result[idx].selectedOption === result[idx].correctOption
                        ? "bg-[#FBBE1B]"
                        : "bg-[#ff77774a] text-[#cb3c3c]"
                    )}
                    onClick={() => handleToggle(idx)}
                  >
                    <span className="absolute -left-14 text-center content-center size-10 shadow-sm font-bold bg-white rounded-full text-black">
                      {idx + 1}
                    </span>
                    <h3 className="font-semibold text-xl">
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

                    <button className="absolute right-3  top-7 cursor-pointer">
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
                    <div className="col-start-4 col-span-7 p-5 shadow-md rounded-xl mb-5 relative bg-white">
                      <div className="desc_blk p-5">
                        <p className="text-lg font-semibold mb-2">
                          Your Answer:
                        </p>
                        {result[idx].selectedOption === -1 ? (
                          <p className="text-red-500 ">
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
                        <p className="text-lg font-semibold mt-4 mb-2">
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
                  className="bg-[#53A2EB] p-4 text-white mt-8 px-16 rounded-2xl font-medium cursor-pointer hover:shadow-sm"
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
