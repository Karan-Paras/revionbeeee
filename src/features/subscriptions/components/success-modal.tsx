import { Modal } from "@/components/common/modal";
import { useSuccess } from "@/features/subscriptions/queries/use-success";
import { useSessionStore } from "@/features/subscriptions/stores/use-session-store";
import { useSuccessModal } from "@/features/subscriptions/stores/use-success-modal";
import { useStore } from "@/hooks/use-store";
import { PassChng } from "@/lib/assets";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function SuccessModal() {
  const pathname = usePathname();
  const router = useRouter();

  const { onClose } = useSuccessModal();
  const { mutate, isPending } = useSuccess();

  const sessionId = useStore(useSessionStore, (state) => state.sessionId);

  const handleClose = () => {
    if (isPending) {
      return;
    }

    router.replace(pathname);
    onClose();
  };

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    mutate({ sessionId });
  }, [sessionId, mutate]);

  return (
    <Modal
      className="h-auto !w-auto border-0 bg-transparent bg-cover bg-no-repeat p-5 shadow-none"
      onClose={handleClose}
    >
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">
          <div className="relative m-auto w-11/12 max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
            <div onClick={handleClose} className="absolute top-3 right-3">
              <X />
            </div>

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
  );
}
