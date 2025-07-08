import { PasswordChangedCard } from "@/features/auth/components/password-changed-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Changed - Revision Bee",
  description: "Your password has been successfully updated.",
  robots: {
    index: false,
    follow: true,
  },
};

export default PasswordChangedCard;
