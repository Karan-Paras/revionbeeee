import { User } from "@/features/user/types";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET,
    }),
    MicrosoftEntraID,
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
