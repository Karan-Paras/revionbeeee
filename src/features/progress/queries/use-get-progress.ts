import { getProgress } from "@/features/progress/api/get-progress";
import type { ID } from "@/types/globals";
import { useQuery } from "@tanstack/react-query";

export const useGetProgress = (topicID: ID | null) => {
  return useQuery({
    queryKey: ["progress", { topicID }],
    queryFn: () => getProgress(topicID),
    enabled: !!topicID,
    retry: false,
  });
};
