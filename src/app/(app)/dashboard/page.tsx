import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { ClockFading, SyncCheck, HelpLightBulb } from "@/lib/icons";

export default function Dashboard() {
  return (
    <>
      <BreadcrumbBanner
        title="Welcome Back!"
        breadcrumbs={[
          {
            label: "Buzzing with Knowledge",
            href: "#",
          },
        ]}
      />
      <section className="bg-[#F6F6F6] py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 p-8 bg-white rounded-xl gap-8">
            <div className="col-span-3">
              <h3 className="font-semibold text-[#505050] text-2xl pb-3 border-b border-[#D9D9D9]">
                Dashboard
              </h3>
            </div>
            <div className="md:col-span-1 col-span-3">
              <div className="border-dashed border border-[#53A2EB] bg-[#F2F9FF] rounded-2xl grid content-center justify-items-center gap-4 min-h-80">
                <div className="size-32 rounded-full overflow-hidden bg-white flex justify-center items-center">
                  <HelpLightBulb />
                </div>
                <div className="desc text-center">
                  <h3 className="font-bold text-4xl mb-2.5">30</h3>
                  <p className="text-xl font-light">Total Quiz</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 col-span-3">
              <div className="border-dashed border border-[#FBBE1B] bg-[#FFFAEB] rounded-2xl grid content-center justify-items-center gap-4 min-h-80">
                <div className="size-32 rounded-full overflow-hidden bg-white flex justify-center items-center">
                  <ClockFading />
                </div>
                <div className="desc text-center">
                  <h3 className="font-bold text-4xl mb-2.5">60 %</h3>
                  <p className="text-xl font-light">In Progress Topics</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 col-span-3">
              <div className="border-dashed border border-[#13C38B] bg-[#EFFFFA] rounded-2xl grid content-center justify-items-center gap-4 min-h-80">
                <div className="size-32 rounded-full overflow-hidden bg-white flex justify-center items-center">
                  <SyncCheck />
                </div>
                <div className="desc text-center">
                  <h3 className="font-bold text-4xl mb-2.5">90</h3>
                  <p className="text-xl font-light">Total Quiz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
