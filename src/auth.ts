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
      }
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.picture = session.user.image;
      }
      return token;
    },
    session({ session, token }) {
      session.user.token = token.token as string;
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
