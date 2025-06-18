import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/features/user/api/get-profile";
import { useToken } from "@/hooks/use-token";

export const useGetProfile = () => {
  const { token } = useToken();

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token,
  });
};
