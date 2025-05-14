import FAQAccordion from "@/components/accordians/FAQ-accordion";
import LandingHeader from "@/components/headers/landing-header";
import { Faq, Faq2 } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export default function FAQ() {
  return (
    <>
      <LandingHeader />
      <section className="act_bg relative bg-cover bg-no-repeat min-h-96">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 min-h-80 relative text-center items-end">
            <div className="col-span-2 pb-14">
              <h3 className="font-bold text-5xl text-white">FAQ</h3>

              <div className="flex justify-center gap-3 text-white my-5 uppercase">
                <div className="itm">
                  <Link className="text-white" href="">
                    Home
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#F6F6F6]">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-7">
            <div className="col-span-2">
              <div className="itm flex items-center gap-1.5 uppercase">
                <span>
                  <svg width="42" height="2" viewBox="0 0 42 2" fill="none">
                    <rect y="0.5" width="42" height="1" fill="#53A2EB" />
                  </svg>
                </span>
                <p className="text-[#53A2EB]">Select your Subject</p>
              </div>
              <div className="hed mb-8">
                <h3 className="font-bold text-3xl leading-20">
                  Answer you need to know
                </h3>
                <p className="leading-8">
                  Metus dictum at tempor commodo ullamcorper a lacus vestibulum.
                  In hendrerit gravida rutrum quisque non tellus. Egestas sed
                  sed risus pretium quam vulputate.
                </p>
              </div>
              <FAQAccordion />
            </div>
            <div className="col-span-1">
              <div className="img border-4 border-white rounded-xl overflow-hidden shadow-xl/5">
                <Image src={Faq} alt=""></Image>
              </div>
            </div>
            <div className="col-span-1">
              <div className="img border-4 border-white rounded-xl overflow-hidden shadow-xl/5">
                <Image src={Faq2} alt=""></Image>
              </div>
            </div>
            <div className="col-span-2">
              <div className="itm flex items-center gap-1.5 uppercase">
                <span>
                  <svg width="42" height="2" viewBox="0 0 42 2" fill="none">
                    <rect y="0.5" width="42" height="1" fill="#53A2EB" />
                  </svg>
                </span>
                <p className="text-[#53A2EB]">Select your Subject</p>
              </div>
              <div className="hed mb-8">
                <h3 className="font-bold text-3xl leading-20">
                  Answer you need to know
                </h3>
                <p className="leading-8">
                  Metus dictum at tempor commodo ullamcorper a lacus vestibulum.
                  In hendrerit gravida rutrum quisque non tellus. Egestas sed
                  sed risus pretium quam vulputate.
                </p>
              </div>
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
