import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";

export const usePaywall = () => {
  const { data: profile, isLoading: isLoadingProfile } = useGetProfile();
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = isLoadingProfile || !profile?.data.isSubscribed;

  return {
    isLoading: isLoadingProfile,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
