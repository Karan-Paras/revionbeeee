"use client";

import { Button } from "@/components/ui/button";
import { ErrorBlock } from "@/components/ui/error-block";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { createProfile } from "@/features/user/actions/create-profile";
import { Camera } from "@/lib/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { startTransition, useActionState, useState } from "react";

export function CreateProfileForm() {
  const [profilePicture, setProfilePicture] = useState("");

  const [formState, action, isPending] = useActionState(createProfile, {
    errors: {},
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="spc_frm">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <div className="w-28 h-28 mb-4 relative mx-auto  flex items-center justify-center mt-5 border-dotted border rounded-full">
              <div
                className={cn(
                  "size-[6.6rem] rounded-full overflow-hidden bg-cover bg-no-repeat flex items-center justify-center",
                  !profilePicture && "blk"
                )}
              >
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
            <p className="text-center text-[#505050] text-sm">
              Upload your image
            </p>
            {!!formState.errors.profilePicture && (
              <InputError
                error={formState.errors.profilePicture?.join(", ")}
                className="text-center"
              />
            )}
          </div>
          <div className="col-span-2">
            <div className="itm relative mb-3.5 mt-5">
              <FormLabel htmlFor="first-name">First name</FormLabel>
              <Input
                id="first-name"
                name="firstName"
                iconClassName="user_bg"
                placeholder="Enter your First Name"
                disabled={isPending}
                errors={formState.errors.firstName}
                autoComplete="given-name"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="itm relative mb-3.5">
              <FormLabel htmlFor="last-name">Last name</FormLabel>
              <Input
                id="last-name"
                name="lastName"
                iconClassName="user_bg"
                placeholder="Enter your Last Name"
                disabled={isPending}
                errors={formState.errors.lastName}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="itm relative mb-16">
              <FormLabel htmlFor="phone-number">Mobile Number</FormLabel>
              <Input
                id="phone-number"
                name="phoneNumber"
                iconClassName="mob_bg"
                type="tel"
                placeholder="Enter Mobile Number"
                disabled={isPending}
                errors={formState.errors.phoneNumber}
                autoComplete="tel"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="itm relative mb-3.5">
              <div className="btn">
                <Button disabled={isPending}>Create Profile</Button>
              </div>
              <ErrorBlock errors={formState.errors._form} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
