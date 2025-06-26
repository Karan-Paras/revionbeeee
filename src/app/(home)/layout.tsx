"use client";

import { IntroModal } from "@/app/(home)/intro-modal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
