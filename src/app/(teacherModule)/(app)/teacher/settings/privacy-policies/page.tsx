import type { Metadata } from "next";
import TeacherSettingsPage from "../page";

export const metadata: Metadata = {
  title: "Privacy Policies - Revision Bee",
  description: "Review the Revision Bee privacy policies.",
};

export default function TeacherPrivacyPoliciesPage() {
  return <TeacherSettingsPage />;
}
