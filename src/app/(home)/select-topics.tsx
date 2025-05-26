import { SelectTopics as SelectTopicsComponent } from "@/features/questions/components/select-topics";

export function SelectTopics() {
  return (
    <section
      id="topics"
      className="py-20 mths_bg relative 2xl:px-0 lg:px-20 px-10"
    >
      <div className="container mx-auto relative">
        <div className="flex mb:mb-8 mb-5 lg:gap-4 gap-7 justify-between md:flex-nowrap flex-wrap">
          <div className="hed">
            <div className="itm mb-5 flex items-center gap-1.5 uppercase">
              <span>
                <svg width="42" height="2" viewBox="0 0 42 2" fill="none">
                  <rect y="0.5" width="42" height="1" fill="#53A2EB" />
                </svg>
              </span>
              <p className="text-[#53A2EB]">Select your Subject</p>
            </div>
            <h2 className="text-4xl font-bold">Select Your Topics!</h2>
          </div>
          <div className="btn">
            <button className="border-[#53A2EB] text-[#53A2EB] font-semibold flex gap-2 items-center rounded-xl border-2 px-6 py-4 cursor-pointer hover:bg-[#53A2EB] hover:text-white group">
              Browse all Subjects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  className="group-hover:fill-[#fff]"
                  d="M11.3371 4.19204L2.02916 13.5L0.5 11.9708L9.80688 2.66288H1.60415V0.5H13.5V12.3958H11.3371V4.19204Z"
                  fill="#53A2EB"
                />
              </svg>
            </button>
          </div>
        </div>
        <SelectTopicsComponent />
      </div>
    </section>
  );
}
