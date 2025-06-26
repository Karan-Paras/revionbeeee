import type { User } from "@/features/user/types";
import fetcher from "@/lib/fetcher";

export async function getProfile() {
  const apiUrl = "/profile";

  return await fetcher<User>(apiUrl, "GET");
}
