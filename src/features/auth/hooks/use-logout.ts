import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { logout } from "@/features/auth/api/logout";

import { paths } from "@/routes";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.clear();

    logout().then(() =>
      signOut({
        redirectTo: paths.login(),
      })
    );
  };
};
