"use client";

// import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetTopics } from "@/features/subjects/queries/use-get-topics";
import { useActiveSubjectStore } from "@/features/subjects/stores/use-active-subject-store";
import { ChevronRight } from "@/lib/icons";
import { paths } from "@/routes";
import { ID } from "@/types/globals";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SelectTopicsProps {
  maxLength?: number;
}

export function SelectTopics({ maxLength }: SelectTopicsProps) {
  const { data, isPending, error } = useGetTopics();

  const { setActiveSubject } = useActiveSubjectStore();

  const router = useRouter();

  const onSubjectClick = (
    topicId: ID,
    topicName: string,
    subjectName: string
  ) => {
    setActiveSubject(topicName, subjectName);
    router.push(paths.quizDetails(topicId));
  };

  if (isPending) {
    return <DataLoader />;
  }

  if (error) {
    toast.error(error.message);
  }

  if (data) {
    let topics = data.data;

    if (maxLength && topics.length > maxLength) {
      topics = topics.slice(0, maxLength);
    }

    // const breadcrumbs = [
    //   {
    //     label: "Home",
    //     href: paths.dashboard(),
    //   },
    //   {
    //     label: "Quiz",
    //     href: paths.quiz(),
    //   },
    //   // {
    //   //   label: quiz,
    //   //   href: paths.quizDetails(quizId),
    //   // },
    // ];

    return (
      <>
        {/* <BreadcrumbBanner title={subject} breadcrumbs={breadcrumbs} /> */}
        <div className="grid grid-cols-3 gap-7">
          {topics.map(({ id, subjects, topicName }) => (
            <div key={id} className="md:col-span-1 col-span-3">
              <div className="itm p-2 bg-white rounded-xl shadow-xl">
                <div className="hed bg-[#F5F5F5] rounded-xl content-center text-center min-h-24">
                  <h3 className="font-bold md:text-2xl text-xl">{topicName}</h3>
                </div>
                <ul className="overflow-y-auto max-h-[410px] min-h-[400px]">
                  {subjects.map(({ id, subjectName }) => (
                    <li
                      key={id}
                      className="flex justify-between border-b border-[#DEDEDE] p-5 items-center"
                    >
                      <button
                        className="w-full flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          onSubjectClick(id, topicName, subjectName)
                        }
                      >
                        <p className="font-semibold uppercase">{subjectName}</p>
                        <span>
                          <ChevronRight />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
