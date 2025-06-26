import type { ID, PhPBoolean } from "@/types/globals";

export interface User {
  id: ID;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  phoneNumber?: string;
  email?: string;
  gender?: "male" | "female";
  city?: string;
  state?: string;
  address?: string;
  isSubscribed: PhPBoolean;
}
