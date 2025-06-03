import fetcher from "@/lib/fetcher";

export async function logout() {
  const apiUrl = "/logout";
  return await fetcher(apiUrl, "POST");
}
