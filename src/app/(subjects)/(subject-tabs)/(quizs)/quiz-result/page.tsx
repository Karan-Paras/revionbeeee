import { OnlineQuiz } from "@/lib/assets";
import { RevisionBee } from "@/lib/icons";
import Image from "next/image";

export default function QuizResult() {
  return <>
    <section className="py-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-6 ">
          <div className="col-span-1">
            <div className="flex justify-between items-center">
              <div className="hed">
                <h3 className="font-semibold text-2xl">Questions</h3>
              </div>
              <div className="count">
                <p>30/30</p>
              </div>
            </div>
            <div className="load w-full relative mt-2.5">
              <div className="h-2 rounded-2xl bg-[#FBBE1B] absolute left-0 right-0 w-full"></div>
              <div className="load w-full h-2 bg-[#EDEDED] rounded-2xl"></div>
            </div>
          </div>
          <div className="col-span-4 relative bg_shp">
            <div className="lgo size-[160px] mx-auto bg-white shadow-xl border border-[#f7f7f7] rounded-full flex justify-center items-center relative">
              <RevisionBee />
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-6 bg-[#F6F6F6] py-4 px-10 rounded-xl grid -mt-[50px]">
            <div className="img mt-40 flex items-center flex-col">
              <Image src={OnlineQuiz} alt=""></Image>
              <h3 className="font-bold mt-4 text-3xl">Quiz Finished</h3>
            </div>

            <div className="grid grid-cols-6 gap-5 my-16 justify-center">
              <div className="col-span-2 col-start-2">
                <div className="itm border-[#53A2EB] border-2 p-5 rounded-xl text-center min-h-[170px] flex justify-center items-center flex-col gap-2 bg-white">
                  <h3 className="text-xl">Total Questions Attamed</h3>
                  <p className="font-bold text-3xl">30</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="itm border-[#FBBE1B] border-2 p-5 rounded-xl text-center min-h-[170px] flex justify-center items-center flex-col gap-2 bg-white">
                  <h3 className="text-xl">Total Progress</h3>
                  <p className="font-bold text-3xl">60%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="btn flex justify-center">
              <button className="bg-[#53A2EB] p-4 text-white mt-8 px-16 rounded-2xl font-medium cursor-pointer hover:shadow-sm">View All Quiz</button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>
}