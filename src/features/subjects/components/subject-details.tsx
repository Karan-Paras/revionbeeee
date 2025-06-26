"use client";

import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { VideoPlayer } from "@/components/common/video-player";
import { ApiError } from "@/components/errors/api-error";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetSubjectDetails } from "@/features/subjects/queries/use-get-subject-details";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";
import {
  CircleCheckFading,
  HelpLightBulb,
  MessageCircleQuestion,
} from "@/lib/icons";
import { getSubjectVideoUrl } from "@/lib/media-urls";
import { paths } from "@/routes";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useParams } from "next/navigation";

export function SubjectDetails() {
  let { subjectId } = useParams();
  subjectId = subjectId?.toString?.() ?? "";

  const { data, isPending, error } = useGetSubjectDetails(subjectId);

  const { activeSubject } = useActiveSubjectStore();

  const subject =
    activeSubject.subject || data?.data?.subjectName || "Loading...";

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
  ];

  return (
    <>
      <BreadcrumbBanner title={subject} breadcrumbs={breadcrumbs} />

      {(() => {
        if (isPending) {
          return <DataLoader />;
        }

        if (error) {
          return <ApiError error={error.message} />;
        }

        if (data) {
          const { video, description } = data.data;

          return (
            <>
              <section className="px-10 py-16 md:px-10 xl:px-0">
                <div className="container mx-auto">
                  <div className="grid">
                    <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                      {data?.data?.title}
                    </h3>
                    {video && <VideoPlayer src={getSubjectVideoUrl(video)} />}
                    <article
                      className="desc_blk my-5 mb-3 text-base font-normal text-[#505050] md:text-xl"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(description),
                      }}
                    />
                  </div>
                </div>
              </section>
              <section>
                <div className="container mx-auto rounded-xl bg-[#F9F9F9] px-10 py-16 md:px-10 xl:px-0">
                  <div className="grid w-full grid-cols-3 gap-5">
                    <div className="col-span-2 md:col-span-1">
                      <Link href={paths.quizBank(subjectId)}>
                        <div className="grid min-h-[210px] grid-cols-12 items-center rounded-xl border border-[#FBBE1B] bg-white px-5 py-6 md:py-10">
                          <div className="col-span-12 md:col-span-3">
                            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#F9F9F9]">
                              <HelpLightBulb
                                width={43}
                                height={43}
                                color="#FBBE1B"
                              />
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-9">
                            <h3 className="mt-5 mb-2 text-center text-2xl font-bold md:mt-0 md:text-left">
                              Take a Quiz
                            </h3>
                            <p className="text-center text-base font-normal md:text-left md:text-lg">
                              Test your knowledge and track your progress with
                              fun quizzes.
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Link href={paths.questionBank(subjectId)}>
                        <div className="grid min-h-[210px] grid-cols-12 items-center rounded-xl border border-[#53A2EB] bg-white px-5 py-6 md:py-10">
                          <div className="col-span-12 md:col-span-3">
                            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#F9F9F9]">
                              <MessageCircleQuestion color="#53A2EB" />
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-9">
                            <h3 className="mt-5 mb-2 text-center text-2xl font-bold md:mt-0 md:text-left">
                              Question Bank
                            </h3>
                            <p className="text-center text-base font-normal md:text-left md:text-lg">
                              Practice math skills with organized, topic-based
                              questions.
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Link href={paths.progress()} className="">
                        <div className="grid min-h-[210px] grid-cols-12 items-center rounded-xl border border-[#9F9BFD] bg-white px-5 py-6 md:py-10">
                          <div className="col-span-12 md:col-span-3">
                            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#F9F9F9]">
                              <CircleCheckFading color="#9F9CF8" />
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-9">
                            <h3 className="mt-5 mb-2 text-center text-2xl font-bold md:mt-0 md:text-left">
                              Track Progress
                            </h3>
                            <p className="text-center text-base font-normal md:text-left md:text-lg">
                              Monitor your quiz scores and improve over time
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        }
      })()}
    </>
  );
}
