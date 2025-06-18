import fetcher from "@/lib/fetcher";
import type { User } from "@/features/user/types";

export async function getProfile() {
  const apiUrl = "/profile";

  return await fetcher<User>(apiUrl, "GET");
}
