"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { register } from "@/features/auth/actions/register";
import { paths } from "@/routes";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";

export function RegisterForm() {
  const router = useRouter();

  const [formState, action, isPending] = useActionState(register, {
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      getSession().then(() => router.replace(paths.createProfile()));
    }
  }, [formState, router]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="spc_frm mt-9">
      <form onSubmit={handleFormSubmit}>
        <div className="itm relative mb-3.5">
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            name="email"
            iconClassName="mail_bg"
            type="email"
            placeholder="john@example.com"
            disabled={isPending}
            errors={formState.errors.email}
            autoComplete="email"
          />
        </div>
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
        <div className="mb-8 flex items-center justify-between">
          <div className="chk flex flex-wrap items-start gap-1.5">
            <Checkbox
              id="terms-and-conditions"
              disabled={isPending}
              name="terms-and-conditions"
            />
            <label
              htmlFor="
                terms-and-conditions"
              className="w-10/12 text-sm font-light text-[#0B0B0B] md:w-8/12"
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
          <Button disabled={isPending}>Sign Up</Button>
        </div>
        <ErrorBlock errors={formState.errors._form} />
        <div className="lnk my-10">
          <p className="text-center text-[#505050]">
            Not registered yet?&nbsp;
            <Link
              className="font-semibold text-[#53A2EB] underline underline-offset-5"
              href={paths.login()}
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
