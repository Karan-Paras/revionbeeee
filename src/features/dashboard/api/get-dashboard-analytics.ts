import { Home } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";

export async function getDashboardAnalytics() {
  const apiUrl = "/home";

  return await fetcher<Home>(apiUrl, "GET");
}
