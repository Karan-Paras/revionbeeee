import { Accordion } from "@/app/(support)/faq/accordion";
import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { Faq, Faq2 } from "@/lib/assets";
import { paths } from "@/routes";
import { Minus } from "lucide-react";
import Image from "next/image";

export default function FaqPage() {
  return (
    <>
      <BreadcrumbBanner
        title="FAQ"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "FAQ",
            href: paths.faq(),
          },
        ]}
      />
      <section className="bg-[#F6F6F6] py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-7">
            <div className="col-span-2">
              <div className="itm flex items-center gap-1.5 uppercase">
                <span>
                  <Minus width={42} height={2} color="#53A2EB" />
                </span>
                <p className="text-[#53A2EB]">Select your Subject</p>
              </div>
              <div className="hed mb-8">
                <h3 className="text-3xl leading-20 font-bold">
                  Answer you need to know
                </h3>
                <p className="leading-8">
                  Metus dictum at tempor commodo ullamcorper a lacus vestibulum.
                  In hendrerit gravida rutrum quisque non tellus. Egestas sed
                  sed risus pretium quam vulputate.
                </p>
              </div>
              <Accordion />
            </div>
            <div className="col-span-1">
              <div className="img overflow-hidden rounded-xl border-4 border-white shadow-xl/5">
                <Image src={Faq} alt="Faq" />
              </div>
            </div>
            <div className="col-span-1">
              <div className="img overflow-hidden rounded-xl border-4 border-white shadow-xl/5">
                <Image src={Faq2} alt="Faq2" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="itm flex items-center gap-1.5 uppercase">
                <span>
                  <Minus width={42} height={2} color="#53A2EB" />
                </span>
                <p className="text-[#53A2EB]">Select your Subject</p>
              </div>
              <div className="hed mb-8">
                <h3 className="text-3xl leading-20 font-bold">
                  Answer you need to know
                </h3>
                <p className="leading-8">
                  Metus dictum at tempor commodo ullamcorper a lacus vestibulum.
                  In hendrerit gravida rutrum quisque non tellus. Egestas sed
                  sed risus pretium quam vulputate.
                </p>
              </div>
              <Accordion />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
