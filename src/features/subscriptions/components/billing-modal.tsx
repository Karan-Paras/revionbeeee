import { Modal } from "@/components/common/modal";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { Billing } from "@/lib/icons";
import { X } from "lucide-react";

interface BillingModalProps {
  onClose: () => void;
}

export function BillingModal({ onClose }: BillingModalProps) {
  const { shouldBlock, triggerPaywall } = usePaywall();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    // mutation.mutate();
  };

  return (
    <Modal
      className="h-auto !w-auto border-0 bg-transparent bg-cover bg-no-repeat p-5 shadow-none"
      onClose={onClose}
    >
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="relative m-auto w-11/12 max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
            <div onClick={onClose} className="absolute top-3 right-3">
              <X />
            </div>
            <div className="img flex justify-center">
              <Billing />
            </div>
            <div className="desc my-5 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                Manage Your Subscription
              </h3>
              <p className="text-sm font-light text-[#6C6C6C]">
                You&apos;ll be redirected to our secure Stripe billing portal to
                view invoices, update payment details, upgrade, or cancel your
                subscription.
              </p>
            </div>
            <div className="btn">
              <button
                onClick={onClick}
                className="w-full cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
