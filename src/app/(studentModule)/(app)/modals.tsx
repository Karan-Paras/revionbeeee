"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useFailModal } from "@/features/subscriptions/stores/use-fail-modal";
import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import { useSuccessModal } from "@/features/subscriptions/stores/use-success-modal";

const FailModal = dynamic(() =>
  import("@/features/subscriptions/components/fail-modal").then(
    (module) => module.FailModal
  )
);
const SubscriptionModal = dynamic(() =>
  import("@/features/subscriptions/components/subscription-modal").then(
    (module) => module.SubscriptionModal
  )
);
const SuccessModal = dynamic(() =>
  import("@/features/subscriptions/components/success-modal").then(
    (module) => module.SuccessModal
  )
);

export function Modals() {
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
