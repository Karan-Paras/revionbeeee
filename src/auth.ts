import authConfig from "@/auth.config";
import NextAuth from "next-auth";

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
