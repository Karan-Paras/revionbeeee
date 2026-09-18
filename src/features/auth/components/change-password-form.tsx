"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/features/auth/actions/change-password";
import { newPassword } from "@/features/auth/schemas";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

export function ChangePasswordForm() {
  const { data: session } = useSession();

  const [formState, action, isPending] = useActionState(changePassword, {
    errors: {},
  });

  const [currentPasswordError, setCurrentPasswordError] = useState<string>();
  const [newPasswordError, setNewPasswordError] = useState<string>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>();

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setCurrentPasswordError(undefined);
      setNewPasswordError(undefined);
      setConfirmPasswordError(undefined);
      toast.success("Password changed successfully!");
    }
  }, [formState]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form
      className="frm"
      onSubmit={handleFormSubmit}
      ref={formRef}
      autoComplete="on"
    >
      <input
        type="email"
        className="hidden"
        name="email"
        defaultValue={session?.user.email || ""}
        autoComplete="email"
      />
      <div className="itm mb-3">
        <FormLabel htmlFor="current-password">Current Password</FormLabel>
        <Input
          className={cn("pe-12")}
          placeholder="Enter Current password"
          variant="bordered"
          id="current-password"
          name="current-password"
          type="password"
          disabled={isPending}
          errors={
            currentPasswordError
              ? [currentPasswordError]
              : formState.errors.currentPassword
          }
          autoComplete="current-password"
          onChange={(event) => {
            const val = event.currentTarget.value;
            setCurrentPasswordError(
              val.length === 0 ? "Password is required" : undefined
            );
          }}
        />
      </div>
      <div className="itm mb-3">
        <FormLabel htmlFor="new-password">New Password</FormLabel>
        <Input
          className={cn("pe-12")}
          placeholder="Enter New password"
          variant="bordered"
          id="new-password"
          name="new-password"
          type="password"
          disabled={isPending}
          errors={
            newPasswordError
              ? [newPasswordError]
              : formState.errors.newPassword?.slice(0, 1)
          }
          autoComplete="new-password"
          onChange={(event) => {
            const val = event.currentTarget.value;
            if (val.length === 0) {
              setNewPasswordError(undefined);
              setConfirmPasswordError(undefined);
              return;
            }
            const result = newPassword.safeParse(val);
            setNewPasswordError(
              result.success ? undefined : result.error.issues[0]?.message
            );
          }}
        />
      </div>
      <div className="itm mb-3">
        <FormLabel htmlFor="confirm-password">Re-Type New Password</FormLabel>
        <Input
          className={cn("pe-12")}
          placeholder="Enter Re-Type New Password "
          variant="bordered"
          id="confirm-password"
          name="confirm-password"
          type="password"
          disabled={isPending}
          errors={
            confirmPasswordError
              ? [confirmPasswordError]
              : formState.errors.confirmPassword
          }
          autoComplete="new-password"
          onChange={(event) => {
            const passwordInput = (
              event.currentTarget.form?.elements.namedItem(
                "new-password"
              ) as HTMLInputElement | null
            )?.value;
            const val = event.currentTarget.value;
            setConfirmPasswordError(
              val.length === 0
                ? undefined
                : val !== passwordInput
                  ? "Passwords don't match"
                  : undefined
            );
          }}
        />
      </div>
      <div className="itm mb-3">
        <Button
          className="mx-auto mt-10 w-fit rounded-xl px-10 shadow-xl/10"
          disabled={isPending}
        >
          Update Password
        </Button>
        <ErrorBlock errors={formState.errors._form} />
      </div>
    </form>
  );
}
