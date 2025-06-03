"use client";

import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetSubjectDetails } from "@/features/subjects/queries/use-get-subject-details";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";
import { VideoPlayer } from "@/features/videos/components/video-player";
import {
  CircleCheckFading,
  HelpLightBulb,
  MessageCircleQuestion,
  Video,
} from "@/lib/icons";
import { getSubjectVideoUrl } from "@/lib/media-urls";
import { paths } from "@/routes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export function SubjectDetails() {
  const { subjectId } = useParams();
  const { data, isPending, error } = useGetSubjectDetails(
    subjectId?.toString?.() ?? ""
  );

  const { activeSubject } = useActiveSubjectStore();

  const subject =
    activeSubject.subject || data?.data[0].subjectName || "Loading...";

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
      href: paths.subjectDetails(subjectId?.toString() || "#"),
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
          toast.error(error.message);
        }

        if (data) {
          const { description, title, video } = data.data[0];

          return (
            <section className="py-16 xl:px-0 md:px-10 px-10">
              <div className="container mx-auto">
                <div className="grid">
                  <h3 className="font-bold md:text-3xl text-2xl mb-4">
                    {title}
                  </h3>
                  {video && (
                    <div className="min-h-[300px] w-full rounded-xl overflow-hidden border-gray-100 border">
                      <VideoPlayer src={getSubjectVideoUrl(video)} />
                    </div>
                  )}
                  <article
                    className="md:text-xl text-base text-[#505050] mb-3 font-normal my-5 desc_blk"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </div>
            </section>
          );
        }
      })()}
      <section className="">
        <div className="container mx-auto bg-[#F9F9F9] rounded-xl py-16 xl:px-0 md:px-10 px-10">
          <div className="grid grid-cols-2 mx-auto md:w-9/12 w-full gap-7">
            <div className="md:col-span-1 col-span-2">
              <Link href="/quiz-steps" className="">
                <div className="grid grid-cols-12 bg-white px-4 md:py-10 py-6 rounded-xl border border-[#FBBE1B] items-center">
                  <div className="md:col-span-3 col-span-12">
                    <div className="size-20 bg-[#F9F9F9] rounded-full flex justify-center items-center  mx-auto">
                      <HelpLightBulb width={43} height={43} color="#FBBE1B" />
                    </div>
                  </div>
                  <div className="md:col-span-9 col-span-12">
                    <h3 className="text-2xl font-bold mb-2 md:mt-0 mt-5 md:text-left text-center">
                      Take a Quiz
                    </h3>
                    <p className="md:text-lg text-base md:text-left text-center font-normal">
                      Test your knowledge and track your progress with fun
                      quizzes.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="md:col-span-1 col-span-2">
              <Link href="/question-bank" className="">
                <div className="grid grid-cols-12 bg-white px-4 md:py-10 py-6 rounded-xl border border-[#53A2EB] items-center">
                  <div className="md:col-span-3 col-span-12">
                    <div className="size-20 bg-[#F9F9F9] rounded-full flex justify-center items-center  mx-auto">
                      <MessageCircleQuestion color="#53A2EB" />
                    </div>
                  </div>
                  <div className="md:col-span-9 col-span-12">
                    <h3 className="text-2xl font-bold mb-2 md:mt-0 mt-5 md:text-left text-center">
                      Question Bank
                    </h3>
                    <p className="md:text-lg text-base md:text-left text-center font-normal">
                      Practice math skills with organized, topic-based
                      questions.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="md:col-span-1 col-span-2">
              <Link href="/videos" className="">
                <div className="grid grid-cols-12 bg-white px-4 md:py-10 py-6 rounded-xl border border-[#FAB89B] items-center">
                  <div className="md:col-span-3 col-span-12">
                    <div className="size-20 bg-[#F9F9F9] rounded-full flex justify-center items-center  mx-auto">
                      <Video width={35} height={25} color="#F39A74" />
                    </div>
                  </div>
                  <div className="md:col-span-9 col-span-12">
                    <h3 className="text-2xl font-bold mb-2 md:mt-0 mt-5 md:text-left text-center">
                      Videos
                    </h3>
                    <p className="md:text-lg text-base md:text-left text-center font-normal">
                      Watch, learn, and understand concepts with visual clarity
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="md:col-span-1 col-span-2">
              <Link href="/track-progress" className="">
                <div className="grid grid-cols-12 bg-white px-4 md:py-10 py-6 rounded-xl border border-[#9F9BFD] items-center">
                  <div className="md:col-span-3 col-span-12">
                    <div className="size-20 bg-[#F9F9F9] rounded-full flex justify-center items-center  mx-auto">
                      <CircleCheckFading color="#9F9CF8" />
                    </div>
                  </div>
                  <div className="md:col-span-9 col-span-12">
                    <h3 className="text-2xl font-bold mb-2 md:mt-0 mt-5 md:text-left text-center">
                      Track Progress
                    </h3>
                    <p className="md:text-lg text-base md:text-left text-center font-normal">
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
