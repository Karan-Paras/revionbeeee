import { Mail, MapPin, Minus, Phone } from "@/lib/icons";

export function ContactUs() {
  return (
    <section
      id="contact"
      className="bg-[#F6F6F6] relative py-20 2xl:px-0 lg:px-20 px-10"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-8">
          <div className="md:col-span-3 col-span-6">
            <div className="itm mb-5 flex items-center gap-1.5 uppercase">
              <span>
                <Minus color="#53A2EB" />
              </span>
              <p className="text-[#53A2EB]">Contact us</p>
            </div>
            <div className="hed">
              <h3 className="font-bold md:text-5xl text-3xl md:leading-16 leading-normal">
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
                <span>
                  <svg width="227" height="1" viewBox="0 0 227 1" fill="none">
                    <rect width="227" height="1" fill="#505050" />
                  </svg>
                </span>
              </div>
              <div className="item flex items-center gap-3 mb-5">
                <span>
                  <MapPin color="#FBBE1B" />
                </span>
                <p className="font-medium">
                  7 Sente Des Pierres Mayettes, 33305 Dijon
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
                <p className="font-medium">support@example.com</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 col-span-6">
            <div className="crd bg-white px-4 lg:py-10 py-5 rounded-xl shadow-md">
              <div className="grid grid-cols-2 gap-6">
                <div className="md:col-span-1 col-span-2">
                  <input
                    className="placeholder-[#22281E] w-full p-4 outline-0 border-[#DEDFDD]  border-b"
                    type="text"
                    placeholder="First Name*"
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <input
                    className="placeholder-[#22281E] w-full p-4 outline-0 border-[#DEDFDD]  border-b"
                    type="text"
                    placeholder="Last Name*"
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <input
                    className="placeholder-[#22281E] w-full p-4 outline-0 border-[#DEDFDD]  border-b"
                    type="email"
                    placeholder="Your Email*"
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <input
                    className="placeholder-[#22281E] w-full p-4 outline-0 inp_spc  border-[#DEDFDD]  border-b"
                    type="number"
                    placeholder="Mobile Number*"
                  />
                </div>
                <div className="col-span-2">
                  <div className="px-4">
                    <label htmlFor="" className="font-medium text-[#394630]">
                      Tell us about you
                    </label>
                    <textarea
                      name=""
                      id=""
                      className="min-h-40 border-b w-full pt-2.5 px-4 border-b-[#dedfdd] outline-0"
                    ></textarea>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-center">
                    <button className="btn bg-[#53A2EB] text-white py-5 px-8 rounded-xl font-semibold ">
                      Submit a Query
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
