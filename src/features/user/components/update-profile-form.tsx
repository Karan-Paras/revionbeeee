"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { InputError } from "@/components/errors/input-error";
import { DataLoader } from "@/components/loaders/data-loader";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/features/user/actions/update-profile";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { Camera, Mars, Venus } from "@/lib/icons";
import { getUserImageUrl } from "@/lib/media-urls";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

import type { User } from "@/features/user/types";

interface FormProps {
  userData: User;
}

function Form({ userData }: FormProps) {
  const {
    profilePicture: userProfilePicture,
    firstName,
    lastName,
    city,
    state,
    gender,
    address,
    phoneNumber,
  } = userData;

  const [formState, action, isPending] = useActionState(updateProfile, {
    errors: {},
  });

  const [profilePicture, setProfilePicture] = useState(userProfilePicture);

  const [genderValue, setGenderValue] = useState(gender);

  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      getSession().then(() => router.replace(paths.accounts.myProfile()));
    }
  }, [formState, queryClient, router]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div
      id={paths.accounts.editProfile.scroll().split("#")[1]}
      className="rounded-xl bg-white px-7 py-8"
    >
      <h3 className="border-b border-[#D9D9D9] pb-3 text-2xl font-bold">
        Update Profile
      </h3>

      <form className="frm" onSubmit={handleFormSubmit}>
        <div className="relative mx-auto mt-5 mb-4 flex size-40 items-center justify-center rounded-full border border-white shadow-sm/30">
          <div
            className={cn(
              "flex size-full items-center justify-center overflow-hidden rounded-full bg-cover bg-no-repeat",
              !profilePicture && "blk"
            )}
          >
            {profilePicture && (
              <Image
                className="h-full w-full rounded-full object-cover"
                src={
                  profilePicture.startsWith("blob")
                    ? profilePicture
                    : getUserImageUrl(profilePicture)
                }
                alt="profilePicture"
                width={100}
                height={100}
              />
            )}
          </div>

          <span className="absolute right-0 bottom-2 flex size-10 items-center justify-center rounded-full border border-white bg-[#53A2EB]">
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
              disabled={isPending}
            />
          </span>
        </div>
        <FormLabel className="flex items-center justify-center text-sm font-light">
          Upload your image
        </FormLabel>
        {!!formState.errors.profilePicture && (
          <InputError
            error={formState.errors.profilePicture?.join(", ")}
            className="text-center"
          />
        )}
        <div className="my-5 grid grid-cols-2 gap-10">
          <div className="lg:col-span-1 col-span-2">
            <div className="itm relative grid gap-1.5">
              <FormLabel htmlFor="first-name" variant="bold">
                First Name
              </FormLabel>
              <Input
                id="first-name"
                name="first-name"
                placeholder="Enter your First Name"
                variant="bordered"
                defaultValue={firstName}
                disabled={isPending}
                errors={formState.errors.firstName}
                autoComplete="given-name"
              />
            </div>
          </div>
          <div className="lg:col-span-1 col-span-2">
            <div className="itm relative grid gap-1.5">
              <FormLabel htmlFor="last-name" variant="bold">
                Last name
              </FormLabel>
              <Input
                id="last-name"
                name="last-name"
                placeholder="Enter your Last Name"
                variant="bordered"
                defaultValue={lastName}
                disabled={isPending}
                errors={formState.errors.lastName}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="lg:col-span-1 col-span-2">
            <div className="itm relative grid gap-1.5">
              <FormLabel htmlFor="city" variant="bold">
                City
              </FormLabel>
              <Input
                id="city"
                name="city"
                placeholder="Enter your City"
                variant="bordered"
                defaultValue={city}
                disabled={isPending}
                errors={formState.errors.city}
                autoComplete="address-level2"
              />
            </div>
          </div>
          <div className="lg:col-span-1 col-span-2">
            <div className="itm relative grid gap-1.5">
              <FormLabel htmlFor="state" variant="bold">
                State
              </FormLabel>
              <Input
                id="state"
                name="state"
                placeholder="Enter your State"
                variant="bordered"
                defaultValue={state}
                disabled={isPending}
                errors={formState.errors.state}
                autoComplete="address-level1"
              />
            </div>
          </div>
          <div className="lg:col-span-1 col-span-2">
            <div className="flex h-full flex-wrap items-center justify-between">
              <FormLabel htmlFor="gender" variant="bold">
                Gender
              </FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-0.5">
                <div className="relative col-span-1">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={genderValue === "male"}
                    className="absolute left-0 h-full w-full cursor-pointer opacity-0"
                    onChange={(e) => {
                      setGenderValue(e.target.value as "male");
                    }}
                  />
                  <button
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg border px-5 py-3 font-bold",
                      genderValue === "male"
                        ? "border-[#53A2EB] text-[#53A2EB]"
                        : "border-[#9D9D9D] text-[#9D9D9D]"
                    )}
                  >
                    <span>
                      <Mars
                        color={genderValue === "male" ? "#53A2EB" : "#9D9D9D"}
                      />
                    </span>
                    Male
                  </button>
                </div>
                <div className="relative col-span-1">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={genderValue === "female"}
                    className="absolute left-0 h-full w-full cursor-pointer opacity-0"
                    onChange={(e) => {
                      setGenderValue(e.target.value as "female");
                    }}
                  />

                  <button
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg border px-5 py-3 font-bold",
                      genderValue === "female"
                        ? "border-[#53A2EB] text-[#53A2EB]"
                        : "border-[#9D9D9D] text-[#9D9D9D]"
                    )}
                  >
                    <span>
                      <Venus
                        color={genderValue === "female" ? "#53A2EB" : "#9D9D9D"}
                      />
                    </span>
                    Female
                  </button>
                </div>
              </div>
              {!!formState.errors.gender && (
                <InputError error={formState.errors.gender?.join(", ")} />
              )}
            </div>
          </div>
          <div className="lg:col-span-1 col-span-2">
            <div className="itm relative grid gap-1.5">
              <FormLabel htmlFor="phone-number" variant="bold">
                Mobile
              </FormLabel>
              <Input
                id="phone-number"
                name="phone-number"
                type="tel"
                placeholder="Enter Mobile Number"
                variant="bordered"
                defaultValue={phoneNumber}
                disabled={isPending}
                errors={formState.errors.phoneNumber}
                autoComplete="tel"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
          </div>
          <div className="lg:col-span-2 col-span-2">
            <div className="itm relative grid gap-1.5">
              <FormLabel htmlFor="address" variant="bold">
                Address
              </FormLabel>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter Address"
                defaultValue={address}
                disabled={isPending}
                errors={formState.errors.address}
                autoComplete="address-line1"
              />
            </div>
          </div>
          <div className="lg:col-span-2 col-span-2">
            <div className="flex justify-center">
              <Button
                className="w-auto px-16 shadow-xl/10"
                variant="rounded"
                disabled={isPending}
              >
                Update Info
              </Button>
            </div>
            <ErrorBlock errors={formState.errors._form} />
          </div>
        </div>
      </form>
    </div>
  );
}

export function UpdateProfileForm() {
  const { data, isPending } = useGetProfile();

  if (isPending) {
    return <DataLoader />;
  }

  if (data) {
    const user = data.data;
    return <Form userData={user} />;
  }
}
