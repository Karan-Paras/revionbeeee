"use client";

import { DataLoader } from "@/components/loaders/data-loader";
import { Button } from "@/components/ui/button";
import { ErrorBlock } from "@/components/ui/error-block";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/features/user/actions/update-profile";
import { useGetProfile } from "@/features/user/hooks/use-get-profile";
import { Camera, Mars, Venus } from "@/lib/icons";
import { getUserImageUrl } from "@/lib/media-urls";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { ApiSuccessResponse } from "@/types/api";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

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
    <div className="bg-white px-7 py-8 rounded-xl">
      <h3 className="font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
        Update Profile
      </h3>

      <form className="frm" onSubmit={handleFormSubmit}>
        <div className="size-40 mb-4 relative mx-auto  flex items-center justify-center mt-5 border border-white shadow-sm/30 rounded-full">
          <div className="size-full rounded-full overflow-hidden blk bg-cover bg-no-repeat flex items-center justify-center">
            {profilePicture && (
              <Image
                className="object-cover rounded-full w-full h-full "
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
              disabled={isPending}
            />
          </span>
        </div>
        <FormLabel className="text-sm font-light flex justify-center items-center">
          Upload your image
        </FormLabel>
        <div className="grid grid-cols-2 gap-10 my-5">
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <FormLabel htmlFor="first-name" variant="bold">
                First Name
              </FormLabel>
              <Input
                id="first-name"
                name="firstName"
                placeholder="Enter your First Name"
                variant="bordered"
                defaultValue={firstName}
                disabled={isPending}
                errors={formState.errors.firstName}
                autoComplete="given-name"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <FormLabel htmlFor="last-name" variant="bold">
                Last name
              </FormLabel>
              <Input
                id="last-name"
                name="lastName"
                placeholder="Enter your Last Name"
                variant="bordered"
                defaultValue={lastName}
                disabled={isPending}
                errors={formState.errors.lastName}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
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
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
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
          <div className="col-span-1">
            <div className="flex justify-between h-full flex-wrap items-center">
              <FormLabel htmlFor="gender" variant="bold">
                Gender
              </FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-1">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={genderValue === "male"}
                    className="absolute left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      setGenderValue(e.target.value as "male");
                    }}
                  />
                  <button
                    className={cn(
                      "border flex gap-2 w-full rounded-lg font-bold items-center px-5 py-3",
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
                    className="absolute left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      setGenderValue(e.target.value as "female");
                    }}
                  />

                  <button
                    className={cn(
                      "border flex gap-2 w-full rounded-lg font-bold items-center px-5 py-3",
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
          <div className="col-span-1">
            <div className="itm relative gap-1.5 grid">
              <FormLabel htmlFor="phone-number" variant="bold">
                Mobile
              </FormLabel>
              <Input
                id="phone-number"
                name="phoneNumber"
                type="tel"
                placeholder="Enter Mobile Number"
                variant="bordered"
                defaultValue={phoneNumber}
                disabled={isPending}
                errors={formState.errors.phoneNumber}
                autoComplete="tel"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="itm relative gap-1.5 grid">
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
          <div className="col-span-2">
            <div className="flex justify-center">
              <Button
                className="shadow-xl/10 w-auto px-16"
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

interface UpdateProfileFormProps {
  initialData: ApiSuccessResponse<User>;
  token: string;
}

export function UpdateProfileForm({
  initialData,
  token,
}: UpdateProfileFormProps) {
  const { data, isPending } = useGetProfile(initialData, token);
  const user = data.data;

  return (
    <>
      {isPending && <DataLoader />}
      <Form userData={user} />
    </>
  );
}
