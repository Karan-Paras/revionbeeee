import { User } from "@/features/user/types";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
          name:
            user.fullName?.trim() ||
            (user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : ""),
          token,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
