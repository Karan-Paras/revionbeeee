"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreateProfile() {
  const { control } = useForm();

  const [profilePicture, setProfilePicture] = useState("");

  return (
    <div className="mx-auto max-w-md w-11/12 h-full content-center">
      <div className="hed my-3.5 text-center">
        <h1 className="text-3xl font-bold text-center mb-2">Create profile</h1>
        <p className="text-[#505050] text-sm">
          Enter your profile details to continue.
        </p>
      </div>
      <div className="spc_frm">
        <form action="">
          <div className="grid grid-cols-2">
            <div className="col-span-2">
              <div className="w-28 h-28 mb-4 relative mx-auto  flex items-center justify-center mt-5 border-dotted border rounded-full">
                <div className="size-[6.6rem] rounded-full overflow-hidden blk bg-cover bg-no-repeat flex items-center justify-center">
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

                <span className="absolute bottom-0 right-0 rounded-full flex items-center justify-center w-8 h-8 bg-[#53A2EB]   border border-white  ">
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.2017 2.90238H13.66C13.494 2.90438 13.3309 2.85923 13.1896 2.77217C13.0483 2.68511 12.9346 2.55972 12.8617 2.41059L12.2203 1.13478C12.0588 0.808144 11.8088 0.533418 11.4988 0.341884C11.1888 0.15035 10.8313 0.0497068 10.4669 0.0514129H6.53258C6.1682 0.0497068 5.81067 0.15035 5.50069 0.341884C5.19071 0.533418 4.94073 0.808144 4.77924 1.13478L4.13777 2.41059C4.06491 2.55972 3.95121 2.68511 3.8099 2.77217C3.66859 2.85923 3.50546 2.90438 3.3395 2.90238H2.79781C2.27798 2.90238 1.77943 3.10889 1.41185 3.47647C1.04427 3.84405 0.837769 4.34259 0.837769 4.86243V11.9899C0.837769 12.5097 1.04427 13.0082 1.41185 13.3758C1.77943 13.7434 2.27798 13.9499 2.79781 13.9499H14.2017C14.7215 13.9499 15.2201 13.7434 15.5877 13.3758C15.9552 13.0082 16.1617 12.5097 16.1617 11.9899V4.86243C16.1617 4.34259 15.9552 3.84405 15.5877 3.47647C15.2201 3.10889 14.7215 2.90238 14.2017 2.90238ZM8.49975 11.4553C7.75967 11.4553 7.03622 11.2358 6.42087 10.8247C5.80551 10.4135 5.3259 9.8291 5.04269 9.14536C4.75947 8.46162 4.68537 7.70924 4.82975 6.98339C4.97413 6.25753 5.33052 5.59079 5.85383 5.06747C6.37714 4.54416 7.04389 4.18778 7.76974 4.0434C8.4956 3.89901 9.24797 3.97312 9.93172 4.25633C10.6155 4.53955 11.1999 5.01916 11.611 5.63451C12.0222 6.24986 12.2417 6.97332 12.2417 7.7134C12.2398 8.70523 11.8449 9.6559 11.1436 10.3572C10.4423 11.0586 9.49159 11.4534 8.49975 11.4553Z"
                      fill="white"
                    />
                    <path
                      d="M8.49932 10.386C9.97546 10.386 11.1721 9.18933 11.1721 7.71319C11.1721 6.23705 9.97546 5.04041 8.49932 5.04041C7.02318 5.04041 5.82654 6.23705 5.82654 7.71319C5.82654 9.18933 7.02318 10.386 8.49932 10.386Z"
                      fill="white"
                    />
                  </svg>
                  <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <input
                        {...field}
                        className="absolute top-0 bottom-0 w-full left-0 right-0 opacity-0"
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files?.[0]) {
                            onChange(e.target.files[0]);
                            setProfilePicture(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }}
                        value={
                          typeof value === "object" &&
                          "fileName" in value &&
                          typeof value.fileName === "string"
                            ? value.fileName
                            : ""
                        }
                      />
                    )}
                  />
                </span>
              </div>
              <p className="text-center text-[#505050] text-sm">
                Upload your image
              </p>
            </div>
            <div className="col-span-2">
              <div className="itm relative mb-3.5 mt-5">
                <label htmlFor="" className="w-full text-sm">
                  First name
                </label>
                <div className="user_bg icn_bg relative my-1.5">
                  <input
                    type="text"
                    className="bg-white py-5 ps-12 pe-5 w-full outline-0 rounded-xl"
                    placeholder="Enter your First Name"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="itm relative mb-3.5">
                <label htmlFor="" className="w-full text-sm">
                  Last name
                </label>
                <div className="user_bg icn_bg relative my-1.5">
                  <input
                    type="text"
                    className="bg-white py-5 ps-12 pe-5 w-full outline-0 rounded-xl"
                    placeholder="Enter your Last Name"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="itm relative mb-16">
                <label htmlFor="" className="w-full text-sm">
                  Mobile Number
                </label>
                <div className="mob_bg icn_bg relative my-1.5">
                  <input
                    type="number"
                    className="bg-white py-5 ps-12 pe-5 w-full outline-0 inp_spc rounded-xl"
                    placeholder="Enter Mobile Number"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="itm relative mb-3.5">
                <div className="btn">
                  <Link href="/subscription-plans">
                    {" "}
                    <button className="bg-[#53A2EB] w-full rounded-md text-white p-4 font-medium cursor-pointer">
                      Create Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
