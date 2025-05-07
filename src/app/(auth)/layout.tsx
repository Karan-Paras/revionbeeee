"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <section className="bg-[#F3F3F3] p-5">
        <div className="grid grid-cols-2 h-[calc(100vh-50px)]">
          <div className="col-span-1">{children}</div>
          <div className="col-span-1">
            <div
              className={cn(
                "img relative rounded-xl border-2 border-white flex overflow-hidden  h-full bg-no-repeat bg-cover bg-center",
                pathname === "/login" ? "log_bg" : "sign_bg"
              )}
            />
          </div>
        </div>
      </section>
    </>
  );
}
