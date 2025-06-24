"use client";

import { toast } from "sonner";
import { startTransition, useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { support } from "@/features/support/actions/support";

export function SupportForm() {
  const [formState, action, isPending] = useActionState(support, {
    errors: {},
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      toast.success("Support request submitted successfully!");
    }
  }, [formState]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="col-span-6 md:col-span-3">
      <div className="crd rounded-xl bg-white px-4 py-5 shadow-md lg:py-10">
        <form className="grid grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
          <div className="col-span-2 md:col-span-1">
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
          <div className="col-span-2 md:col-span-1">
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
          <div className="col-span-2 md:col-span-1">
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
          <div className="col-span-2 md:col-span-1">
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
