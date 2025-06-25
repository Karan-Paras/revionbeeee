"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFailModal } from "@/features/subscriptions/stores/use-fail-modal";
import { useSuccessModal } from "@/features/subscriptions/stores/use-success-modal";

export const SubscriptionAlert = () => {
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
