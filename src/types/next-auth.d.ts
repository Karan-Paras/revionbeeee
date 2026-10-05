import type { DefaultSession } from "next-auth";
declare module "next-auth" {
  export interface User extends DefaultSession.user {
    id: string;
    token: string;
    userType?: "student" | "teacher";
    profileStatus?: number;
    teacherProfileStatus?: number;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    token: string;
    userType?: "student" | "teacher";
    profileStatus?: number;
    teacherProfileStatus?: number;
  }
}
