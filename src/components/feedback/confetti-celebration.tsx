"use client";

import { useWindowSize } from "@/hooks/use-window-size";
import Confetti from "react-confetti";

export const ConfettiCelebration = () => {
  const [width, height] = useWindowSize();

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />
    </div>
  );
};
