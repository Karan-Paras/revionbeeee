import { SelectTopics } from "@/features/questions/components/select-topics";
import Link from "next/link";

export default function Question() {
  return (
    <>
      <section className="act_bg relative bg-cover bg-no-repeat md:px-0 px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 min-h-96 relative text-center items-center">
            <div className="col-span-2 pt-20">
              <h3 className="font-bold md:text-5xl text-4xl text-white">
                Question Bank
              </h3>
              <div className="flex justify-center gap-3 text-white my-5 uppercase md:text-lg text-sm">
                <div className="itm">
                  <Link className="text-white" href="">
                    Home
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    Track Progress
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="topics"
        className="py-20 md:px-0 px-10 mths_bg relative 2xl:px-0 lg:px-20"
      >
        <div className="container mx-auto relative">
          <SelectTopics />
        </div>
      </section>
    </>
  );
}
