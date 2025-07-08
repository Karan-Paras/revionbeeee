import { getSubjectsOnClient } from "@/features/subjects/api/get-subjects-on-client";
import type { Topic } from "@/features/subjects/types";
import type { ApiSuccessResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSubjects = (
  initialData?: ApiSuccessResponse<Array<Topic>>
) => {
  return useQuery({
    queryKey: ["subject"],
    queryFn: getSubjectsOnClient,
    initialData,
  });
};
