import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { addDays, isFuture } from "date-fns";
import { useCallback } from "react";

export const usePaywall = () => {
  const { data: profile, isLoading, isPending } = useGetProfile();
  const { onOpen } = useSubscriptionModal();

  let shouldBlock = !profile?.data.isSubscribed;

  // If the user is not subscribed, check if they are within the free trial period
  if (profile && shouldBlock) {
    const createdAt = profile?.data.created_at;

    if (createdAt) {
      const createdDate = new Date(createdAt);
      const expiryDate = addDays(createdDate, 3);

      if (isFuture(expiryDate)) {
        shouldBlock = false;
      }
    }
  }

  return {
    isLoading: isLoading || isPending,
    shouldBlock,
    triggerPaywall: useCallback(() => {
      onOpen();
    }, [onOpen]),
  };
};
