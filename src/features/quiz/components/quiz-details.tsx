"use client";

import { Play } from "@/assets/icons";
import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetSubjectDetails } from "@/features/subjects/queries/use-get-subject-details";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";
import { paths } from "@/routes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export function QuizDetails() {
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
          const { subjectName, quizzes } = data.data;

          const quiz = (quizzes ?? [])[0];

          return (
            <section className="bg-[#F6F6F6] px-10 py-20 lg:px-20 2xl:px-0">
              <div className="container mx-auto">
                <div className="grid grid-cols-2 rounded-xl bg-white px-7 py-5">
                  <div className="col-span-2">
                    <h3 className="mb-4 border-b border-[#D9D9D9] pb-4 text-lg font-bold text-[#505050] lg:text-xl">
                      {subjectName}
                    </h3>
                    <h5 className="pb-4 text-base font-semibold text-[#505050]">
                      {quiz?.title || "Title not available"}
                    </h5>
                    <p
                      className="mb-3 text-[#505050]"
                      dangerouslySetInnerHTML={{
                        __html: quiz?.description || "",
                      }}
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Link
                      className="mx-auto my-5 inline-flex items-center gap-2 rounded-xl bg-[#53A2EB] px-10 py-4 font-medium text-white"
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
          );
        }
      })()}
    </>
  );
}
