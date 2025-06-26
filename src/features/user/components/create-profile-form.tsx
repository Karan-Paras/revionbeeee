"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { InputError } from "@/components/errors/input-error";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { createProfile } from "@/features/user/actions/create-profile";
import { isUserProfileComplete } from "@/features/user/utils";
import { Camera } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export function CreateProfileForm() {
  const [profilePicture, setProfilePicture] = useState("");

  const [formState, action, isPending] = useActionState(createProfile, {
    errors: {},
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (formState.success) {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      getSession().then(() => router.replace(paths.subscriptionPlans()));
    } else {
      getSession().then((data) => {
        const user = data?.user;

        if (!user) {
          return router.replace(paths.login());
        }

        const isProfileComplete = isUserProfileComplete(user);

        if (isProfileComplete) {
          router.replace(paths.dashboard());
        }
      });
    }
  }, [formState, router, queryClient]);

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
            <div className="relative mx-auto mt-5 mb-4 flex h-28 w-28 items-center justify-center rounded-full border border-dotted">
              <div
                className={cn(
                  "flex size-[6.6rem] items-center justify-center overflow-hidden rounded-full bg-cover bg-no-repeat",
                  !profilePicture && "blk"
                )}
              >
                {profilePicture && (
                  <Image
                    className="h-full w-full rounded-full object-cover"
                    src={profilePicture}
                    alt="profilePicture"
                    width={100}
                    height={100}
                  />
                )}
              </div>

              <span className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#53A2EB]">
                <Camera color="white" />
                <input
                  id="profile-picture"
                  name="profile-picture"
                  className="absolute top-0 right-0 bottom-0 left-0 w-full opacity-0"
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
            <p className="text-center text-sm text-[#505050]">
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
            <div className="itm relative mt-5 mb-3.5">
              <FormLabel htmlFor="first-name">First name</FormLabel>
              <Input
                id="first-name"
                name="first-name"
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
                name="last-name"
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
                name="phone-number"
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
