import fetcher from "@/lib/fetcher";
import { User } from "@/types/user";

export async function getProfile(token: string) {
  const apiUrl = "/user/profile";

  return await fetcher<User>(apiUrl, "GET", token, undefined, {
    tags: ["profile"],
  });
}
