"use client";

import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { ErrorBlock } from "@/components/errors/error-block";

import { forgotPassword } from "@/features/auth/actions/forgot-password";
import { useForgotPasswordStore } from "@/features/auth/stores/use-forgot-password-store";

import { paths } from "@/routes";

export function ForgotPasswordForm() {
  const [formState, action, isPending] = useActionState(forgotPassword, {
    errors: {},
  });

  const router = useRouter();

  const { setHasFilledEmail } = useForgotPasswordStore();

  useEffect(() => {
    if (formState.success) {
      setHasFilledEmail(true);
      router.push(paths.emailSent());
    }
  }, [formState, router, setHasFilledEmail]);

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
