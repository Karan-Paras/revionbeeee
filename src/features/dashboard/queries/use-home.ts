import { getHomeData } from "@/features/dashboard/api/home";
import { useQuery } from "@tanstack/react-query";

export const useHomeTopics = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });
};
