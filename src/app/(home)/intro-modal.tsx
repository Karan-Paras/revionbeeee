import { Modal } from "@/components/common/modal";
import { VideoPlayer } from "@/features/videos/components/video-player";

import { Intro } from "@/lib/assets";
import { CircleX } from "lucide-react";

interface IntroModalProps {
  onClose: () => void;
}

export function IntroModal({ onClose }: IntroModalProps) {
  return (
    <Modal
      className="!bg-[#000] !rounded-2xl !border-transparent "
      onClose={onClose}
    >
      <span
        className="absolute top-3 right-3 z-[999] cursor-pointer text-white"
        onClick={onClose}
      >
        <CircleX stroke="#fff" />
      </span>
      <div className="px-3 pb-3">
        <VideoPlayer src={Intro} autoPlay muted />
      </div>
    </Modal>
  );
}
