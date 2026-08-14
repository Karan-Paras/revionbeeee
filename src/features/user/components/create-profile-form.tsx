"use client";

import { Camera } from "@/assets/icons";
import { ErrorBlock } from "@/components/errors/error-block";
import { InputError } from "@/components/errors/input-error";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { createProfile } from "@/features/user/actions/create-profile";
import { phoneNumber as phoneNumberSchema } from "@/features/user/schemas";
import { isUserProfileComplete } from "@/features/user/utils";
import {
  firstName as firstNameSchema,
  lastName as lastNameSchema,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";

export function CreateProfileForm() {
  const [profilePicture, setProfilePicture] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>();
  const [firstNameError, setFirstNameError] = useState<string>();
  const [lastNameError, setLastNameError] = useState<string>();

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
    const parsedFirstName = firstNameSchema.safeParse(
      formData.get("first-name")
    );
    const parsedLastName = lastNameSchema.safeParse(formData.get("last-name"));
    const parsedPhoneNumber = phoneNumberSchema.safeParse(phoneNumber);

    setFirstNameError(
      parsedFirstName.success
        ? undefined
        : parsedFirstName.error.issues[0]?.message
    );
    setLastNameError(
      parsedLastName.success
        ? undefined
        : parsedLastName.error.issues[0]?.message
    );

    if (
      !parsedFirstName.success ||
      !parsedLastName.success ||
      !parsedPhoneNumber.success ||
      phoneNumberError
    ) {
      if (!parsedPhoneNumber.success) {
        setPhoneNumberError(parsedPhoneNumber.error.issues[0]?.message);
      }
      return;
    }

    setPhoneNumberError(undefined);
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
                errors={
                  firstNameError ? [firstNameError] : formState.errors.firstName
                }
                autoComplete="given-name"
                onChange={(event) => {
                  const result = firstNameSchema.safeParse(event.target.value);
                  setFirstNameError(
                    result.success ? undefined : result.error.issues[0]?.message
                  );
                }}
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
                errors={
                  lastNameError ? [lastNameError] : formState.errors.lastName
                }
                autoComplete="family-name"
                onChange={(event) => {
                  const result = lastNameSchema.safeParse(event.target.value);
                  setLastNameError(
                    result.success ? undefined : result.error.issues[0]?.message
                  );
                }}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="itm relative mb-16">
              <FormLabel htmlFor="phone-number">Mobile Number</FormLabel>
              <input type="hidden" name="phone-number" value={phoneNumber} />
              <span className="teacher-phone-input profile-phone-input mt-1.5 block">
                <PhoneInput
                  defaultCountry="in"
                  value={phoneNumber}
                  placeholder="Enter Mobile Number"
                  disabled={isPending}
                  inputProps={{
                    id: "phone-number",
                    autoComplete: "tel",
                    "aria-invalid": !!phoneNumberError,
                  }}
                  onChange={(phone, { country, inputValue }) => {
                    const dialCodeDigits = country.dialCode.replace(/\D/g, "");
                    const compactInput = inputValue.replace(/[\s()-]/g, "");
                    const dialPrefix = `+${dialCodeDigits}`;
                    const subscriberInput = compactInput.startsWith(dialPrefix)
                      ? compactInput.slice(dialPrefix.length)
                      : compactInput;
                    const hasSubscriberNumber = subscriberInput.length > 0;
                    const value = hasSubscriberNumber ? phone : "";

                    setPhoneNumber(value);
                    if (!hasSubscriberNumber) {
                      setPhoneNumberError(undefined);
                      return;
                    }

                    const result = phoneNumberSchema.safeParse(phone);
                    const containsOnlyDigits = /^\d+$/.test(subscriberInput);
                    setPhoneNumberError(
                      result.success && containsOnlyDigits
                        ? undefined
                        : "Enter a valid mobile number for the selected country"
                    );
                  }}
                />
              </span>
              {!!phoneNumberError && <InputError error={phoneNumberError} />}
              {!!formState.errors.phoneNumber && !phoneNumberError && (
                <InputError error={formState.errors.phoneNumber.join(", ")} />
              )}
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
