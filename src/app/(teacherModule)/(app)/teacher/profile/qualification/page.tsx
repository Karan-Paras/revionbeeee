import type { Metadata } from "next";
import TeacherProfilePage from "../page";

export const metadata: Metadata = {
  title: "Qualifications - Revision Bee",
  description: "Manage your teaching qualifications.",
};

export default function TeacherQualificationPage() {
  return <TeacherProfilePage />;
}
