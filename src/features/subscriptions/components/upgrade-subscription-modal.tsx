import { Modal } from "@/components/common/modal";

import { SubscriptionPlans } from "@/features/subscriptions/components/subscription-plans";
import { SubscriptionType } from "@/features/subscriptions/types";

interface UpgradeSubscriptionModalProps {
  onClose: () => void;
}

export function UpgradeSubscriptionModal({
  onClose,
}: UpgradeSubscriptionModalProps) {
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
