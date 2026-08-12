import type { Metadata } from "next";
import TeacherProfilePage from "../page";

export const metadata: Metadata = {
  title: "Availability - Revision Bee",
  description: "View your teaching availability.",
};

export default function TeacherAvailabilityProfilePage() {
  return <TeacherProfilePage />;
}
