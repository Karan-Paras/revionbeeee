import { SupportForm } from "@/features/support/components/support-form";
import { Mail, MapPin, Phone } from "@/lib/icons";

export function Support() {
  return (
    <section
      id="contact"
      className="bg-[#F6F6F6] relative py-20 2xl:px-0 xl:px-20 px-10"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-8">
          <div className="md:col-span-3 col-span-6">
            <div className="itm mb-5 flex items-center gap-1.5 capitalize">
              {/* <span>
                <Minus color="#53A2EB" />
              </span> */}
              <p className="text-[#53A2EB]">Contact us</p>
            </div>
            <div className="hed">
              <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl text-3xl font-bold xl:leading-normal lg:leading-10 mb-3">
                We&apos;re Here To <br /> Provide 24X7 Support
              </h3>
              <p className="font-light leading-8 my-4">
                Sit amet dictum sit amet justo donec enim. Posuere lorem ipsum
                dolor sit amet consectetur. Tristique senectus et netus et
                malesuada fames ac.
              </p>
            </div>
            <div className="addrs my-5">
              <div className="flex items-center gap-2.5 mb-10  md:flex-nowrap flex-wrap">
                <h3 className="font-bold text-lg">Our Address</h3>
                {/* <span>
                  <svg width="227" height="1" viewBox="0 0 227 1" fill="none">
                    <rect width="227" height="1" fill="#505050" />
                  </svg>
                </span> */}
              </div>
              <div className="item flex items-center gap-3 mb-5">
                <span>
                  <MapPin color="#FBBE1B" />
                </span>
                <p className="font-medium">
                  RevisionBee LLC 30 N Gould St Ste N Sheridan, WY 82801
                </p>
              </div>
              <div className="item flex items-center gap-3 mb-5">
                <span>
                  <Phone color="#FBBE1B" />
                </span>
                <p className="font-medium">000-123-45 67 89</p>
              </div>
              <div className="item flex items-center gap-3 mb-5">
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
