import { Modal } from "@/components/common/modal";
import { useBilling } from "@/features/subscriptions/queries/use-billing";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { Billing } from "@/lib/icons";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

interface BillingModalProps {
  onClose: () => void;
}

export function BillingModal({ onClose }: BillingModalProps) {
  const pathname = usePathname();
  const { data, isPending } = useGetProfile();

  const mutation = useBilling();

  const onClick = () => {
    mutation.mutate({
      callback: pathname,
      customerId: data?.data.customerID || "",
    });
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
                view or cancel your subscription.
              </p>
            </div>
            <div className="btn">
              <button
                onClick={onClick}
                disabled={isPending || mutation.isPending}
                className="w-full cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white"
              >
                {isPending
                  ? "Processing..."
                  : mutation.isPending
                    ? "Redirecting..."
                    : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
