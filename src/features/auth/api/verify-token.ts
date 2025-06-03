import api from "@/lib/api";

export async function verifyToken(token: string) {
  const apiUrl = "/verify/token";
  return await api(apiUrl, "POST", {
    token,
  });
}
