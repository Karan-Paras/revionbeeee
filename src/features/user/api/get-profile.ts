import fetcher from "@/lib/fetcher";
import { User } from "@/types/user";
import { cache } from "react";

export const getProfile = cache(async (token: string) => {
  const apiUrl = "/user/profile";

  return await fetcher<User>(apiUrl, "GET", token);
});
