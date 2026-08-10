"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { login } from "@/features/auth/actions/login";
import { getPostLoginPath } from "@/features/auth/utils";
import { paths } from "@/routes";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export function TeacherLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, action, isPending] = useActionState(login, { errors: {} });
  const formErrors = formState?.errors ?? {};

  useEffect(() => {
    if (!formState?.success) return;

    getSession().then((data) => {
      if (!data?.user) {
        router.replace(paths.login());
        return;
      }

      router.replace(
        getPostLoginPath(data.user.userType, data.user.teacherProfileStatus)
      );
    });
  }, [formState?.success, router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label
          htmlFor="teacher-email"
          className="mb-2 block text-xs font-medium text-[#292929] sm:text-sm"
        >
          Email address
        </label>
        <div className="relative">
          <Mail
            aria-hidden="true"
            className="absolute top-1/2 left-4 -translate-y-1/2 text-[#a5abb5]"
            size={19}
            strokeWidth={1.5}
          />
          <input
            id="teacher-email"
            name="email"
            type="email"
            required
            disabled={isPending}
            autoComplete="email"
            placeholder="john@example.com"
            className="h-12 w-full rounded-lg border border-transparent bg-white pr-4 pl-12 text-sm outline-none transition placeholder:text-[#a5a5a5] focus:border-[#56a5e9] focus:ring-4 focus:ring-[#56a5e9]/10"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="teacher-password"
          className="mb-2 block text-xs font-medium text-[#292929] sm:text-sm"
        >
          Password
        </label>
        <div className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="absolute top-1/2 left-4 -translate-y-1/2 text-[#a5abb5]"
            size={19}
            strokeWidth={1.5}
          />
          <input
            id="teacher-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            disabled={isPending}
            autoComplete="current-password"
            placeholder="Enter password"
            className="h-12 w-full rounded-lg border border-transparent bg-white pr-12 pl-12 text-sm outline-none transition placeholder:text-[#a5a5a5] focus:border-[#56a5e9] focus:ring-4 focus:ring-[#56a5e9]/10"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#929bc1]"
          >
            {showPassword ? (
              <Eye size={20} strokeWidth={1.5} />
            ) : (
              <EyeOff size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-[#292929]">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-[#aeb3bb] accent-[#56a5e9]"
          />
          Remember me
        </label>
        <Link
          href={paths.forgotPassword()}
          className="font-semibold text-[#499ff0] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full cursor-pointer rounded-lg bg-[#56a5e9] text-sm font-semibold text-white shadow-[0_12px_25px_rgba(86,165,233,0.22)] transition hover:bg-[#4599df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56a5e9] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>

      <ErrorBlock
        errors={[
          ...(formErrors.email ?? []),
          ...(formErrors.password ?? []),
          ...(formErrors._form ?? []),
        ]}
      />
    </form>
  );
}
