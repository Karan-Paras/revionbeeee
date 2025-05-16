"use client";
import { User } from "@/lib/assets";
import { Camera } from "@/lib/icons";
import Image from "next/image";
import { useState } from "react";

export default function MyProfile() {
  const [profilePicture, setProfilePicture] = useState("");
  return (
    <div className="bg-white px-7 py-8 rounded-xl">
      <h3 className="font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
        Profile
      </h3>

      {/* data views */}
      <div className="frm ">
        <div className="profile flex justify-center gap-3.5 flex-col text-center my-10">
          <div className="size-40 border-2 border-white rounded-full mx-auto overflow-hidden">
            <Image src={User} alt=""></Image>
          </div>
          <div className="desc">
            <h3 className="font-bold text-xl">Wade Warren</h3>
            <p>wade@email.com</p>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>Mobile Number</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">+1 0384850840</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>Gender</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">Male</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>City</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">Silverbrook</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>State</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">North Monroe</h3>
          </div>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
          <div className="lbl">
            <p>Address</p>
          </div>
          <div className="blds">
            <h3 className="font-bold">Oakridge Heights, Westlandia 48219</h3>
          </div>
        </div>

        <div className="btn flex justify-center">
          <button className="bg-[#53A2EB] px-10 py-5 text-white rounded-xl flex gap-2 cursor-pointer">
            <span>
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                <g clip-path="url(#clip0_655_5920)">
                  <path
                    d="M15.0416 9.53651C14.6038 9.53651 14.25 9.89122 14.25 10.3281V16.6615C14.25 17.0977 13.8953 17.4531 13.4584 17.4531H2.375C1.93795 17.4531 1.58338 17.0977 1.58338 16.6615V5.57812C1.58338 5.14194 1.93795 4.78651 2.375 4.78651H8.70838C9.14615 4.78651 9.5 4.43179 9.5 3.99489C9.5 3.55784 9.14615 3.20312 8.70838 3.20312H2.375C1.06559 3.20312 0 4.26871 0 5.57812V16.6615C0 17.9709 1.06559 19.0365 2.375 19.0365H13.4584C14.7678 19.0365 15.8334 17.9709 15.8334 16.6615V10.3281C15.8334 9.89035 15.4794 9.53651 15.0416 9.53651Z"
                    fill="white"
                  />
                  <path
                    d="M7.42289 8.81444C7.36752 8.86981 7.33026 8.94026 7.31446 9.01622L6.75478 11.8157C6.72868 11.9454 6.76985 12.0792 6.8632 12.1734C6.93844 12.2486 7.03976 12.2889 7.14355 12.2889C7.16878 12.2889 7.19501 12.2866 7.22111 12.2811L10.0197 11.7214C10.0972 11.7055 10.1677 11.6684 10.2223 11.6129L16.486 5.34921L13.6874 2.55078L7.42289 8.81444Z"
                    fill="white"
                  />
                  <path
                    d="M18.4205 0.616037C17.6488 -0.155867 16.3931 -0.155867 15.622 0.616037L14.5264 1.71163L17.3249 4.5102L18.4205 3.41446C18.7942 3.04163 19.0001 2.54442 19.0001 2.01561C19.0001 1.4868 18.7942 0.989596 18.4205 0.616037Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_655_5920">
                    <rect width="19" height="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>{" "}
            Edit Profile
          </button>
        </div>
      </div>

      {/* edit data */}
      <div className="frm hidden">
        <div className="size-40 mb-4 relative mx-auto  flex items-center justify-center mt-5 border border-white shadow-sm/30 rounded-full">
          <div className="size-full rounded-full overflow-hidden blk bg-cover bg-no-repeat flex items-center justify-center">
            {profilePicture && (
              <Image
                className="object-cover rounded-full w-full h-full "
                src={profilePicture}
                alt="profilePicture"
                width={100}
                height={100}
              />
            )}
          </div>

          <span className="absolute bottom-2 right-0 rounded-full flex items-center justify-center size-10 bg-[#53A2EB]   border border-white  ">
            <Camera />
            <input
              id="profile-picture"
              name="profilePicture"
              className="absolute top-0 bottom-0 w-full left-0 right-0 opacity-0"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) {
                  setProfilePicture(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </span>
        </div>
        <label
          htmlFor=""
          className="text-sm font-light flex justify-center items-center"
        >
          Upload your image
        </label>
        <div className="grid grid-cols-2 gap-10 my-5">
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <label htmlFor="" className="mb-0">
                First Name
              </label>
              <input
                type="text"
                value="Wade"
                className="bg-white py-5 px-6 pe-5 w-full outline-0 rounded-xl border border-[#D8DAE5]"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <label htmlFor="" className="mb-0">
                Last Name
              </label>
              <input
                type="text"
                value="Warren"
                className="bg-white py-5 px-6 pe-5 w-full outline-0 rounded-xl border border-[#D8DAE5]"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <label htmlFor="" className="mb-0">
                City
              </label>
              <input
                type="text"
                value="Silverbrook"
                className="bg-white py-5 px-6 pe-5 w-full outline-0 rounded-xl border border-[#D8DAE5]"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <label htmlFor="" className="mb-0">
                State
              </label>
              <input
                type="text"
                value="North Monroe"
                className="bg-white py-5 px-6 pe-5 w-full outline-0 rounded-xl border border-[#D8DAE5]"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex justify-between h-full flex-wrap items-center">
              <label htmlFor="" className="mb-0 w-full"></label>
              <label htmlFor="">Gender</label>
              <div className="flex gap-4">
                <button className="border-[#53A2EB] border flex gap-2 rounded-lg text-[#53A2EB] font-bold items-center px-5 py-3">
                  <span>
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M12.3781 0.949219H8.50906C8.11655 0.949219 7.80815 1.25762 7.80815 1.65013C7.80815 2.04264 8.11655 2.35104 8.50906 2.35104H10.6679L8.08851 4.93039C6.09793 3.44446 3.26625 3.58464 1.47191 5.37898C-0.490638 7.34153 -0.490638 10.5657 1.47191 12.5283C3.43446 14.4908 6.65866 14.4908 8.62121 12.5283C10.4155 10.7339 10.5838 7.87422 9.06979 5.91167L11.6491 3.33232V5.51916C11.6491 5.91167 11.9575 6.22007 12.3501 6.22007C12.7426 6.22007 13.051 5.91167 13.051 5.51916V1.65013C13.079 1.25762 12.7706 0.949219 12.3781 0.949219ZM7.66797 11.547C6.23811 12.9769 3.91108 12.9769 2.48123 11.547C1.05137 10.1171 1.05137 7.79011 2.48123 6.36025C3.91108 4.93039 6.23811 4.93039 7.66797 6.36025C9.09783 7.79011 9.09783 10.1171 7.66797 11.547Z"
                        fill="#53A2EB"
                      />
                    </svg>
                  </span>{" "}
                  Male
                </button>
                <button className="border-[#9D9D9D] border flex gap-2 rounded-lg text-[#9D9D9D] font-bold items-center px-5 py-3">
                  <span>
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M12.3781 0.949219H8.50906C8.11655 0.949219 7.80815 1.25762 7.80815 1.65013C7.80815 2.04264 8.11655 2.35104 8.50906 2.35104H10.6679L8.08851 4.93039C6.09793 3.44446 3.26625 3.58464 1.47191 5.37898C-0.490638 7.34153 -0.490638 10.5657 1.47191 12.5283C3.43446 14.4908 6.65866 14.4908 8.62121 12.5283C10.4155 10.7339 10.5838 7.87422 9.06979 5.91167L11.6491 3.33232V5.51916C11.6491 5.91167 11.9575 6.22007 12.3501 6.22007C12.7426 6.22007 13.051 5.91167 13.051 5.51916V1.65013C13.079 1.25762 12.7706 0.949219 12.3781 0.949219ZM7.66797 11.547C6.23811 12.9769 3.91108 12.9769 2.48123 11.547C1.05137 10.1171 1.05137 7.79011 2.48123 6.36025C3.91108 4.93039 6.23811 4.93039 7.66797 6.36025C9.09783 7.79011 9.09783 10.1171 7.66797 11.547Z"
                        fill="#9D9D9D"
                      />
                    </svg>
                  </span>{" "}
                  Female
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <label htmlFor="" className="mb-0">
                Mobile
              </label>
              <input
                type="+1 30830506"
                value="North Monroe"
                className="bg-white py-5 px-6 pe-5 w-full outline-0 rounded-xl border border-[#D8DAE5]"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="itm relative gap-1.5 grid">
              <label htmlFor="" className="mb-0">
                Address
              </label>
              <textarea
                className="w-full p-5 border border-[#D8DAE5] outline-0 rounded-xl "
                name=""
                id=""
                value="Oakridge Heights, Westlandia 48219"
              ></textarea>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <button className="bg-[#53A2EB] px-16 py-4 rounded-xl font-semibold text-white shadow-xl/10 cursor-pointer">
                Update Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
