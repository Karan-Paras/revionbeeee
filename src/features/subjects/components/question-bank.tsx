"use client";

import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { useReducer } from "react";

import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { ApiError } from "@/components/errors/api-error";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetQuestionBank } from "@/features/subjects/queries/use-get-question-bank";
import { useGetSubjectDetails } from "@/features/subjects/queries/use-get-subject-details";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";
import { VideoPlayer } from "@/features/videos/components/video-player";

import { ChevronUp } from "@/lib/icons";
import { getQuestionBankVideoUrl } from "@/lib/media-urls";

import { cn } from "@/lib/utils";
import { paths } from "@/routes";

type State = { visible: number };

function reducer(state: State, action: State): State {
  if (action.visible !== undefined) {
    return { visible: action.visible };
  }
  return state;
}

export function QuestionBank() {
  const [state, dispatch] = useReducer(reducer, { visible: -1 });

  const handleToggle = (index: number) => {
    dispatch({ visible: state.visible === index ? -1 : index });
  };

  let { subjectId } = useParams();
  subjectId = subjectId?.toString?.() ?? "";

  const { activeSubject } = useActiveSubjectStore();

  const { data: subjectData } = useGetSubjectDetails(subjectId);

  const { data, isPending, error } = useGetQuestionBank(subjectId);

  const subject =
    activeSubject.subject || subjectData?.data?.subjectName || "Loading...";

  const breadcrumbs = [
    {
      label: "Home",
      href: paths.dashboard(),
    },
    {
      label: "Subjects",
      href: paths.subjects(),
    },
    {
      label: subject,
      href: paths.subjectDetails(subjectId),
    },
    {
      label: "Question Bank",
      href: paths.questionBank(subjectId),
    },
  ];

  return (
    <>
      <BreadcrumbBanner title="Question Bank" breadcrumbs={breadcrumbs} />
      {(() => {
        if (isPending) {
          return <DataLoader />;
        }

        if (error) {
          return <ApiError error={error.message} />;
        }

        if (data) {
          const questions = data.data;

          return (
            <section className="bg-[#F6F6F6] py-16 md:px-0 px-10">
              <div className="container mx-auto">
                {questions.map(
                  (
                    { id, question, questionVideo, answer, answerVideo },
                    index
                  ) => (
                    <div key={id} className="item mb-5">
                      <h2 className="mb-5 font-bold text-2xl">
                        Question {index + 1}
                      </h2>
                      <div className="itm_blk p-7 bg-white rounded-xl">
                        <div className="desc_blk">
                          <h5
                            className="font-semibold text-xl"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(question),
                            }}
                          />
                        </div>
                        {questionVideo && (
                          <VideoPlayer
                            src={getQuestionBankVideoUrl(questionVideo)}
                          />
                        )}
                        <button
                          className="bg-[#F0F8FF] text-[#53A2EB] flex items-center rounded-xl font-semibold gap-2.5 py-3 px-5 mt-5"
                          onClick={() => handleToggle(index)}
                        >
                          View Solution
                          <ChevronUp
                            color="#53A2EB"
                            className={cn(
                              "transition-transform duration-300",
                              state.visible === index
                                ? "rotate-0"
                                : "rotate-180"
                            )}
                          />
                        </button>
                        <div className="py-5">
                          {state.visible === index && (
                            <div className="desc_blk">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(answer),
                                }}
                              />
                              {answerVideo && (
                                <VideoPlayer
                                  src={getQuestionBankVideoUrl(answerVideo)}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          );
        }
      })()}
    </>
  );
}
