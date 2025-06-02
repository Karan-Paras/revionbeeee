import { getTopics } from "@/features/topics/api/get-topics";
import { useQuery } from "@tanstack/react-query";

export const useGetTopics = () => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: getTopics,
  });
};
