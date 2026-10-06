import { googleCredentials } from "@/features/auth/credentials";
import { User } from "@/features/user/types";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const { clientId, clientSecret } = googleCredentials();

export default {
  providers: [
    Google({ clientId, clientSecret }),
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
          image: user.profilePicture ?? user.profile_image_url,
          name:
            user.fullName?.trim() ||
            (user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : ""),
          profileStatus: user.profileStatus ?? user.profile_status,
          teacherProfileStatus:
            user.teacherProfileStatus ?? user.teacher_profile_status,
          isSubscribed: user.isSubscribed,
          created_at: user.created_at,
          token,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
