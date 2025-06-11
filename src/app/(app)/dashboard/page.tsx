import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { Home } from "@/features/Home/components/home";

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
      <section className="bg-[#F6F6F6] py-20">
        <div className="container mx-auto">
          <Home />
        </div>
      </section>
    </>
  );
}
