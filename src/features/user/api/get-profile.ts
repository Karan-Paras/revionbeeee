import fetcher from "@/lib/fetcher";
import { User } from "@/types/user";

export async function getProfile(token: string | undefined) {
  const apiUrl = "/user/profile";

  return await fetcher<User>(apiUrl, "GET", token);
}
