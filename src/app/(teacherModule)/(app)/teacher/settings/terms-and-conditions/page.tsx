import type { Metadata } from "next";
import TeacherSettingsPage from "../page";

export const metadata: Metadata = {
  title: "Terms & Conditions - Revision Bee",
  description: "Review the Revision Bee terms and conditions.",
};

export default function TeacherTermsAndConditionsPage() {
  return <TeacherSettingsPage />;
}
