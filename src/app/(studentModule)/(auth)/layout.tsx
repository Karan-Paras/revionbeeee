"use client";

import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  if (pathname === paths.login() || pathname === paths.studentLogin()) {
    return children;
  }

  return (
    <section className="bg-[#F3F3F3] p-5">
      <div className="grid grid-cols-2">
        <div className="col-span-2 md:col-span-1">{children}</div>
        <div className="col-span-2 hidden md:col-span-1 md:block">
          <div
            className={cn(
              "img relative flex h-full overflow-hidden rounded-xl border-2 border-white bg-cover bg-center bg-no-repeat",
              (pathname === paths.login() ||
                pathname === paths.studentLogin()) &&
                "log_bg",
              (pathname === paths.signup() ||
                pathname === paths.studentSignup()) &&
                "sign_bg",
              pathname === paths.createProfile() && "crt_bg"
            )}
          />
        </div>
      </div>
    </section>
  );
}
