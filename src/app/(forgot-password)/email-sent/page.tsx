import { EmailSentCard } from "@/features/auth/components/email-sent-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Sent - Revision Bee",
  description: "We've sent you an email with instructions to continue.",
  robots: {
    index: false,
    follow: true,
  },
};

export default EmailSentCard;
