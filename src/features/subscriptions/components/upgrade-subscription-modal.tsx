import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Subscription } from "@/features/subscriptions/components/subscription";
import { ADVANCED_PLAN, BASIC_PLAN, STARTER_PLAN } from "@/features/types";
import Link from "next/link";

interface UpgradeSubscriptionModalProps {
  onClose: () => void;
}

export function UpgradeSubscriptionModal({
  onClose,
}: UpgradeSubscriptionModalProps) {
  return (
    <Modal
      className="justify-center txt_hed mt-5"
      title="Upgrade your Plan"
      onClose={onClose}
    >
      <div className="px-6 pb-5">
        <div className="hed mb-4 text-center">
          <p>Unlock more features with premium access.</p>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10">
          <Subscription plan={BASIC_PLAN} variant="compact" />
          <Subscription plan={STARTER_PLAN} variant="compact" isCurrent />
          <Subscription plan={ADVANCED_PLAN} variant="compact" />
          <div className="col-span-3">
            <div className="btn w-3/12 mx-auto my-5">
              <Link href="">
                <Button className="shadow-xl/10" type="button">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
