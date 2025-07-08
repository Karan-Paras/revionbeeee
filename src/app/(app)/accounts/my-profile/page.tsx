import { UserProfileCard } from "@/features/user/components/user-profile-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Revision Bee",
  description: "Manage your personal information and preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

export default UserProfileCard;
