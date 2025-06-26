import { Modal } from "@/components/common/modal";

import { SubscriptionPlans } from "@/features/subscriptions/components/subscription-plans";
import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import { SubscriptionType } from "@/features/subscriptions/types";

export function SubscriptionModal() {
  const { onClose } = useSubscriptionModal();

  return (
    <Modal title="Upgrade your Plan" onClose={onClose}>
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
