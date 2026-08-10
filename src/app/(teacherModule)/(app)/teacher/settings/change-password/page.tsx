import type { Metadata } from "next";
import TeacherSettingsPage from "../page";

export const metadata: Metadata = {
  title: "Change Password - Revision Bee",
  description: "Update your Revision Bee teacher account password.",
};

export default function TeacherChangePasswordPage() {
  return <TeacherSettingsPage />;
}
