import { UpdateProfileForm } from "@/features/user/components/update-profile-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile - Revision Bee",
  description: "Update your profile details to keep your account accurate.",
  robots: {
    index: false,
    follow: false,
  },
};

export default UpdateProfileForm;
