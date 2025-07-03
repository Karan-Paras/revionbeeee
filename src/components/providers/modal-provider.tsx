"use client";

import { LogoutModal } from "@/features/auth/components/logout-modal";
import { useLogoutModal } from "@/features/auth/stores/use-logout-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen: isLogoutModalOpen } = useLogoutModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{isLogoutModalOpen && <LogoutModal />}</>;
};
