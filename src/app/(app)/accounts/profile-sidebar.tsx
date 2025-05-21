"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { CircleUser, LogOut, Settings, Video } from "@/lib/icons";
import { paths } from "@/routes";

const sidebarItems = [
  {
    icon: <CircleUser />,
    title: "My Profile",
    href: paths.accounts.myProfile(),
  },
  {
    icon: <Video />,
    title: "Subscription",
    href: paths.accounts.subscription(),
  },
  {
    icon: <Settings />,
    title: "Settings",
    href: paths.accounts.settings(),
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();
  return (
    <div className="itm bg-white rounded-xl grad_colr">
      <ul className="p-4">
        {sidebarItems.map(({ href, icon, title }) => (
          <li
            key={href}
            className={cn(
              "flex gap-2 border-b border-[#D9D9D9] mb-3.5",
              pathname.startsWith(href) && "text-[#53A2EB] act_lst"
            )}
          >
            <Link
              className="flex items-center gap-2 cursor-pointer w-full p-4"
              href={href}
            >
              <span>{icon}</span>
              <h3>{title}</h3>
            </Link>
          </li>
        ))}
        <li onClick={() => signOut()} className="rounded-xl  flex gap-2  ">
          <div className="flex gap-2 cursor-pointer p-4 w-full">
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
