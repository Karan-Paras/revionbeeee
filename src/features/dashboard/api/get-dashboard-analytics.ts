import { Home } from "@/features/subjects/types";
import { fetchClient } from "@/lib/fetch-client";

export async function getDashboardAnalytics() {
  const apiUrl = "/home";

  return await fetchClient<Home>(apiUrl, "GET", undefined, {
    auth: false,
  });
}
