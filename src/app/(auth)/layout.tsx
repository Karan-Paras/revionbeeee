"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();

  return (
    <section className="bg-[#F3F3F3] p-5">
      <div className="grid grid-cols-2 md:h-[calc(100vh-50px)] min-h-screen">
        <div className="md:col-span-1 col-span-2  ">{children}</div>
        <div className="md:col-span-1 col-span-2 md:block hidden ">
          <div
            className={cn(
              "img relative rounded-xl border-2 border-white flex overflow-hidden  h-full bg-no-repeat bg-cover bg-center",
              pathname === "/login" && "log_bg",
              pathname === "/signup" && "sign_bg",
              pathname === "/create-profile" && "crt_bg"
            )}
          />
        </div>
      </div>
    </section>
  );
}
