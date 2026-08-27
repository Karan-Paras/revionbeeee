"use client";

import { listenForForegroundMessages } from "@/lib/firebase";
import { useEffect } from "react";
import { toast } from "sonner";

export function FirebaseMessagingProvider() {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    listenForForegroundMessages((payload) => {
      const title = payload.notification?.title ?? "Revision Bee";
      const description =
        payload.notification?.body ?? payload.data?.body ?? "New notification";
      const link = payload.fcmOptions?.link ?? payload.data?.link;

      toast(title, {
        description,
        ...(link
          ? {
              action: {
                label: "Open",
                onClick: () => window.location.assign(link),
              },
            }
          : {}),
      });
    })
      .then((cleanup) => {
        unsubscribe = cleanup;
      })
      .catch((error) => {
        console.error("Unable to initialize Firebase messaging", error);
      });

    return () => unsubscribe?.();
  }, []);

  return null;
}
