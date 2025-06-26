"use client";

import { DataLoader } from "@/components/loaders/data-loader";
import { Button } from "@/components/ui/button";
import { BillingModal } from "@/features/subscriptions/components/billing-modal";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { Crown, SquarePencil } from "@/lib/icons";
import { getUserImageUrl } from "@/lib/media-urls";
import { paths } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function UserProfileCard() {
  const { data, isPending, error } = useGetProfile();
  const { shouldBlock, triggerPaywall } = usePaywall();

  const [showBillingModal, setShowBillingModal] = useState(false);

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

    const onClick = () => {
      if (!data.data.customerId) {
        triggerPaywall();
        return;
      }

      setShowBillingModal(true);
    };

    return (
      <>
        {showBillingModal && (
          <BillingModal onClose={() => setShowBillingModal(false)} />
        )}
        <div className="rounded-xl bg-white px-7 py-8">
          <div className="mb-5 flex items-center justify-between border-b border-[#D9D9D9] pb-3">
            <h3 className="text-2xl font-bold">Profile</h3>
            <Button onClick={onClick} variant="secondary" className="w-auto">
              Billing
            </Button>
          </div>
          <div className="frm">
            <div className="profile my-10 flex flex-col justify-center gap-3.5 text-center">
              {!shouldBlock && (
                <div className="relative flex justify-center">
                  <span className="absolute top-4 -right-32 left-0 z-50 mx-auto flex size-12 items-center justify-center rounded-full border-2 border-white bg-black p-2">
                    <Crown />
                  </span>
                </div>
              )}
              {profilePicture ? (
                <div className="relative mx-auto size-40 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={getUserImageUrl(profilePicture)}
                    alt="ProfilePicture"
                    className="object-cover"
                    fill
                  />
                </div>
              ) : (
                <div className="mx-auto size-40 overflow-hidden rounded-full border-2 border-white bg-blue-500">
                  <div className="bg-muted flex h-full w-full items-center justify-center rounded-full text-4xl font-bold text-white">
                    {firstName?.charAt(0).toUpperCase() || "R"}
                  </div>
                </div>
              )}
              <div className="desc">
                <h3 className="text-xl font-bold">
                  {firstName}&nbsp;{lastName}
                </h3>
                <p>{email}</p>
              </div>
            </div>
            <div className="mb-7 flex justify-between border-b border-[#E6E6E6] pb-3 text-[#505050]">
              <div className="lbl">
                <p>Mobile Number</p>
              </div>
              <div className="blds">
                <h3 className="font-bold">{phoneNumber || "-"}</h3>
              </div>
            </div>
            <div className="mb-7 flex justify-between border-b border-[#E6E6E6] pb-3 text-[#505050]">
              <div className="lbl">
                <p>Gender</p>
              </div>
              <div className="blds">
                <h3 className="font-bold">{gender || "-"}</h3>
              </div>
            </div>
            <div className="mb-7 flex justify-between border-b border-[#E6E6E6] pb-3 text-[#505050]">
              <div className="lbl">
                <p>City</p>
              </div>
              <div className="blds">
                <h3 className="font-bold">{city || "-"}</h3>
              </div>
            </div>
            <div className="mb-7 flex justify-between border-b border-[#E6E6E6] pb-3 text-[#505050]">
              <div className="lbl">
                <p>State</p>
              </div>
              <div className="blds">
                <h3 className="font-bold">{state || "-"}</h3>
              </div>
            </div>
            <div className="mb-7 flex justify-between border-b border-[#E6E6E6] pb-3 text-[#505050]">
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
                  className="flex w-auto cursor-pointer gap-2 px-10 py-5"
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
      </>
    );
  }
}
