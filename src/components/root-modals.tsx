"use client";

import { useEffect, useState } from "react";

import { SuccessModal } from "@/features/subscriptions/components/success-modal";
import { FailModal } from "@/features/subscriptions/components/fail-modal";
import { useSuccessModal } from "@/features/subscriptions/stores/use-success-modal";
import { useFailModal } from "@/features/subscriptions/stores/use-fail-modal";

export function RootModals() {
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen: isSuccessModalOpen } = useSuccessModal();
  const { isOpen: isFailModalOpen } = useFailModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isSuccessModalOpen && <SuccessModal />}
      {isFailModalOpen && <FailModal />}
      {/* <SubscriptionModal /> */}
    </>
  );
}
