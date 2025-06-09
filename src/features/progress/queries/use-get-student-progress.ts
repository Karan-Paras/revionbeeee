import type { ID } from "@/types/globals";
import { useQuery } from "@tanstack/react-query";
import { getStudentProgress } from "../api/get-student-progress";

export const useGetStudentProgress = (topicID: ID) => {
  return useQuery({
    queryKey: ["progress", { topicID }],
    queryFn: () => getStudentProgress(topicID),
  });
};
