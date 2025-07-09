"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

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
        <div
          id="add_modal"
          className="fixed inset-0 z-[999999] overflow-y-auto"
        >
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
              <div className="absolute inset-0 bg-gray-950 opacity-75" />
            </div>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <motion.div
              className={cn(
                "frc_trnc relative z-[999] inline-block w-full transform overflow-hidden rounded-4xl border border-[#ffffff26] bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:align-middle",
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
              {title && (
                <div className="txt_hed mt-5 flex items-center justify-center border-b border-[#ffffff26] p-4">
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
