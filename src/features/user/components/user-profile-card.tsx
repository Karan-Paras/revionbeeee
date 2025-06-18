"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataLoader } from "@/components/loaders/data-loader";
import { useGetProfile } from "@/features/user/queries/use-get-profile";

import { SquarePencil } from "@/lib/icons";
import { getUserImageUrl } from "@/lib/media-urls";

import { paths } from "@/routes";

export function UserProfileCard() {
  const { data, isPending, error } = useGetProfile();

  if (isPending) {
    return <DataLoader />;
  }

  if (error) {
    toast.error(error.message);
  }

  if (data) {
    const user = data.data;

    const {
      firstName,
      lastName,
      profilePicture,
      email,
      phoneNumber,
      gender,
      city,
      state,
      address,
    } = user;

    return (
      <div className="bg-white px-7 py-8 rounded-xl">
        <h3 className="font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
          Profile
        </h3>
        <div className="frm">
          <div className="profile flex justify-center gap-3.5 flex-col text-center my-10">
            {profilePicture ? (
              <div className="size-40 border-2 border-white rounded-full mx-auto overflow-hidden relative">
                <Image
                  src={getUserImageUrl(profilePicture)}
                  alt="ProfilePicture"
                  className="object-cover"
                  fill
                />
              </div>
            ) : (
              <div className="size-40 border-2 border-white rounded-full mx-auto overflow-hidden bg-blue-500">
                <div className="flex items-center justify-center rounded-full bg-muted text-white font-bold text-4xl w-full h-full">
                  {firstName?.charAt(0).toUpperCase() || "R"}
                </div>
              </div>
            )}
            <div className="desc">
              <h3 className="font-bold text-xl">
                {firstName}&nbsp;{lastName}
              </h3>
              <p>{email}</p>
            </div>
          </div>
          <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
            <div className="lbl">
              <p>Mobile Number</p>
            </div>
            <div className="blds">
              <h3 className="font-bold">{phoneNumber || "-"}</h3>
            </div>
          </div>
          <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
            <div className="lbl">
              <p>Gender</p>
            </div>
            <div className="blds">
              <h3 className="font-bold">{gender || "-"}</h3>
            </div>
          </div>
          <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
            <div className="lbl">
              <p>City</p>
            </div>
            <div className="blds">
              <h3 className="font-bold">{city || "-"}</h3>
            </div>
          </div>
          <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
            <div className="lbl">
              <p>State</p>
            </div>
            <div className="blds">
              <h3 className="font-bold">{state || "-"}</h3>
            </div>
          </div>
          <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-[#505050] mb-7">
            <div className="lbl">
              <p>Address</p>
            </div>
            <div className="blds">
              <h3 className="font-bold">{address || "-"}</h3>
            </div>
          </div>

          <div className="btn flex justify-center">
            <Link href={paths.accounts.editProfile()}>
              <Button
                className="px-10 py-5 flex gap-2 cursor-pointer w-auto"
                variant="rounded"
              >
                <span>
                  <SquarePencil />
                </span>
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
