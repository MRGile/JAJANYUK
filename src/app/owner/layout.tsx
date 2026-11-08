
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/owner", label: "Dashboard" },
  { href: "/owner/laporan", label: "Laporan Keuangan" },
  { href: "/owner/transaksi", label: "Riwayat Transaksi" },
  { href: "/owner/produk", label: "Manajemen Produk" },
  { href: "/owner/profil", label: "Pengaturan Profil" },
];

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased md:flex">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3 text-white shadow-md md:hidden">
        <Link href="/owner" className="flex items-center gap-2.5">
          <span className="text-lg font-bold tracking-tight">
            Jajan<span className="text-amber-400">Yuk</span>
          </span>
          <span className="ml-1 rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
            Owner
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          className="rounded-lg bg-slate-800 p-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {menuOpen ? "Tutup" : "Menu"}
        </button>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-white transition-transform md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="border-b border-slate-800 p-5">
          <Link
            href="/owner"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-black"
          >
            Jajan<span className="text-amber-400">Yuk</span>
          </Link>
          <p className="mt-1 text-xs font-medium text-slate-400">
            Portal Pemilik Kantin
          </p>
        </div>

        <nav
          aria-label="Navigasi Owner"
          className="flex-1 space-y-1 p-4"
        >
          <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Menu Utama
          </p>

          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/owner" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-xl px-3.5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 ${
                  active
                    ? "bg-amber-500 font-semibold text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Account Information */}
        <div className="border-t border-slate-800 p-4">
          <p className="text-xs text-slate-400">Akun Owner</p>
          <p className="mt-1 text-sm font-semibold">
            Profil belum terhubung
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Data akun akan tampil setelah autentikasi tersedia.
          </p>

          <button
            type="button"
            disabled
            title="Logout aktif setelah autentikasi tersedia"
            className="mt-4 w-full cursor-not-allowed rounded-lg border border-slate-700 px-3 py-2 text-left text-sm text-slate-400"
          >
            Logout · belum tersedia
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col md:ml-64">
        {/* Desktop Header */}
        <header className="sticky top-0 z-20 hidden h-16 items-center justify-between border-b border-gray-200 bg-white px-6 md:flex">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">
              Kantin JajanYuk
            </span>
            <span className="mx-2">/</span>
            <span className="font-medium text-amber-700">
              {navigation.find((item) => item.href === pathname)?.label ??
                "Owner"}
            </span>
          </div>

          <span className="text-xs text-gray-500">
            Portal Pemilik Kantin
          </span>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-4 text-center text-xs text-gray-500">
          &copy; 2026 JajanYuk · Sistem Manajemen Kantin Digital
        </footer>
      </div>
    </div>
  );
}
