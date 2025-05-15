import authConfig from "@/auth.config";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token;
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
