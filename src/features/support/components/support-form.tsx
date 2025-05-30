"use client";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { support } from "@/features/support/actions/support";
import { startTransition, useActionState } from "react";

export function SupportForm() {
  const [formState, action, isPending] = useActionState(support, {
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
    <div className="md:col-span-3 col-span-6">
      <div className="crd bg-white px-4 lg:py-10 py-5 rounded-xl shadow-md">
        <form className="grid grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
          <div className="md:col-span-1 col-span-2">
            <Input
              variant="transparent"
              placeholder="First Name*"
              id="first-name"
              name="first-name"
              disabled={isPending}
              errors={formState.errors.firstName}
              autoComplete="given-name"
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <Input
              variant="transparent"
              placeholder="Last Name*"
              id="last-name"
              name="last-name"
              disabled={isPending}
              errors={formState.errors.lastName}
              autoComplete="family-name"
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <Input
              type="email"
              variant="transparent"
              placeholder="Your Email*"
              id="email"
              name="email"
              disabled={isPending}
              errors={formState.errors.email}
              autoComplete="email"
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <Input
              type="tel"
              variant="transparent"
              placeholder="Mobile Number*"
              id="phone-number"
              name="phone-number"
              disabled={isPending}
              errors={formState.errors.phoneNumber}
              autoComplete="tel"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
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
                errors={formState.errors.message}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <Button
                variant="rounded"
                className="w-auto font-semibold py-5 px-8"
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
