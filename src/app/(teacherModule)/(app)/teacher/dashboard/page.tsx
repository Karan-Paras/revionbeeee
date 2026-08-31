import { TeacherDashboardContent } from "@/features/teacher/components/teacher-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Dashboard - Revision Bee",
  description: "Manage lessons, bookings, and students.",
};

export default function TeacherDashboard() {
  return <TeacherDashboardContent />;
}
