import { Home } from "@/features/subjects/types";
import fetcher from "@/lib/fetcher";

// interface ApiResponse {
//     data: Home;
//     status: number;
//     message: string;
//   }

export async function getHomeData() {
  const apiUrl = "/home";

  return await fetcher<Home>(apiUrl, "GET");
}
