import { Modal } from "@/components/common/modal";
import { useFailModal } from "@/features/subscriptions/stores/use-fail-modal";
import { Cancel } from "@/lib/icons";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function FailModal() {
  const { onClose } = useFailModal();

  const pathname = usePathname();

  const router = useRouter();

  const handleClose = () => {
    router.replace(pathname);
    onClose();
  };

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
              <Cancel />
            </div>
            <div className="desc my-5 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                Something went wrong
              </h3>
              <p className="text-sm font-light text-[#6C6C6C]">
                We could not process your payment
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
