import Link from "next/link";
import { ProfileSidebar } from "@/app/(app)/accounts/profile-sidebar";

interface ProfileLayout {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayout) {
  return (
    <>
      <section className="act_bg relative bg-cover bg-no-repeat min-h-96">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 min-h-96 relative text-center items-center">
            <div className="col-span-2 pt-20">
              <h3 className="font-bold text-5xl text-white">Account</h3>
              <div className="flex justify-center gap-3 text-white my-5 uppercase">
                <div className="itm">
                  <Link className="text-white" href="">
                    Home
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F6F6] py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-7 gap-5">
            <div className="col-span-2">
              <ProfileSidebar />
            </div>
            <div className="col-span-5">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
