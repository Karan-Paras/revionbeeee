import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DashboardCard } from "@/features/dashboard/components/dashboard-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Revision Bee",
  description: "View your learning statistics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Dashboard() {
  return (
    <>
      <BreadcrumbBanner
        title="Welcome Back!"
        breadcrumbs={[
          {
            label: "Buzzing with Knowledge",
            href: "#",
          },
        ]}
      />
      <section className="bg-[#F6F6F6] px-10 py-16 md:px-10">
        <div className="container mx-auto">
          <DashboardCard />
        </div>
      </section>
    </>
  );
}
