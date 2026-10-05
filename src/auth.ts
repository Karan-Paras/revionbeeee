import authConfig from "@/auth.config";
import { socialAuth } from "@/features/auth/api/social-auth";
import {
  SOCIAL_AUTH_INTENT_COOKIE,
  SOCIAL_DEVICE_TOKEN_COOKIE,
  SOCIAL_LOGIN_ROLE_COOKIE,
} from "@/features/auth/constants";
import NextAuth from "next-auth";
import { cookies } from "next/headers";
//hello bhai
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.provider === "credentials") return true;
      if (
        account.provider !== "google" &&
        account.provider !== "microsoft-entra-id"
      ) {
        return false;
      }

      const cookieStore = await cookies();
      const role = cookieStore.get(SOCIAL_LOGIN_ROLE_COOKIE)?.value;
      const userType = role === "teacher" ? "teacher" : "student";
      const intent = cookieStore.get(SOCIAL_AUTH_INTENT_COOKIE)?.value;
      const deviceToken =
        cookieStore.get(SOCIAL_DEVICE_TOKEN_COOKIE)?.value ?? "";
      const isLogin = intent === "login";
      const returnPath = isLogin
        ? userType === "teacher"
          ? "/Tsignin"
          : "/student-login"
        : userType === "teacher"
          ? "/Tsignup"
          : "/student-signup";

      if (!user.email || !account.providerAccountId) {
        return `${returnPath}?socialError=${encodeURIComponent(
          "Google did not return the required email or account ID."
        )}`;
      }

      try {
        const response = await socialAuth({
          provider: account.provider === "google" ? "google" : "outlook",
          providerId: account.providerAccountId,
          email: user.email,
          name: user.name ?? "",
          avatar: user.image ?? "",
          deviceToken,
          userType,
        });
        Object.assign(user, response.data, {
          id: String(response.data.id),
          token: response.token,
          userType: response.data.userType ?? userType,
        });
        return true;
      } catch (error) {
        console.error("Social authentication failed", error);
        const message =
          error instanceof Error
            ? error.message
            : "Social registration failed.";
        return `${returnPath}?socialError=${encodeURIComponent(message)}`;
      }
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.token = user.token;
        token.userType = user.userType;
        token.teacherProfileStatus = user.teacherProfileStatus;
      }
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.picture = session.user.image;
        if (session.user.userType) {
          token.userType = session.user.userType;
        }
        if (session.user.teacherProfileStatus !== undefined) {
          token.teacherProfileStatus = session.user.teacherProfileStatus;
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.token = token.token as string;
      session.user.userType = token.userType as
        | "student"
        | "teacher"
        | undefined;
      session.user.teacherProfileStatus = token.teacherProfileStatus as
        | number
        | undefined;
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
