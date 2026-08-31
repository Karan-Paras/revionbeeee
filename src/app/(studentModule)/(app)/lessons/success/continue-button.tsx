"use client";

import { paths } from "@/routes";

export function ContinueButton() {
  const handleContinue = () => {
    window.location.assign(paths.myLessons());
  };

  return (
    <button
      type="button"
      onClick={handleContinue}
      className="mt-6 grid h-12 w-full place-items-center rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-md hover:bg-[#398fdc]"
    >
      Continue
    </button>
  );
}
