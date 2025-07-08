"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { InputError } from "@/components/errors/input-error";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactUs } from "@/features/support/actions/contact-us";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export function ContactUsForm() {
  const [formState, action, isPending] = useActionState(contactUs, {
    errors: {},
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      toast.success(
        "Your request has been submitted successfully! We will get back to you soon."
      );
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
    <form className="frm" onSubmit={handleFormSubmit} ref={formRef}>
      <div className="itm mb-3">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          placeholder="Enter your email"
          variant="bordered"
          id="email"
          name="email"
          type="email"
          disabled={isPending}
          errors={formState.errors.email}
          autoComplete="current-password"
        />
      </div>
      <div className="itm mb-3">
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          placeholder="Enter a subject"
          variant="bordered"
          id="subject"
          name="subject"
          disabled={isPending}
          errors={formState.errors.subject}
        />
      </div>
      <div className="itm mb-3">
        <FormLabel htmlFor="message">Message</FormLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter the message"
          disabled={isPending}
          errors={formState.errors.message}
          className="h-32"
        />
      </div>
      <div className="itm mb-3">
        <input
          id="attachment"
          name="attachment"
          disabled={isPending}
          type="file"
          className="md:w-4/12 w-full rounded-xl bg-[#EFF7FF] px-5 py-5 text-[#6CB5F9]"
        />
        {!!formState.errors.attachment && (
          <InputError error={formState.errors.attachment?.join(", ")} />
        )}
      </div>
      <div className="itm mb-3">
        <Button
          className="mx-auto mt-10 w-fit rounded-xl px-10 shadow-xl/10"
          disabled={isPending}
        >
          Submit the Request
        </Button>
      </div>
      <ErrorBlock errors={formState.errors._form} />
    </form>
  );
}
