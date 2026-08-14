"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/features/auth/actions/forgot-password";
import { useForgotPasswordStore } from "@/features/auth/stores/use-forgot-password-store";
import { email as emailSchema } from "@/lib/schemas";
import { paths } from "@/routes";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export function ForgotPasswordForm() {
  const [emailError, setEmailError] = useState<string>();
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
    const parsedEmail = emailSchema.safeParse(formData.get("email"));

    if (!parsedEmail.success) {
      setEmailError(parsedEmail.error.issues[0]?.message);
      return;
    }

    setEmailError(undefined);
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
        errors={emailError ? [emailError] : formState.errors.email}
        autoComplete="email"
        required
        onChange={(event) => {
          const result = emailSchema.safeParse(event.currentTarget.value);
          setEmailError(
            result.success ? undefined : result.error.issues[0]?.message
          );
        }}
      />
      <Button variant="rounded" className="mt-5" disabled={isPending}>
        Submit
      </Button>
      <ErrorBlock errors={formState.errors._form} />
    </form>
  );
}
