import { getProgressTopics } from "../api/get-topics";
import { useQuery } from "@tanstack/react-query";

export const useGetLevelTopics = () => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: getProgressTopics,
  });
};
