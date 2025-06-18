"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  active?: boolean;
}

export function NavLink({
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
