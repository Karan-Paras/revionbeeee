import type { Metadata } from "next";
import TeacherProfilePage from "../page";

export const metadata: Metadata = {
  title: "Certifications - Revision Bee",
  description: "Manage your professional teaching certifications.",
};

export default function TeacherCertificationsPage() {
  return <TeacherProfilePage />;
}
