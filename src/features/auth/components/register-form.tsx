"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { register } from "@/features/auth/actions/register";
import { DeviceTokenField } from "@/features/auth/components/device-token-field";
import { newPassword } from "@/features/auth/schemas";
import { email as emailSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

type RegisterFormProps = {
  compact?: boolean;
  signInHref?: string;
  socialOptions?: React.ReactNode;
  userType?: "student" | "teacher";
  successRedirect?: string;
};

export function RegisterForm({
  compact = false,
  signInHref = paths.login(),
  socialOptions,
  userType = "student",
  successRedirect = paths.createProfile(),
}: RegisterFormProps) {
  const router = useRouter();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const [formState, action, isPending] = useActionState(register, {
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      getSession().then(() => router.replace(successRedirect));
    }
  }, [formState, router, successRedirect]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parsedEmail = emailSchema.safeParse(formData.get("email"));
    const parsedPassword = newPassword.safeParse(formData.get("password"));

    setEmailError(
      parsedEmail.success ? undefined : parsedEmail.error.issues[0]?.message
    );
    setPasswordError(
      parsedPassword.success
        ? undefined
        : parsedPassword.error.issues[0]?.message
    );
    if (!parsedEmail.success || !parsedPassword.success) {
      return;
    }

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className={cn("spc_frm", compact ? "mt-3" : "mt-9")}>
      <form onSubmit={handleFormSubmit}>
        <DeviceTokenField />
        <input type="hidden" name="userType" value={userType} />
        <div className={cn("itm relative", compact ? "mb-2" : "mb-3.5")}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            name="email"
            iconClassName="mail_bg"
            type="email"
            placeholder="john@example.com"
            disabled={isPending}
            errors={emailError ? [emailError] : formState.errors.email}
            autoComplete="email"
            required
            className={compact ? "py-3.5" : undefined}
            onBlur={(event) => {
              const result = emailSchema.safeParse(event.currentTarget.value);
              setEmailError(
                result.success ? undefined : result.error.issues[0]?.message
              );
            }}
            onChange={(event) => {
              const result = emailSchema.safeParse(event.currentTarget.value);
              setEmailError(
                result.success ? undefined : result.error.issues[0]?.message
              );
            }}
          />
        </div>
        <div className={cn("itm relative", compact ? "mb-2" : "mb-5")}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            iconClassName="pass_bg"
            type="password"
            placeholder="Enter password"
            disabled={isPending}
            errors={
              passwordError
                ? [passwordError]
                : formState.errors.password?.slice(0, 1)
            }
            autoComplete="new-password"
            required
            className={compact ? "py-3.5" : undefined}
            onChange={(event) => {
              const result = newPassword.safeParse(event.currentTarget.value);
              setPasswordError(
                result.success ? undefined : result.error.issues[0]?.message
              );
            }}
          />
        </div>
        <div className={cn("itm relative", compact ? "mb-2" : "mb-5")}>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            iconClassName="pass_bg"
            type="password"
            placeholder="Confirm password"
            disabled={isPending}
            errors={formState.errors.confirmPassword}
            autoComplete="new-password"
            className={compact ? "py-3.5" : undefined}
          />
        </div>
        <div
          className={cn(
            "flex items-center justify-between",
            compact ? "mb-3" : "mb-8"
          )}
        >
          <div className="chk flex items-start gap-3">
            <Checkbox
              id="terms-and-conditions"
              disabled={isPending}
              name="terms-and-conditions"
              className="mt-0.5 shrink-0"
            />
            <label
              htmlFor="terms-and-conditions"
              className="flex-1 text-sm font-light text-[#0B0B0B]"
            >
              By signing up, you are agreeing to our&nbsp;
              <Link
                className="font-semibold text-[#53A2EB] underline underline-offset-5"
                href={paths.termsAndConditions()}
                target="_blank"
              >
                Terms & Conditions&nbsp;
              </Link>
              &nbsp; and&nbsp;
              <Link
                className="font-semibold text-[#53A2EB] underline underline-offset-5"
                href={paths.privacyPolicy()}
                target="_blank"
              >
                &nbsp; Privacy Policy.
              </Link>
            </label>
          </div>
        </div>
        <div className="btn">
          <Button disabled={isPending} className={compact ? "p-3" : undefined}>
            Sign Up
          </Button>
        </div>
        <ErrorBlock errors={formState.errors._form} />
      </form>
      {socialOptions}
      <div className={cn("lnk", compact ? "my-3" : "my-6")}>
        <p className="text-center text-[#505050]">
          Already registered?&nbsp;
          <Link
            className="font-semibold text-[#53A2EB] underline underline-offset-5"
            href={signInHref}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
