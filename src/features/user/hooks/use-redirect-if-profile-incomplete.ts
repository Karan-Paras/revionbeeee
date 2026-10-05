import { paths } from "@/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectIfProfileIncomplete() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      const user = session?.user;
      if (user) {
        if (Number(user.profileStatus) === 1) {
          router.replace(paths.createProfile());
        }
      }
    }
  }, [router, session, status]);
}
