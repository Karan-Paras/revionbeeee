import { User as UserTypes } from "@/types/user";

declare module "next-auth" {
  interface User extends UserTypes {
    token: string;
  }

  interface Session {
    user: User;
  }
}
