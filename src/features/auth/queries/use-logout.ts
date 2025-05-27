import { paths } from "@/routes";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.clear();

    signOut({
      redirectTo: paths.login(),
    });
  };
};
