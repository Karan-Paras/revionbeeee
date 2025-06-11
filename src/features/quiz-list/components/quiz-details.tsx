"use client";

import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";
import { Play } from "@/lib/icons";
import { paths } from "@/routes";
import { useParams } from "next/navigation";
import { useGetSubjectDetails } from "../queries/use-get-quiz-details";
import { toast } from "sonner";
import Link from "next/link";

export function QuizDetails() {
  // let { subjectId } = useParams();
  const params = useParams();
  const quizId = params?.quizId?.toString() ?? "";

  const { data, isPending, error } = useGetSubjectDetails(quizId);

  const { activeSubject } = useActiveSubjectStore();

  const subject =
    activeSubject.subject || data?.data?.subjectName || "Loading...";

  const breadcrumbs = [
    {
      label: "Home",
      href: paths.dashboard(),
    },
    {
      label: "Quiz",
      href: paths.quiz(),
    },
    {
      label: subject,
      href: paths.quizDetails(quizId),
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
          //   const [{ description, title, video }] = data.data;

          return (
            <>
              <section className="bg-[#F6F6F6] py-20 2xl:px-0 lg:px-20 px-10">
                <div className="container mx-auto">
                  <div className="grid grid-cols-2 bg-white rounded-xl py-5 px-7">
                    <div className="col-span-2">
                      <h3 className="font-bold lg:text-xl text-lg mb-4 pb-4 border-b border-[#D9D9D9] text-[#505050]">
                        {data?.data?.title}
                      </h3>
                      <h5 className="font-semibold text-base pb-4 text-[#505050]">
                        {data?.data?.subjectName}
                      </h5>
                      <p
                        className="text-[#505050] mb-3"
                        dangerouslySetInnerHTML={{
                          __html: data?.data?.description,
                        }}
                      ></p>
                    </div>
                    <div className="flex justify-center col-span-2">
                      <Link
                        className="inline-flex gap-2 font-medium rounded-xl 
                items-center bg-[#53A2EB] px-10 py-4 my-5  text-white mx-auto"
                        href={paths.quizBank(quizId)}
                      >
                        <span>
                          <Play color="white" />
                        </span>
                        Start Quiz
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
