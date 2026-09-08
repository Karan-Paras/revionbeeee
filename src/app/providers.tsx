"use client";

import { FirebaseMessagingProvider } from "@/components/providers/firebase-messaging-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { ActiveLessonSessionGuard } from "@/features/lessons/components/active-lesson-session-guard";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ActiveLessonSessionGuard />
      <QueryProvider>
        <FirebaseMessagingProvider />
        <ModalProvider />
        {children}
      </QueryProvider>
    </SessionProvider>
  );
}
