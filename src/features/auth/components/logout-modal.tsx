"use client";

import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { useLogoutModal } from "@/features/auth/stores/use-logout-modal";
import { paths } from "@/routes";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function LogoutModal() {
  const { onClose } = useLogoutModal();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    queryClient.clear();
    onClose();

    await signOut({
      redirectTo: paths.home(),
    });
  };

  return (
    <Modal onClose={onClose} title="" className="sm:max-w-lg">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer rounded-full border border-gray-500 p-1 transition-colors hover:bg-gray-100"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>
      <div className="m-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
            <LogOut className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <h2 className="mb-3 text-xl font-semibold text-gray-900">Logout</h2>

        <p className="mb-8 text-sm leading-relaxed text-gray-500">
          Are you sure you want to log out?
        </p>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isLoggingOut}>
            No
          </Button>
          <Button variant="rounded" onClick={onLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Logging Out..." : "Yes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
