"use client";

import { useEffect, useState } from "react";

import { FailModal } from "@/features/subscriptions/components/fail-modal";
import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";
import { SuccessModal } from "@/features/subscriptions/components/success-modal";
import { useFailModal } from "@/features/subscriptions/stores/use-fail-modal";
import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import { useSuccessModal } from "@/features/subscriptions/stores/use-success-modal";

export function RootModals() {
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen: isSuccessModalOpen } = useSuccessModal();
  const { isOpen: isFailModalOpen } = useFailModal();
  const { isOpen: isSubscriptionModalOpen } = useSubscriptionModal();

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
      {isSubscriptionModalOpen && <SubscriptionModal />}
    </>
  );
}
