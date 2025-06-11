import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api/home";

export const useHomeTopics = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });
};
