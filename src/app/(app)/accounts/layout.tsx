import { ProfileSidebar } from "@/app/(app)/accounts/profile-sidebar";
import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { paths } from "@/routes";

interface AccountsLayoutProps {
  children: React.ReactNode;
}

export default function AccountsLayout({ children }: AccountsLayoutProps) {
  return (
    <>
      <BreadcrumbBanner
        title="Account"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.dashboard(),
          },
          {
            label: "Settings",
            href: paths.accounts.myProfile(),
          },
        ]}
      />

      <section className="bg-[#F6F6F6] py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-7 gap-5">
            <div className="col-span-2 h-full">
              <ProfileSidebar />
            </div>
            <div className="col-span-5">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
