import { LandingSlider } from "@/components/sliders/landing-slider";

export function Testimonials() {
  return (
    <section className="py-20 2xl:px-0 xl:px-20 px-10">
      <div className="container mx-auto">
        <div className="grid-cols-2 grid">
          <div className="col-span-2">
            <div className="itm mb-8 flex items-center gap-1.5 capitalize justify-center">
              {/* <span>
                <Minus width={42} height={2} color="#53A2EB" />
              </span> */}
              <p className="text-[#53A2EB]">Testimonials</p>
            </div>
            <h2 className="2xl:text-6xl xl:text-5xl lg:text-5xl text-3xl font-bold xl:leading-normal lg:leading-14 mb-3 text-center">
              What Our Happy <br /> Students Say About Us
            </h2>
          </div>
          <div className="col-span-2" />
        </div>
      </div>
      <LandingSlider />
    </section>
  );
}
