"use client";

import { syncFetchClientSessionToken } from "@/lib/fetch-client";
import { SessionProvider as Session, useSession } from "next-auth/react";
import { useEffect } from "react";

function SessionTokenSync() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    syncFetchClientSessionToken(data?.user?.token);
  }, [data?.user?.token, status]);

  return null;
  //new change
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <Session refetchInterval={0} refetchOnWindowFocus={false}>
      <SessionTokenSync />
      {children}
    </Session>
  );
}
