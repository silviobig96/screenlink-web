"use client";

import {
  LayoutDashboard,
  Library,
  ListVideo,
  Monitor,
  Settings,
  Unplug,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export const navigationItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    shortLabel: "Home",
    icon: LayoutDashboard,
  },
  { href: "/screens", label: "Screens", shortLabel: "Screens", icon: Monitor },
  { href: "/pair", label: "Pair TV", shortLabel: "Pair", icon: Unplug },
  { href: "/media", label: "Media", shortLabel: "Media", icon: Library },
  {
    href: "/playlists",
    label: "Playlists",
    shortLabel: "Lists",
    icon: ListVideo,
  },
  {
    href: "/settings",
    label: "Settings",
    shortLabel: "Settings",
    icon: Settings,
  },
];

function isActive(pathname: string, href: string) {
  return (
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(`${href}/`))
  );
}

export function DesktopNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary navigation" className="mt-8 space-y-1">
      {navigationItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
            isActive(pathname, href)
              ? "bg-cyan-400/10 text-cyan-200"
              : "text-slate-400 hover:bg-white/[.05] hover:text-white",
          )}
        >
          <Icon aria-hidden className="size-5" /> {label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-6 rounded-2xl border border-white/10 bg-slate-950/90 p-1.5 shadow-2xl backdrop-blur-xl lg:hidden"
    >
      {navigationItems.map(({ href, shortLabel, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition",
            isActive(pathname, href)
              ? "bg-cyan-400/10 text-cyan-300"
              : "text-slate-500",
          )}
        >
          <Icon aria-hidden className="size-[18px]" /> {shortLabel}
        </Link>
      ))}
    </nav>
  );
}
