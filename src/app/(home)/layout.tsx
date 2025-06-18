"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { IntroModal } from "@/app/(home)/intro-modal";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const [showIntroModal, setShowIntroModal] = useState(false);

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setShowIntroModal(false);
    }

    if (status === "unauthenticated") {
      setShowIntroModal(true);
    }
  }, [status]);

  return (
    <>
      {showIntroModal && (
        <IntroModal onClose={() => setShowIntroModal(false)} />
      )}
      {children}
    </>
  );
}
