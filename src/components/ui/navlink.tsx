"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  active?: boolean;
}

export default function NavLink({
  active,
  href,
  activeClassName,
  className,
  children,
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = active || pathname === href;

  return (
    <Link href={href} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  );
}
