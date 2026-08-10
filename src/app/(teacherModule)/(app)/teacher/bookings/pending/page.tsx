import type { Metadata } from "next";
import TeacherBookingsPage from "../page";

export const metadata: Metadata = {
  title: "Pending Booking Requests - Revision Bee",
  description: "Review and respond to pending student lesson requests.",
};

export default function PendingBookingsPage() {
  return <TeacherBookingsPage />;
}
