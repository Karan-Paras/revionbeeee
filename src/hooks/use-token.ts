import { useSession } from "next-auth/react";

export const useToken = () => {
  const { data, status } = useSession();

  const token = data?.user?.token;
  const isLoading = status === "loading";

  return {
    token,
    isLoading,
  };
};
