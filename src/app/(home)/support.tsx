import { SupportForm } from "@/features/support/components/support-form";
import { Mail, MapPin, Phone } from "@/lib/icons";
import { paths } from "@/routes";

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
              {/* <span>
                <Minus color="#53A2EB" />
              </span> */}
              <p className="text-[#53A2EB]">Contact us</p>
            </div>
            <div className="hed">
              <h3 className="mb-3 text-3xl font-bold lg:text-4xl lg:leading-10 xl:text-5xl xl:leading-normal 2xl:text-6xl">
                We&apos;re Here To <br /> Provide 24X7 Support
              </h3>
              <p className="my-4 leading-8 font-light">
                Sit amet dictum sit amet justo donec enim. Posuere lorem ipsum
                dolor sit amet consectetur. Tristique senectus et netus et
                malesuada fames ac.
              </p>
            </div>
            <div className="addrs my-5">
              <div className="mb-10 flex flex-wrap items-center gap-2.5 md:flex-nowrap">
                <h3 className="text-lg font-bold">Our Address</h3>
                {/* <span>
                  <svg width="227" height="1" viewBox="0 0 227 1" fill="none">
                    <rect width="227" height="1" fill="#505050" />
                  </svg>
                </span> */}
              </div>
              <div className="item mb-5 flex items-center gap-3">
                <span>
                  <MapPin color="#FBBE1B" />
                </span>
                <p className="font-medium">
                  RevisionBee LLC 30 N Gould St Ste N Sheridan, WY 82801
                </p>
              </div>
              <div className="item mb-5 flex items-center gap-3">
                <span>
                  <Phone color="#FBBE1B" />
                </span>
                <p className="font-medium">000-123-45 67 89</p>
              </div>
              <div className="item mb-5 flex items-center gap-3">
                <span>
                  <Mail color="#FBBE1B" />
                </span>
                <p className="font-medium">support@revisionbee.com</p>
              </div>
            </div>
          </div>
          <SupportForm />
        </div>
      </div>
    </section>
  );
}
