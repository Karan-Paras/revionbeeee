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
      <div className="grid min-h-screen grid-cols-2 md:h-[calc(100vh-50px)]">
        <div className="col-span-2 md:col-span-1">{children}</div>
        <div className="col-span-2 hidden md:col-span-1 md:block">
          <div
            className={cn(
              "img relative flex h-full overflow-hidden rounded-xl border-2 border-white bg-cover bg-center bg-no-repeat",
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
