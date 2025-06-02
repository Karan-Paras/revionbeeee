"use client";

import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { startTransition, useActionState, useEffect } from "react";
import { resetPassword } from "@/features/auth/actions/reset-password";
import { Button } from "@/components/ui/button";
import { ErrorBlock } from "@/components/ui/error-block";
import useForgotPasswordStore from "@/features/auth/stores/use-forgot-password-store";
import { useRouter } from "next/navigation";
import { paths } from "@/routes";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [formState, action, isPending] = useActionState(
    resetPassword.bind(null, token),
    {
      errors: {},
    }
  );

  const router = useRouter();

  const { setHasChangedPassword } = useForgotPasswordStore();

  useEffect(() => {
    if (formState.success) {
      setHasChangedPassword(true);
      router.push(paths.passwordChanged());
    }
  }, [formState, router, setHasChangedPassword]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="spc_frm mt-9">
        <div>
          <div className="itm relative mb-5">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              iconClassName="pass_bg"
              type="password"
              placeholder="Enter password"
              disabled={isPending}
              errors={formState.errors.password}
              autoComplete="new-password"
            />
          </div>
          <div className="itm relative mb-5">
            <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
            <Input
              id="confirm-password"
              name="confirm-password"
              iconClassName="pass_bg"
              type="password"
              placeholder="Confirm password"
              disabled={isPending}
              errors={formState.errors.confirmPassword}
              autoComplete="new-password"
            />
          </div>
        </div>
      </div>
      <div className="btn mt-5">
        <Button disabled={isPending} variant="rounded">
          Continue
        </Button>
        <ErrorBlock errors={formState.errors._form} />
      </div>
    </form>
  );
}
