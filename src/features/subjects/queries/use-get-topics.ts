import { getTopicsOnClient } from "@/features/subjects/api/get-topics-on-client";
import type { Topic } from "@/features/subjects/types";
import type { ApiSuccessResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetTopics = (
  initialData?: ApiSuccessResponse<Array<Topic>>
) => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: getTopicsOnClient,
    initialData,
  });
};
