import type { Metadata } from "next";
import TeacherBookingsPage from "../page";

export const metadata: Metadata = {
  title: "Accepted Booking Requests - Revision Bee",
  description: "Review and manage accepted student lesson requests.",
};

export default function AcceptedBookingsPage() {
  return <TeacherBookingsPage />;
}
