"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/actions/login";
import { isUserProfileComplete } from "@/features/user/utils";
import { paths } from "@/routes";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");

  const [formState, action, isPending] = useActionState(login, {
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      getSession().then((data) => {
        if (!data?.user) {
          return router.replace(paths.login());
        }

        const isProfileComplete = isUserProfileComplete(data?.user);

        const redirectPath = isProfileComplete
          ? paths.dashboard()
          : paths.createProfile();

        router.replace(redirectPath);
      });
    }
  }, [formState, router]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() ?? "";

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mb-8 flex items-center justify-between">
          <div className="chk flex gap-1.5">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              htmlFor="vehicle1"
              className="text-sm font-light text-[#0B0B0B]"
            >
              Remember me
            </label>
          </div>
          <div className="lnk">
            <Link
              href={paths.forgotPassword()}
              className="font-medium text-[#53A2EB]"
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
              className="font-semibold text-[#53A2EB] underline underline-offset-5"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
