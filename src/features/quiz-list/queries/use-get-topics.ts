import { getTopics } from "@/features/subjects/api/get-topics";
import { useQuery } from "@tanstack/react-query";

export const useGetTopics = () => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: getTopics,
  });
};
