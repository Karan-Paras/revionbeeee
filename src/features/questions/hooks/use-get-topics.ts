import { getTopics } from "@/features/questions/api/get-topics";
import { useQuery } from "@tanstack/react-query";

export const useGetTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: () => getTopics(),
  });
};
