"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/actions/login";
import { getPostLoginPath } from "@/features/auth/utils";
import { paths } from "@/routes";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";

export function LoginForm() {
  const router = useRouter();

  const [formState, action, isPending] = useActionState(login, {
    errors: {},
  });
  const formErrors = formState?.errors ?? {};

  useEffect(() => {
    if (formState?.success) {
      getSession().then((data) => {
        if (!data?.user) {
          return router.replace(paths.login());
        }

        router.replace(
          getPostLoginPath(data.user.userType, data.user.teacherProfileStatus)
        );
      });
    }
  }, [formState?.success, router]);

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
            errors={formErrors.email}
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
            errors={formErrors.password}
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
        <ErrorBlock errors={formErrors._form} />
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
