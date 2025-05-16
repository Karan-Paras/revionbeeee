import { ID } from "@/types/globals";

export interface User {
  id: ID;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}
