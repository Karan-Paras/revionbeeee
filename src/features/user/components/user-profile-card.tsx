"use  client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SquarePencil } from "@/lib/icons";
import Link from "next/link";
import { paths } from "@/routes";
import { getProfile } from "@/features/user/api/get-profile";
import { getUserImageUrl } from "@/lib/media-urls";

export async function UserProfileCard() {
  const json = await getProfile();

  const user = json.data;

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
    <div className="frm">
      <div className="profile flex justify-center gap-3.5 flex-col text-center my-10">
        {profilePicture ? (
          <div className="size-40 border-2 border-white rounded-full mx-auto overflow-hidden">
            <Image
              src={getUserImageUrl(profilePicture)}
              alt="ProfilePicture"
              className="object-cover"
              width={160}
              height={160}
            />
          </div>
        ) : (
          <div className="size-40 border-2 border-white rounded-full mx-auto overflow-hidden bg-blue-500">
            <div className="flex items-center justify-center rounded-full bg-muted text-white font-bold text-4xl w-full h-full">
              {firstName?.charAt(0).toUpperCase()}
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
  );
}
