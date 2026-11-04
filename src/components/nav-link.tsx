"use client";
// Sidebar link that highlights itself on the current page.
// Client component because it needs the current URL (usePathname).
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 border-l-2 px-4 py-3 text-base ${
        active ? "border-rose bg-stormy text-beige" : "border-transparent text-cloud hover:text-beige"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
