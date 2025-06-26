"use client";

import { useFailModal } from "@/features/subscriptions/stores/use-fail-modal";
import { useSuccessModal } from "@/features/subscriptions/stores/use-success-modal";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const SubscriptionAlerts = () => {
  const params = useSearchParams();

  const { onOpen: onOpenFail } = useFailModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();

  const canceled = params.get("canceled");
  const success = params.get("success");

  useEffect(() => {
    if (canceled) {
      onOpenFail();
    }

    if (success) {
      onOpenSuccess();
    }
  }, [canceled, onOpenFail, success, onOpenSuccess]);

  return null;
};
