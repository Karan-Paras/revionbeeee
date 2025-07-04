import { Accordion } from "@/app/(support)/faq/accordion";
import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { Faq, Faq2 } from "@/lib/assets";
import { paths } from "@/routes";
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
      <section className="bg-[#F6F6F6] px-10 py-20 xl:px-20 2xl:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-7">
            <div className="2xl:col-span-2 col-span-3">
              <div className="itm flex items-center gap-1.5 uppercase">
                <p className="text-[#53A2EB]">Questions Related To</p>
              </div>
              <div className="hed mb-8">
                <h3 className="text-3xl 2xl:leading-20 leading-normal font-bold">
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
            <div className="2xl:col-span-1 col-span-3">
              <div className="img overflow-hidden rounded-xl border-4 border-white shadow-xl/5">
                <Image src={Faq} alt="Faq" />
              </div>
            </div>
            <div className="2xl:col-span-1 col-span-3">
              <div className="img overflow-hidden rounded-xl border-4 border-white shadow-xl/5">
                <Image src={Faq2} alt="Faq2" />
              </div>
            </div>
            <div className="2xl:col-span-2 col-span-3">
              <div className="itm flex items-center gap-1.5 uppercase">
                <p className="text-[#53A2EB]">Select your Subject</p>
              </div>
              <div className="hed mb-8">
                <h3 className="text-3xl 2xl:leading-20 leading-normal font-bold">
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
