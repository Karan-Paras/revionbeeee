"use client";

import { CircleUser, LogOut, Settings } from "@/assets/icons";
import { useLogoutModal } from "@/features/auth/stores/use-logout-modal";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    icon: <CircleUser />,
    title: "My Profile",
    href: paths.accounts.myProfile(),
  },
  {
    icon: <CreditCard />,
    title: "Billing",
    href: paths.accounts.billing(),
  },
  {
    icon: <Settings />,
    title: "Settings",
    href: paths.accounts.settings(),
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  const { onOpen } = useLogoutModal();

  return (
    <div className="itm grad_colr rounded-xl bg-white h-full">
      <ul className="p-4">
        {sidebarItems.map(({ href, icon, title }) => (
          <li
            key={href}
            className={cn(
              "mb-3.5 flex gap-2 border-b border-[#D9D9D9]",
              pathname.startsWith(href) && "act_lst text-[#53A2EB]"
            )}
          >
            <Link
              className="flex w-full cursor-pointer items-center gap-2 p-4"
              href={href}
            >
              <span>{icon}</span>
              <h3>{title}</h3>
            </Link>
          </li>
        ))}
        <li onClick={onOpen} className="flex gap-2 rounded-xl">
          <div className="flex w-full cursor-pointer gap-2 p-4">
            <span>
              <LogOut />
            </span>
            <h3>Logout</h3>
          </div>
        </li>
      </ul>
    </div>
  );
}
