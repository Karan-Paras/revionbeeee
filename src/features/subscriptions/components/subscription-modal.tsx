import { Modal } from "@/components/common/modal";
import { SubscriptionPlans } from "@/features/subscriptions/components/subscription-plans";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import { SubscriptionType } from "@/features/subscriptions/types";

export function SubscriptionModal() {
  const { onClose } = useSubscriptionModal();

  const { shouldBlock, isLoading } = usePaywall();

  const handleClose = () => {
    if (!shouldBlock) {
      onClose();
    }
  };

  return (
    <Modal onClose={handleClose}>
      <h2 className="mt-10 mb-4 text-center text-2xl font-semibold">
        {shouldBlock && !isLoading ? (
          <>
            Your Free Trial has expired,&nbsp;
            <span className="text-[#FBBE1B]">Upgrade your Plan</span>
          </>
        ) : (
          "Upgrade your Plan"
        )}
      </h2>
      <div className="px-6 pb-5">
        <div className="hed mb-4 text-center">
          <p>Unlock more features with premium access.</p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-5">
          <SubscriptionPlans
            activePlan={SubscriptionType.FREE}
            variant="compact"
          />
        </div>
      </div>
    </Modal>
  );
}
