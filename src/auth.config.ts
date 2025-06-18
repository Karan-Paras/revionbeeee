import { User } from "@/features/user/types";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = JSON.parse(credentials.user as string) as User;
        const token = credentials.token as string;

        if (!user || !token) {
          return null;
        }

        return {
          ...user,
          id: user.id.toString(),
          image: user.profilePicture,
          name: `${user.firstName} ${user.lastName}`,
          token,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
