import api from "@/lib/api";
import { User } from "@/types/user";

export async function getProfile() {
  const apiUrl = "/user/profile";
  return await api<User>(apiUrl, "GET", undefined, { tags: ["user"] });
}
