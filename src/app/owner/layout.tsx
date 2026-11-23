"use client";

import { usePathname } from "next/navigation";
import OwnerSidebar from "@/components/ui/OwnerSidebar";

const pageTitles: Record<string, string> = {
  "/owner": "Dashboard",
  "/owner/laporan": "Laporan Keuangan",
  "/owner/transaksi": "Riwayat Transaksi",
  "/owner/produk": "Manajemen Produk",
  "/owner/profil": "Pengaturan Profil",
};

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPage = pageTitles[pathname] ?? "Owner";

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-slate-800 antialiased md:flex-row">
      <OwnerSidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 md:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">Kantin JajanYuk</span>
            <span>/</span>
            <span className="font-medium text-amber-700">{currentPage}</span>
          </div>
          <span className="hidden text-xs text-gray-500 sm:block">
            Portal Pemilik Kantin
          </span>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white px-6 py-4 text-center text-xs text-gray-500">
          &copy; JajanYuk · Sistem Manajemen Kantin
          Digital
        </footer>
      </div>
    </div>
  );
}
