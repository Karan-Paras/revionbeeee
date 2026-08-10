import { getProfile } from "@/features/user/api/get-profile";
import { useToken } from "@/hooks/use-token";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (enabled = true) => {
  const { token } = useToken();

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: enabled && !!token,
  });
};
