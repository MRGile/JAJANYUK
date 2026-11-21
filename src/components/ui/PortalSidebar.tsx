"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { UserRound } from "lucide-react";
import { Sidebar, SidebarBody, useSidebar } from "@/components/ui/sidebar";

export interface PortalSidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface PortalSidebarProps {
  homeHref: string;
  items: PortalSidebarItem[];
  profileHref: string;
  profileName: string;
  profileDescription: string;
}

function PortalSidebarContent({
  homeHref,
  items,
  profileHref,
  profileName,
  profileDescription,
}: PortalSidebarProps) {
  const pathname = usePathname();
  const { open, setOpen } = useSidebar();

  return (
    <div className="flex h-full min-h-[calc(100vh-2rem)] flex-col">
      <Link
        href={homeHref}
        onClick={() => setOpen(false)}
        aria-label="JajanYuk beranda"
        className={`mb-8 flex items-center py-3 ${
          open ? "justify-start px-2" : "justify-center px-0"
        }`}
      >
        <Image
          src="/jajanyuk-logo.png"
          alt="Logo JajanYuk"
          width={1536}
          height={1024}
          fetchPriority="high"
          className={`h-auto shrink-0 ${open ? "w-40" : "w-6"}`}
        />
      </Link>

      <nav aria-label="Menu utama" className="min-h-0 flex-1">
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === homeHref
                ? pathname === homeHref
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                title={!open ? item.label : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 ${
                  active
                    ? "bg-amber-500 font-semibold text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} strokeWidth={1.8} className="shrink-0" />
                {open && <span className="whitespace-nowrap text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-4">
        <Link
          href={profileHref}
          onClick={() => setOpen(false)}
          aria-current={pathname === profileHref ? "page" : undefined}
          title={!open ? profileName : undefined}
          className={`flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-amber-400 ${
            pathname === profileHref || pathname.startsWith(`${profileHref}/`)
              ? "bg-slate-800"
              : ""
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/20 text-amber-400">
            <UserRound size={19} />
          </div>
          {open && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{profileName}</p>
              <p className="truncate text-xs text-slate-400">
                {profileDescription}
              </p>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default function PortalSidebar(props: PortalSidebarProps) {
  return (
    <Sidebar animate>
      <SidebarBody className="!min-h-screen border-r border-slate-800 !bg-slate-900 !text-white md:sticky md:top-0 md:!h-screen md:self-start">
        <PortalSidebarContent {...props} />
      </SidebarBody>
    </Sidebar>
  );
}
