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

  const [currentPasswordError, setCurrentPasswordError] = useState<string[]>();
  const [newPasswordError, setNewPasswordError] = useState<string[]>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string[]>();

  // Track whether each field has been touched
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setCurrentPasswordError(undefined);
      setNewPasswordError(undefined);
      setConfirmPasswordError(undefined);
      setTouched({});
      toast.success("Password changed successfully!");
    }
  }, [formState]);

  function validateCurrentPassword(value: string) {
    if (!touched.currentPassword && value.length === 0) return;
    setTouched((prev) => ({ ...prev, currentPassword: true }));
    if (value.length === 0) {
      setCurrentPasswordError(["Password is required"]);
    } else {
      setCurrentPasswordError(undefined);
    }
  }

  function validateNewPassword(value: string, confirmValue?: string) {
    if (!touched.newPassword && value.length === 0) return;
    setTouched((prev) => ({ ...prev, newPassword: true }));

    if (value.length === 0) {
      setNewPasswordError(undefined);
      return;
    }

    const result = newPassword.safeParse(value);
    if (result.success) {
      setNewPasswordError(undefined);
    } else {
      // Show only the first validation error for cleaner UX
      setNewPasswordError(
        [result.error.issues[0]?.message].filter(Boolean) as string[]
      );
    }

    // Also re-validate confirm password if it has been touched
    if (touched.confirmPassword && confirmValue !== undefined) {
      validateConfirmPassword(confirmValue, value);
    }
  }

  function validateConfirmPassword(value: string, newPasswordValue?: string) {
    if (!touched.confirmPassword && value.length === 0) return;
    setTouched((prev) => ({ ...prev, confirmPassword: true }));

    if (value.length === 0) {
      setConfirmPasswordError(["Confirm password is required"]);
      return;
    }

    if (value !== newPasswordValue) {
      setConfirmPasswordError(["Passwords don't match"]);
    } else {
      setConfirmPasswordError(undefined);
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Mark all fields as touched
    setTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    const currentPwd = formData.get("current-password") as string;
    const newPwd = formData.get("new-password") as string;
    const confirmPwd = formData.get("confirm-password") as string;

    // Validate all fields
    let hasErrors = false;

    if (!currentPwd || currentPwd.length === 0) {
      setCurrentPasswordError(["Password is required"]);
      hasErrors = true;
    } else {
      setCurrentPasswordError(undefined);
    }

    const newPwdResult = newPassword.safeParse(newPwd);
    if (!newPwdResult.success) {
      setNewPasswordError(
        [newPwdResult.error.issues[0]?.message].filter(Boolean) as string[]
      );
      hasErrors = true;
    } else {
      setNewPasswordError(undefined);
    }

    if (!confirmPwd || confirmPwd.length === 0) {
      setConfirmPasswordError(["Confirm password is required"]);
      hasErrors = true;
    } else if (confirmPwd !== newPwd) {
      setConfirmPasswordError(["Passwords don't match"]);
      hasErrors = true;
    } else {
      setConfirmPasswordError(undefined);
    }

    if (hasErrors) return;

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
          errors={currentPasswordError ?? formState.errors.currentPassword}
          autoComplete="current-password"
          onChange={(event) => {
            validateCurrentPassword(event.currentTarget.value);
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
          errors={newPasswordError ?? formState.errors.newPassword?.slice(0, 1)}
          autoComplete="new-password"
          onChange={(event) => {
            const val = event.currentTarget.value;
            const confirmInput = (
              event.currentTarget.form?.elements.namedItem(
                "confirm-password"
              ) as HTMLInputElement | null
            )?.value;
            validateNewPassword(val, confirmInput);
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
          errors={confirmPasswordError ?? formState.errors.confirmPassword}
          autoComplete="new-password"
          onChange={(event) => {
            const passwordInput = (
              event.currentTarget.form?.elements.namedItem(
                "new-password"
              ) as HTMLInputElement | null
            )?.value;
            validateConfirmPassword(event.currentTarget.value, passwordInput);
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
