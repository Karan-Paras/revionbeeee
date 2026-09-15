import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackLink({ href, label = "Back", className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-[#222] transition hover:text-[#53a2eb] ${className ?? ""}`}
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  );
}
