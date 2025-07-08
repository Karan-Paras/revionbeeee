import { Intro } from "@/assets/videos";
import { Modal } from "@/components/common/modal";
import { VideoPlayer } from "@/components/common/video-player";
import { CircleX } from "lucide-react";

interface IntroModalProps {
  onClose: () => void;
}

export function IntroModal({ onClose }: IntroModalProps) {
  return (
    <Modal
      className="!rounded-2xl !border-transparent !bg-[#000]"
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
