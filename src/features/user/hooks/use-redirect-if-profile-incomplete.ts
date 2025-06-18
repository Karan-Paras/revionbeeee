import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { isUserProfileComplete } from "@/features/user/utils";

import { paths } from "@/routes";

export function useRedirectIfProfileIncomplete() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      const user = session?.user;
      if (user) {
        const isProfileComplete = isUserProfileComplete(user);
        if (!isProfileComplete) {
          router.replace(paths.createProfile());
        }
      }
    }
  }, [router, session, status]);
}
