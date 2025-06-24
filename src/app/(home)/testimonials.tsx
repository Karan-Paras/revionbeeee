import { TestimonialsSlider } from "@/app/(home)/testimonials-slider";

export function Testimonials() {
  return (
    <section className="px-10 py-20 xl:px-20 2xl:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <div className="itm mb-8 flex items-center justify-center gap-1.5 capitalize">
              <p className="text-[#53A2EB]">Testimonials</p>
            </div>
            <h2 className="mb-3 text-center text-3xl font-bold lg:text-5xl lg:leading-14 xl:text-5xl xl:leading-normal 2xl:text-6xl">
              What Our Happy <br /> Students Say About Us
            </h2>
          </div>
          <div className="col-span-2" />
        </div>
      </div>
      <TestimonialsSlider />
    </section>
  );
}
