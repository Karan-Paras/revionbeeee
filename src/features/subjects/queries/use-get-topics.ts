import { getTopics } from "@/features/subjects/api/get-topics";
import type { Topic } from "@/features/subjects/types";
import { ApiSuccessResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetTopics = (
  initialData?: ApiSuccessResponse<Array<Topic>>
) => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: getTopics,
    initialData,
  });
};
