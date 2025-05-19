import { type DefaultSession } from "next-auth";
declare module "next-auth" {
  export interface User extends DefaultSession.user {
    token: string;
  }

  interface Session {
    user: User;
  }
}
