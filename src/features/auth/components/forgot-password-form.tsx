"use client";

import { Button } from "@/components/ui/button";
import { ErrorBlock } from "@/components/ui/error-block";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/features/auth/actions/forgot-password";
import { startTransition, useActionState } from "react";

export function ForgotPasswordForm() {
  const [formState, action, isPending] = useActionState(forgotPassword, {
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
    <form className="frm my-3" onSubmit={handleFormSubmit}>
      <FormLabel htmlFor="email" variant="light">
        Email address
      </FormLabel>
      <Input
        id="email"
        name="email"
        type="email"
        disabled={isPending}
        placeholder="john@example.com"
        iconClassName="mail_bg"
        variant="bordered"
        errors={formState.errors.email}
        autoComplete="email"
      />
      <Button variant="rounded" className="mt-5" disabled={isPending}>
        Submit
      </Button>
      <ErrorBlock errors={formState.errors._form} />
    </form>
  );
}
