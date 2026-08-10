import type { Metadata } from "next";
import TeacherSettingsPage from "../page";

export const metadata: Metadata = {
  title: "About Us - Revision Bee",
  description: "Learn more about Revision Bee and our teaching community.",
};

export default function TeacherAboutUsPage() {
  return <TeacherSettingsPage />;
}
