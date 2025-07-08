import { PassChng } from "@/assets/images";
import { Modal } from "@/components/common/modal";
import { ConfettiCelebration } from "@/components/feedback/confetti-celebration";
import PaymentProcessing from "@/features/subscriptions/components/payment-processing";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useSuccess } from "@/features/subscriptions/queries/use-success";
import { useSessionStore } from "@/features/subscriptions/stores/use-session-store";
import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import { useSuccessModal } from "@/features/subscriptions/stores/use-success-modal";
import { useStore } from "@/hooks/use-store";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export function SuccessModal() {
  const pathname = usePathname();
  const router = useRouter();

  const { onClose: onSuccessModalClose } = useSuccessModal();
  const { mutate, isPending } = useSuccess();

  const { onClose: onSubscriptionModalClose, isOpen } = useSubscriptionModal();

  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  const sessionId = useStore(useSessionStore, (state) => state.sessionId);

  const handleClose = useCallback(() => {
    if (isPending || isLoading) {
      return;
    }

    if (shouldBlock) {
      triggerPaywall();
    }

    onSuccessModalClose();
    router.replace(pathname);
  }, [
    isPending,
    isLoading,
    shouldBlock,
    triggerPaywall,
    pathname,
    router,
    onSuccessModalClose,
  ]);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    mutate({ sessionId });
  }, [sessionId, mutate]);

  useEffect(() => {
    if (isOpen) {
      onSubscriptionModalClose();
    }
  }, [onSubscriptionModalClose, isOpen]);

  useEffect(() => {
    if (shouldBlock && !isLoading) {
      handleClose();
    }
  }, [shouldBlock, isLoading, handleClose]);

  return isPending ? (
    <PaymentProcessing />
  ) : (
    <>
      {!shouldBlock && <ConfettiCelebration />}
      <Modal
        className="h-auto !w-auto border-0 bg-transparent bg-cover bg-no-repeat p-5 shadow-none"
        onClose={handleClose}
      >
        <div className="container mx-auto h-full">
          <div className="grid h-full content-center">
            <div className="relative m-auto w-11/12 max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
              <button
                disabled={isPending || isLoading}
                onClick={handleClose}
                className="absolute top-3 right-3"
              >
                <X />
              </button>

              <div className="img flex justify-center">
                <Image src={PassChng} alt="" />
              </div>
              <div className="desc my-5 text-center">
                <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                  Subscription successful!
                </h3>
                <p className="text-sm font-light text-[#6C6C6C]">
                  You have successfully subscribed to our service
                </p>
              </div>
              <div className="btn">
                <button
                  disabled={isPending || isLoading}
                  onClick={handleClose}
                  className="w-full cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
