import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { DashboardCard } from "@/features/dashboard/components/dashboard-card";

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
