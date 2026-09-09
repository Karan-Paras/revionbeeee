"use client";

import { SessionProvider as Session } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <Session refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </Session>
  );
}
