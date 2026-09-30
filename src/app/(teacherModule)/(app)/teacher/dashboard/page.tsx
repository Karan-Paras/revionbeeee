import type { Metadata } from "next";
import { TeacherDashboardLoader } from "./teacher-dashboard-loader";

export const metadata: Metadata = {
  title: "Teacher Dashboard - Revision Bee",
  description: "Manage lessons, bookings, and students.",
};

export default function TeacherDashboard() {
  return <TeacherDashboardLoader />;
}
