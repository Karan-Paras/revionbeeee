"use client";

import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useRedirectIfProfileIncomplete } from "@/features/user/hooks/use-redirect-if-profile-incomplete";
import { useEffect } from "react";

interface QuizLayoutProps {
  children: React.ReactNode;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
  useRedirectIfProfileIncomplete();

  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  useEffect(() => {
    if (shouldBlock && !isLoading) {
      triggerPaywall();
    }
  }, [shouldBlock, triggerPaywall, isLoading]);

  return children;
}
