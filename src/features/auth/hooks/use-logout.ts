import { paths } from "@/routes";
import { QueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export const useLogout = () => {
  const queryClient = new QueryClient();

  return () => {
    queryClient.clear();

    signOut({
      redirectTo: paths.login(),
    });
  };
};
