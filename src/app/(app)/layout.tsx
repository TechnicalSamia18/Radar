// Shared layout for the signed-in pages: navy sidebar on desktop, top bar on phones.
// The "(app)" folder name is a route group: it groups pages without adding "/app" to the URL.
import Link from "next/link";
import { GridIcon, RadarMark, UserIcon } from "@/components/icons";
import { NavLink } from "@/components/nav-link";

// Pages appear here as their milestones are built (Openings: M7, Companies: M2).
const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: <GridIcon /> },
  { href: "/profile", label: "Profile", icon: <UserIcon /> },
];

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-evening text-beige md:w-64 md:shrink-0">
        {/* The aside stretches to the page height (navy column); this inner block stays pinned while scrolling. */}
        <div className="md:sticky md:top-0">
        <div className="flex items-center justify-between gap-4 px-6 py-5 md:block md:py-8">
          <Link href="/" className="flex items-center gap-3 text-lg font-normal tracking-[0.3em]">
            <RadarMark className="h-5 w-5 text-rose" />
            RADAR
          </Link>
        </div>
        <nav aria-label="App" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-6 md:pb-0">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        </div>
      </aside>
      <main className="flex-1 bg-sand px-5 py-8 sm:px-10">{children}</main>
    </div>
  );
}
