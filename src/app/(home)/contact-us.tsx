export function ContactUs() {
  return (
    <section
      id="contact"
      className="bg-[#F6F6F6] relative py-20 2xl:px-0 lg:px-20"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-3">
            <div className="itm mb-5 flex items-center gap-1.5 uppercase">
              <span>
                <svg width="42" height="2" viewBox="0 0 42 2" fill="none">
                  <rect y="0.5" width="42" height="1" fill="#53A2EB" />
                </svg>
              </span>{" "}
              <p className="text-[#53A2EB]">Contact us</p>
            </div>
            <div className="hed">
              <h3 className="font-bold text-5xl leading-16">
                We&apos;re Here To <br /> Provide 24X7 Support
              </h3>
              <p className="font-light leading-8 my-4">
                Sit amet dictum sit amet justo donec enim. Posuere lorem ipsum
                dolor sit amet consectetur. Tristique senectus et netus et
                malesuada fames ac.
              </p>
            </div>
            <div className="addrs my-5">
              <div className="flex items-center gap-2.5 mb-10">
                <h3 className="font-bold text-lg">Our Address</h3>{" "}
                <span>
                  <svg width="227" height="1" viewBox="0 0 227 1" fill="none">
                    <rect width="227" height="1" fill="#505050" />
                  </svg>
                </span>
              </div>
              <div className="item flex items-center gap-3 mb-5">
                <span>
                  <svg width="18" height="25" viewBox="0 0 18 25" fill="none">
                    <path
                      d="M8.0625 24.0312C1.21875 14.1875 0 13.1562 0 9.5C0 4.53125 3.98438 0.5 9 0.5C13.9688 0.5 18 4.53125 18 9.5C18 13.1562 16.7344 14.1875 9.89062 24.0312C9.46875 24.6875 8.48438 24.6875 8.0625 24.0312ZM9 13.25C11.0625 13.25 12.75 11.6094 12.75 9.5C12.75 7.4375 11.0625 5.75 9 5.75C6.89062 5.75 5.25 7.4375 5.25 9.5C5.25 11.6094 6.89062 13.25 9 13.25Z"
                      fill="#FBBE1B"
                    />
                  </svg>
                </span>
                <p className="font-medium">
                  7 Sente Des Pierres Mayettes, 33305 Dijon
                </p>
              </div>
              <div className="item flex items-center gap-3 mb-5">
                <span>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path
                      d="M23.2969 17.7988C23.6719 17.9863 23.9531 18.4082 23.9531 18.877C23.9531 18.9238 23.9531 19.0176 23.9531 19.1113L22.8281 23.9863C22.6875 24.502 22.2656 24.8301 21.75 24.8301C9.70312 24.8301 0 15.127 0 3.08008C0 2.56445 0.328125 2.14258 0.84375 2.00195L5.71875 0.876953C5.8125 0.876953 5.90625 0.830078 5.95312 0.830078C6.42188 0.830078 6.84375 1.11133 7.03125 1.5332L9.28125 6.7832C9.32812 6.92383 9.375 7.06445 9.375 7.20508C9.375 7.58008 9.1875 7.9082 8.95312 8.0957L6.09375 10.4395C7.82812 14.0957 10.7344 17.002 14.3906 18.7363L16.7344 15.877C16.9219 15.6426 17.25 15.4551 17.5781 15.4551C17.7656 15.4551 17.9062 15.502 18.0469 15.5488L23.2969 17.7988Z"
                      fill="#FBBE1B"
                    />
                  </svg>
                </span>
                <p className="font-medium">000-123-45 67 89</p>
              </div>
              <div className="item flex items-center gap-3 mb-5">
                <span>
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.665 14.3284C23.0521 13.8122 23.1812 13.1671 23.1812 12.5219V3.87664C23.1812 3.23148 23.0521 2.58644 22.665 2.07031L15.6973 8.65093L22.665 14.3284Z"
                      fill="#FBBE1B"
                    />
                    <path
                      d="M22.1486 1.29574C21.5034 0.65058 20.6002 0.392578 19.826 0.392578H4.34214C3.43891 0.392578 2.66469 0.779612 2.01953 1.29574L11.826 10.7152C11.955 10.8442 12.2131 10.8442 12.4712 10.7152L22.1486 1.29574Z"
                      fill="#FBBE1B"
                    />
                    <path
                      d="M4.21319 15.8765H19.6971C20.6003 15.8765 21.3745 15.6185 22.0196 14.9733L15.0519 9.2959L12.4712 11.7475C12.2132 12.0056 11.6971 12.0056 11.439 11.7475L8.85836 9.2959L1.89062 14.9733C2.53579 15.6185 3.439 15.8765 4.21319 15.8765Z"
                      fill="#FBBE1B"
                    />
                    <path
                      d="M8.21339 8.65093L1.24565 2.07031C0.858556 2.58644 0.729492 3.23148 0.729492 3.87664V12.5219C0.729492 13.1671 0.858556 13.8122 1.24565 14.3284L8.21339 8.65093Z"
                      fill="#FBBE1B"
                    />
                  </svg>
                </span>
                <p className="font-medium">support@example.com</p>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="crd bg-white px-4 py-10 rounded-xl shadow-md">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <input
                    className="placeholder-[#22281E] w-full p-4 outline-0 border-[#DEDFDD]  border-b"
                    type="text"
                    placeholder="First Name*"
                  />
                </div>
                <div className="col-span-1">
                  <input
                    className="placeholder-[#22281E] w-full p-4 outline-0 border-[#DEDFDD]  border-b"
                    type="text"
                    placeholder="Last Name*"
                  />
                </div>
                <div className="col-span-1">
                  <input
                    className="placeholder-[#22281E] w-full p-4 outline-0 border-[#DEDFDD]  border-b"
                    type="email"
                    placeholder="Your Email*"
                  />
                </div>
                <div className="col-span-1">
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
