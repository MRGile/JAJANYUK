
"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { kasirAktif } from "./config";

const menuItems = [
  {
    label: "Dashboard",
    href: "/kasir",
  },
  {
    label: "Pesanan",
    href: "/kasir/pesanan",
  },
  {
    label: "Riwayat",
    href: "/kasir/riwayat",
  },
  {
    label: "Profil",
    href: "/kasir/profil",
  },
];

export default function KasirLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [pathname, setPathname] = useState("/kasir");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isActive = (href: string) => {
    if (href === "/kasir") return pathname === href;

    return pathname === href || pathname.startsWith(href + "/");
  };

  const initials = kasirAktif.nama
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#493326]">
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-[#EFE5D9] bg-white px-5 py-7 md:flex">
        <Link href="/kasir" className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#493326] text-xl font-bold text-white">
            J
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              JajanYuk
            </h1>
            <p className="text-xs text-[#A18B78]">Panel Kasir</p>
          </div>
        </Link>

        {/* Tenant Aktif */}
        <div className="mb-8 rounded-2xl bg-[#FAF7F2] p-4">
          <p className="text-xs font-medium text-[#A18B78]">
            Tenant Aktif
          </p>

          <p className="mt-1 font-bold">
            Tenant {kasirAktif.tenantId}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-[#A18B78]">
              Akun aktif
            </span>
          </div>
        </div>

        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[1.5px] text-[#B7A596]">
          Menu Utama
        </p>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  active
                    ? "bg-[#F0E8DE] font-bold text-[#493326]"
                    : "text-[#8D7969] hover:bg-[#FAF7F2] hover:text-[#493326]"
                }`}
              >
                <span className="text-sm">{item.label}</span>

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#E99557]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profil */}
        <div className="border-t border-[#EFE5D9] pt-5">
          <Link
            href="/kasir/profil"
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#FAF7F2]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0E8DE] font-bold">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {kasirAktif.nama}
              </p>
              <p className="text-xs text-[#A18B78]">Kasir</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="min-h-screen pb-20 md:ml-[260px] md:pb-0">
        {children}
      </main>

      {/* Navigasi Mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#EFE5D9] bg-white px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 md:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          {menuItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-[65px] flex-col items-center gap-1 rounded-xl px-3 py-1.5 ${
                  active ? "text-[#E99557]" : "text-[#A18B78]"
                }`}
              >
                <span className="text-xs font-semibold">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
