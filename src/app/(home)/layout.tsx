"use client";

import { useState } from "react";

import { IntroModal } from "@/app/(home)/intro-modal";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const [showIntroModal, setShowIntroModal] = useState(true);

  return (
    <>
      {showIntroModal && (
        <IntroModal onClose={() => setShowIntroModal(false)} />
      )}
      {children}
    </>
  );
}
