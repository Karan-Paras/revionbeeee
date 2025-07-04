import { SupportForm } from "@/features/support/components/support-form";
import { ADDRESS, CONTACT_NUMBER, EMAIL } from "@/features/support/types";
import { Mail, MapPin, Phone } from "@/lib/icons";
import { paths } from "@/routes";
import Link from "next/link";

export function Support() {
  return (
    <section
      id={paths.home.support().split("#")[1]}
      className="relative bg-[#F6F6F6] px-10 py-20 xl:px-20 2xl:px-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-6 md:col-span-3">
            <div className="itm mb-5 flex items-center gap-1.5 capitalize">
              <p className="text-[#53A2EB]">Contact us</p>
            </div>
            <div className="hed">
              <h3 className="mb-3 text-3xl font-bold lg:text-4xl lg:leading-10 xl:text-5xl xl:leading-normal 2xl:text-6xl">
                We&apos;re Here To <br /> Provide 24X7 Support
              </h3>
              <p className="my-4 leading-8 font-light">
                Our team is available at all times to assist you.
              </p>
            </div>
            <div className="addrs my-5">
              <div className="mb-10 flex flex-wrap items-center gap-2.5 md:flex-nowrap">
                <h3 className="text-lg font-bold">Our Address</h3>
              </div>
              <div className="item mb-5 flex items-center gap-3">
                <span>
                  <MapPin color="#FBBE1B" />
                </span>
                <p className="font-medium">{ADDRESS}</p>
              </div>
              <div className="item mb-5 flex items-center gap-3">
                <span>
                  <Phone color="#FBBE1B" />
                </span>
                <p className="font-medium">
                  <Link
                    href={`tel:${CONTACT_NUMBER}`}
                    rel="noopener noreferrer"
                  >
                    {CONTACT_NUMBER}
                  </Link>
                </p>
              </div>
              <div className="item mb-5 flex items-center gap-3">
                <span>
                  <Mail color="#FBBE1B" />
                </span>
                <p className="font-medium">
                  <Link
                    href={`mailto:${EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {EMAIL}
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <SupportForm />
        </div>
      </div>
    </section>
  );
}
