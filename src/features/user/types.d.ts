import type { ID, PhPBoolean } from "@/types/globals";

export interface User {
  id: ID;
  userType?: "student" | "teacher";
  profileStatus?: number;
  profile_status?: number;
  teacherProfileStatus?: number;
  teacher_profile_status?: number;
  fullName?: string;
  customerID: string | null;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  profile_image_url?: string;
  phoneNumber?: string;
  email?: string;
  gender?: "male" | "female";
  city?: string;
  state?: string;
  address?: string;
  isSubscribed: PhPBoolean;
  created_at: string;
}
