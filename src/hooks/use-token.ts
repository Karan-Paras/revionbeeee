import {
  getCachedFetchClientSessionToken,
  subscribeFetchClientSessionToken,
} from "@/lib/fetch-client";
import { useSyncExternalStore } from "react";

export const useToken = () => {
  const token = useSyncExternalStore(
    subscribeFetchClientSessionToken,
    () => getCachedFetchClientSessionToken(),
    () => undefined
  );

  return {
    token,
    isLoading: false,
  };
};
