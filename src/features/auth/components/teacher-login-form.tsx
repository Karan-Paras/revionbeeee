"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { login } from "@/features/auth/actions/login";
import { DeviceTokenField } from "@/features/auth/components/device-token-field";
import { newPassword } from "@/features/auth/schemas";
import { getPostLoginPath } from "@/features/auth/utils";
import { email as emailSchema } from "@/lib/schemas";
import { paths } from "@/routes";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export function TeacherLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
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

    startTransition(() => action(formData));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <DeviceTokenField />
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
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "teacher-email-error" : undefined}
            onChange={(event) => {
              const result = emailSchema.safeParse(event.currentTarget.value);
              setEmailError(
                result.success ? undefined : result.error.issues[0]?.message
              );
            }}
            className="h-12 w-full rounded-lg border border-transparent bg-white pr-4 pl-12 text-sm outline-none transition placeholder:text-[#a5a5a5] focus:border-[#56a5e9] focus:ring-4 focus:ring-[#56a5e9]/10"
          />
        </div>
        {emailError && (
          <p id="teacher-email-error" className="mt-1 text-sm text-red-600">
            {emailError}
          </p>
        )}
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
            aria-invalid={!!passwordError}
            aria-describedby={
              passwordError ? "login-password-error" : undefined
            }
            onBlur={(event) => {
              const result = newPassword.safeParse(event.currentTarget.value);
              setPasswordError(
                result.success ? undefined : result.error.issues[0]?.message
              );
            }}
            onChange={(event) => {
              const result = newPassword.safeParse(event.currentTarget.value);
              setPasswordError(
                result.success ? undefined : result.error.issues[0]?.message
              );
            }}
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
        {passwordError && (
          <p id="login-password-error" className="mt-1 text-sm text-red-600">
            {passwordError}
          </p>
        )}
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
          ...(!emailError ? (formErrors.email ?? []) : []),
          ...(!passwordError ? (formErrors.password?.slice(0, 1) ?? []) : []),
          ...(formErrors._form ?? []),
        ]}
      />
    </form>
  );
}
