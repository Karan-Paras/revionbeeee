import { getProfile } from "@/features/user/api/get-profile";
import { ApiSuccessResponse } from "@/types/api";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (
  initialData: ApiSuccessResponse<User>,
  token: string
) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(token),
    initialData,
  });
