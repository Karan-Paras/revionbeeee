"use client";

import { InputError } from "@/components/errors/input-error";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { support } from "@/features/support/actions/support";
import { SupportSchema } from "@/features/support/schemas";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { PhoneInput } from "react-international-phone";
import { toast } from "sonner";
import type { z } from "zod";

type SupportField = keyof z.infer<typeof SupportSchema>;

type FieldErrors = Partial<Record<SupportField, string[] | undefined>>;

const INITIAL_VALUES: Record<SupportField, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export function SupportForm() {
  const [formState, action, isPending] = useActionState(support, {
    errors: {},
  });

  const [values, setValues] =
    useState<Record<SupportField, string>>(INITIAL_VALUES);
  const [liveErrors, setLiveErrors] = useState<FieldErrors>({});

  const formRef = useRef<HTMLFormElement | null>(null);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setValues(INITIAL_VALUES);
      setLiveErrors({});
      hasSubmitted.current = false;
      toast.success("Support request submitted successfully!");
    }
  }, [formState]);

  function getFieldErrors(
    nextValues: Record<SupportField, string>
  ): FieldErrors {
    const result = SupportSchema.safeParse(nextValues);

    if (result.success) return {};

    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      firstName: fieldErrors.firstName,
      lastName: fieldErrors.lastName,
      email: fieldErrors.email,
      phoneNumber: fieldErrors.phoneNumber,
      message: fieldErrors.message,
    };
  }

  function handleFieldChange(field: SupportField, value: string) {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);

    if (!hasSubmitted.current && value.trim() === "") {
      setLiveErrors((prev) => ({ ...prev, [field]: undefined }));
      return;
    }

    setLiveErrors((prev) => ({
      ...prev,
      [field]: getFieldErrors(nextValues)[field],
    }));
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    hasSubmitted.current = true;

    const validationErrors = getFieldErrors(values);

    if (Object.values(validationErrors).some((errors) => errors?.length)) {
      setLiveErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.set("first-name", values.firstName);
    formData.set("last-name", values.lastName);
    formData.set("email", values.email);
    formData.set("phone-number", values.phoneNumber);
    formData.set("message", values.message);

    startTransition(() => {
      action(formData);
    });
  }

  const errors = {
    firstName: liveErrors.firstName ?? formState.errors.firstName,
    lastName: liveErrors.lastName ?? formState.errors.lastName,
    email: liveErrors.email ?? formState.errors.email,
    phoneNumber: liveErrors.phoneNumber ?? formState.errors.phoneNumber,
    message: liveErrors.message ?? formState.errors.message,
  };

  return (
    <div className="col-span-6 lg:col-span-3">
      <div className="crd rounded-xl bg-white px-4 py-5 shadow-md lg:py-10">
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <div className="col-span-2 md:col-span-1">
            <Input
              variant="transparent"
              placeholder="First Name*"
              id="first-name"
              name="first-name"
              disabled={isPending}
              errors={errors.firstName}
              autoComplete="given-name"
              onChange={(e) => handleFieldChange("firstName", e.target.value)}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              variant="transparent"
              placeholder="Last Name*"
              id="last-name"
              name="last-name"
              disabled={isPending}
              errors={errors.lastName}
              autoComplete="family-name"
              onChange={(e) => handleFieldChange("lastName", e.target.value)}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="email"
              variant="transparent"
              placeholder="Your Email*"
              id="email"
              name="email"
              disabled={isPending}
              errors={errors.email}
              autoComplete="email"
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <input
              type="hidden"
              name="phone-number"
              value={values.phoneNumber}
            />
            <span className="support-phone-input block">
              <PhoneInput
                defaultCountry="in"
                forceDialCode
                value={values.phoneNumber}
                placeholder="Enter Mobile Number*"
                disabled={isPending}
                inputProps={{
                  autoComplete: "tel",
                }}
                onChange={(phone, { country, inputValue }) => {
                  const dialCodeDigits = country.dialCode.replace(/\D/g, "");
                  const compactInput = inputValue.replace(/[\s()-]/g, "");
                  const dialPrefix = `+${dialCodeDigits}`;
                  const subscriberInput = compactInput.startsWith(dialPrefix)
                    ? compactInput.slice(dialPrefix.length)
                    : compactInput;
                  const hasSubscriberNumber = subscriberInput.length > 0;

                  handleFieldChange(
                    "phoneNumber",
                    hasSubscriberNumber && typeof phone === "string"
                      ? phone
                      : ""
                  );
                }}
              />
            </span>
            {!!errors.phoneNumber && (
              <InputError error={errors.phoneNumber.join(", ")} />
            )}
          </div>
          <div className="col-span-2">
            <div className="px-4">
              <FormLabel htmlFor="message" variant="medium">
                Tell us about you
              </FormLabel>
              <Textarea
                variant="transparent"
                id="message"
                name="message"
                disabled={isPending}
                errors={errors.message}
                onChange={(e) => handleFieldChange("message", e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <Button
                variant="rounded"
                className="w-auto px-8 py-5 font-semibold"
              >
                Submit a Query
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
