"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorBlock } from "@/components/ui/error-block";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/actions/login";
import { paths } from "@/routes";
import Link from "next/link";
import { startTransition, useActionState } from "react";

export function LoginForm() {
  const [formState, action, isPending] = useActionState(login, {
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
    <div className="spc_frm mt-9">
      <form onSubmit={handleFormSubmit}>
        <div className="itm relative mb-3.5">
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            iconClassName="mail_bg"
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
            type="password"
            iconClassName="pass_bg"
            placeholder="Enter password"
            disabled={isPending}
            errors={formState.errors.password}
            autoComplete="current-password"
          />
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="chk flex gap-1.5">
            <Checkbox />
            <label
              htmlFor="vehicle1"
              className="text-[#0B0B0B] font-light text-sm"
            >
              Remember me
            </label>
          </div>
          <div className="lnk">
            <Link
            href={paths.forgotPassword()}
              className="text-[#53A2EB] font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="btn">
          <Button disabled={isPending}>Sign In</Button>
        </div>
        <ErrorBlock errors={formState.errors._form} />
        <div className="lnk my-10">
          <p className="text-center text-[#505050]">
            Not registered yet?&nbsp;
            <Link
              href={paths.signup()}
              className="text-[#53A2EB] underline underline-offset-5 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
