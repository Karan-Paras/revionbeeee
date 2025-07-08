"use client";

import { RevisionBee } from "@/assets/icons";
import { OnlineQuiz } from "@/assets/images";
import { useQuizResult } from "@/features/quiz/stores/use-quiz-result";
import { paths } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function QuizFinished() {
  let { subjectId } = useParams();
  subjectId = subjectId?.toString?.() ?? "";

  const router = useRouter();

  const { quizResult } = useQuizResult();

  const { subjectID, totalAttempted, totalQuestions, progress } = quizResult;

  useEffect(() => {
    if (subjectId != subjectID) {
      router.replace(paths.quiz());
    }
  }, [router, subjectID, subjectId]);

  if (subjectId != subjectID) {
    return null;
  }

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
                  {totalQuestions}/{totalQuestions}
                </p>
              </div>
            </div>
            <div className="load relative mt-2.5 w-full">
              <div className="absolute right-0 left-0 h-2 w-full rounded-2xl bg-[#FBBE1B]" />
              <div className="load h-2 w-full rounded-2xl bg-[#EDEDED]" />
            </div>
          </div>
          <div className="bg_shp relative col-span-4 hidden md:order-2 md:block">
            <div className="lgo relative mx-auto flex size-[160px] items-center justify-center rounded-full border border-[#f7f7f7] bg-white shadow-xl">
              <RevisionBee />
            </div>
          </div>
          <div className="order-1 col-span-6 md:order-3 md:col-span-1" />
          <div className="order-4 col-span-6 grid justify-items-center rounded-xl bg-[#F6F6F6] p-4 md:-mt-[50px] md:min-h-[75vh]">
            <div className="img mt-40 flex flex-col items-center">
              <Image src={OnlineQuiz} alt="" />
              <h3 className="mt-4 text-3xl font-bold">Quiz Finished</h3>
            </div>

            <div className="my-16 grid grid-cols-6 justify-center gap-5">
              <div className="2xl:col-span-2 2xl:col-start-2 md:col-span-2 md:col-start-2 col-span-6">
                <div className="itm flex min-h-[170px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-[#53A2EB] bg-white p-5 text-center">
                  <h3 className="text-xl">Total Questions Attempted</h3>
                  <p className="text-3xl font-bold">{totalAttempted}</p>
                </div>
              </div>
              <div className="2xl:col-span-2 md:col-span-2 col-span-6">
                <div className="itm flex min-h-[170px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-[#FBBE1B] bg-white p-5 text-center">
                  <h3 className="text-xl">Total Progress</h3>
                  <p className="text-3xl font-bold">{progress}%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-5 col-span-6">
            <div className="btn flex justify-center gap-3 md:px-0 px-10 md:flex-nowrap flex-wrap md:mt-0 mt-6">
              <Link
                href={paths.quiz()}
                className="md:mt-8 cursor-pointer rounded-2xl text-center w-full bg-[#53A2EB] p-4 px-16 font-medium text-white hover:shadow-sm"
              >
                View All Quizzes
              </Link>
              <Link
                href={paths.quizResult(subjectId)}
                className="md:mt-8 cursor-pointer rounded-2xl text-center w-full bg-[#53A2EB] p-4 px-16 font-medium text-white hover:shadow-sm"
              >
                View Result
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
