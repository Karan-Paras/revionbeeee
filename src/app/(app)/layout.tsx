"use client";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

import { useRedirectIfProfileIncomplete } from "@/features/user/hooks/use-redirect-if-profile-incomplete";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  useRedirectIfProfileIncomplete();

  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  useEffect(() => {
    if (shouldBlock && !isLoading) {
      triggerPaywall();
    }
  }, [shouldBlock, triggerPaywall, isLoading]);

  return (
    <>
      <Header variant="dashboard" />
      {children}
      <Footer variant="compact" />
    </>
  );
}
