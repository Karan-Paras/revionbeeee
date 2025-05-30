import fetcher from "@/lib/fetcher";
import { User } from "@/features/user/types";

export async function getProfile() {
  const apiUrl = "/user/profile";

  return await fetcher<User>(apiUrl, "GET");
}
