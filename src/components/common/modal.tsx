"use client";

import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { useEffect } from "react";

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export function Modal({ title, children, onClose, className }: ModalProps) {
  useEffect(() => {
    function handleEscKey(event: { keyCode: number }) {
      if (event.keyCode === 27) {
        // 27 is the keycode for Escape key
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} />
      <dialog open>
        <div id="add_modal" className="fixed z-[999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
              <div className="absolute inset-0 bg-gray-950 opacity-75" />
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <motion.div
              className={cn(
                "inline-block align-bottom z-[999] relative bg-white border-[#ffffff26] border rounded-4xl text-left overflow-hidden shadow-xl transform transition-all frc_trnc sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full w-full",
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 180,
                  damping: 28,
                  mass: 0.8,
                  restDelta: 0.001,
                  restSpeed: 0.001,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
                transition: {
                  type: "spring",
                  stiffness: 160,
                  damping: 30,
                  duration: 0.45,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 28,
                mass: 0.8,
                restDelta: 0.001,
              }}
            >
              {/* Modal Content */}
              {title && (
                <div className="flex items-center p-4 border-b border-[#ffffff26]  justify-center txt_hed mt-5">
                  <h2 className="text-lg font-semibold text-[#232323]">
                    {title}
                  </h2>
                </div>
              )}
              {children}
            </motion.div>
          </div>
        </div>
      </dialog>
    </>
  );
}
