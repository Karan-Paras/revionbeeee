import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import {
  isFreeTrialActive,
  isUserSubscribed,
} from "@/features/subscriptions/utils";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { useCallback } from "react";

export const usePaywall = () => {
  const { data: profile, isLoading, isPending } = useGetProfile();
  const { onOpen } = useSubscriptionModal();

  const isSubscribed = isUserSubscribed(profile?.data.isSubscribed);
  const hasFreeTrial = isFreeTrialActive(profile?.data.created_at);
  const shouldBlock = Boolean(profile && !isSubscribed && !hasFreeTrial);

  return {
    isLoading: isLoading || isPending,
    shouldBlock,
    triggerPaywall: useCallback(() => {
      onOpen();
    }, [onOpen]),
  };
};
