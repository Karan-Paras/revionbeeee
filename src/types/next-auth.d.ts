import type { DefaultSession } from "next-auth";
declare module "next-auth" {
  export interface User extends DefaultSession.user {
    token: string;
    userType?: "student" | "teacher";
    teacherProfileStatus?: number;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    userType?: "student" | "teacher";
    teacherProfileStatus?: number;
  }
}
