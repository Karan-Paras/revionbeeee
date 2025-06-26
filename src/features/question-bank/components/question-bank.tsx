"use client";

import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { VideoPlayer } from "@/components/common/video-player";
import { ApiError } from "@/components/errors/api-error";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetQuestionBank } from "@/features/question-bank/queries/use-get-question-bank";
import { useGetSubjectDetails } from "@/features/subjects/queries/use-get-subject-details";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";
import { ChevronUp } from "@/lib/icons";
import { getQuestionBankVideoUrl } from "@/lib/media-urls";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { useReducer } from "react";

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

  const { data: subjectData } = useGetSubjectDetails(subjectId);

  const { data, isPending, error } = useGetQuestionBank(subjectId);

  const { activeSubject } = useActiveSubjectStore();

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
            <section className="bg-[#F6F6F6] px-10 py-16 md:px-0">
              <div className="container mx-auto">
                {questions.map(
                  (
                    { id, question, questionVideo, answer, answerVideo },
                    index
                  ) => (
                    <div key={id} className="item mb-5">
                      <h2 className="mb-5 text-2xl font-bold">
                        Question {index + 1}
                      </h2>
                      <div className="itm_blk rounded-xl bg-white p-7">
                        <div className="desc_blk">
                          <h5
                            className="text-xl font-semibold"
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
                          className="mt-5 flex items-center gap-2.5 rounded-xl bg-[#F0F8FF] px-5 py-3 font-semibold text-[#53A2EB]"
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
