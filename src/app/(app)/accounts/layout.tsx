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

      <section className="bg-[#F6F6F6] 2xl:py-20 2xl:px-0 md:px-10 px-5 py-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-7 gap-5">
            <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-3 md:col-span-3 col-span-7 h-full">
              <ProfileSidebar />
            </div>
            <div className="2xl:col-span-5 xl:col-span-5 lg:col-span-4 md:col-span-4 col-span-7">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
