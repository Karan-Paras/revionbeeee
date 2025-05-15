import { LandingHeader } from "@/components/headers/landing-header";

export default function Dashboard() {
  return (
    <>
      <LandingHeader />
      <section className="act_bg relative bg-cover bg-no-repeat min-h-96">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 min-h-96 relative text-center items-center">
            <div className="col-span-2 pt-20">
              <h3 className="font-bold text-5xl text-white">Welcome Back !</h3>
              <p className="text-white uppercase my-5">
                Buzzing with Knowledge
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F6F6F6] py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 p-5 bg-white rounded-xl">
            <div className="col-span-3">
              <h3 className="font-semibold text-[#505050] text-2xl">
                Dashboard
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
