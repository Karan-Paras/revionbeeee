import type { Metadata } from "next";
import TeacherSettingsPage from "../page";

export const metadata: Metadata = {
  title: "Contact Us - Revision Bee",
  description: "Contact the Revision Bee support team.",
};

export default function TeacherContactUsPage() {
  return <TeacherSettingsPage />;
}
