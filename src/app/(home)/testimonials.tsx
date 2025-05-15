import { LandingSlider } from "@/components/sliders/landing-slider";

export function Testimonials() {
  return (
    <section className="py-20 2xl:px-0 lg:px-20">
      <div className="container mx-auto">
        <div className="gird-cols-2">
          <div className="col-span-2">
            <div className="itm mb-8 flex items-center gap-1.5 uppercase justify-center">
              <span>
                <svg width="42" height="2" viewBox="0 0 42 2" fill="none">
                  <rect y="0.5" width="42" height="1" fill="#53A2EB" />
                </svg>
              </span>{" "}
              <p className="text-[#53A2EB]">Testimonials</p>
            </div>
            <h2 className="font-bold text-6xl text-center leading-20 mb-8">
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
