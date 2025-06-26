"use client";

import { Modals } from "@/app/(app)/modals";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { SubscriptionAlerts } from "@/features/subscriptions/components/subscription-alerts";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useRedirectIfProfileIncomplete } from "@/features/user/hooks/use-redirect-if-profile-incomplete";
import { Suspense, useEffect } from "react";

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
      <Modals />
      <Suspense fallback={null}>
        <SubscriptionAlerts />
      </Suspense>
      <Header variant="dashboard" />
      {children}
      <Footer variant="compact" />
    </>
  );
}
