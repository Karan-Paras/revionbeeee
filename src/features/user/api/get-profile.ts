import type { User } from "@/features/user/types";
import { fetchClient } from "@/lib/fetch-client";

export async function getProfile() {
  const apiUrl = "/profile";

  return await fetchClient<User>(apiUrl, "GET");
}
