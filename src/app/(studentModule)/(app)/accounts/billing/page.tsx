import { Billing } from "@/features/subscriptions/components/billing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing - Revision Bee",
  description: "View and manage your subscription and payment methods.",
  robots: {
    index: false,
    follow: false,
  },
};

export default Billing;
