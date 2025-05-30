"use client";

import { LogOut, X } from "lucide-react";
import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/queries/use-logout";

interface LogoutModalProps {
  onClose: () => void;
}

export function LogoutModal({ onClose }: LogoutModalProps) {
  const logout = useLogout();

  return (
    <Modal onClose={onClose} title="" className="sm:max-w-lg">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors border border-gray-500 cursor-pointer"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
      <div className="text-center m-6">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <LogOut className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">Logout</h2>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Are you sure you want to log out of the account?
        </p>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose}>
            No
          </Button>
          <Button variant="rounded" onClick={logout}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
