"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const isDashboardActive = pathname === "/admin";
  const isTenantActive = pathname.startsWith("/admin/tenant");
  const isPenggunaActive = pathname.startsWith("/admin/pengguna");
  const isPesananActive = pathname.startsWith("/admin/pesanan");
  const isLaporanActive = pathname.startsWith("/admin/laporan");
  const isProfilActive = pathname.startsWith("/admin/profil");

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col md:flex-row antialiased">
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between text-white shadow-md">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="font-bold text-lg tracking-tight">
            Jajan<span className="text-amber-400">Yuk</span>
          </span>
          <span className="ml-1 text-[10px] bg-slate-800 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-slate-700">
            Admin
          </span>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {isMobileMenuOpen ? (
            <span className="text-sm font-semibold">Tutup</span>
          ) : (
            <span className="text-sm font-semibold">Menu</span>
          )}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar (Desktop Fixed & Mobile Offcanvas Drawer) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo & Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/admin" onClick={closeMenu} className="flex items-center gap-3 group">
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black tracking-tight text-white">Jajan</span>
                  <span className="text-xl font-black tracking-tight text-amber-400">Yuk</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Portal Administrator</p>
              </div>
            </Link>

            <button
              onClick={closeMenu}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
              aria-label="Tutup Menu"
            >
              X
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="p-4 space-y-1.5 flex-1">
            <p className="px-3 pt-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </p>

            {/* Dashboard Link */}
            <Link
              href="/admin"
              onClick={closeMenu}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                isDashboardActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/25 translate-x-1"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              
              <span>Dashboard</span>
            </Link>

            {/* Manajemen Tenant Link */}
            <Link
              href="/admin/tenant"
              onClick={closeMenu}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                isTenantActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/25 translate-x-1"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              
              <span>Manajemen Tenant</span>
            </Link>

            {/* Manajemen Pengguna Link */}
            <Link
              href="/admin/pengguna"
              onClick={closeMenu}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                isPenggunaActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/25 translate-x-1"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              
              <span>Manajemen Pengguna</span>
            </Link>

            {/* Manajemen Pesanan Link */}
            <Link
              href="/admin/pesanan"
              onClick={closeMenu}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                isPesananActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/25 translate-x-1"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              
              <span>Manajemen Pesanan</span>
            </Link>

            {/* Laporan & Statistik Link */}
            <Link
              href="/admin/laporan"
              onClick={closeMenu}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                isLaporanActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/25 translate-x-1"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              
              <span>Laporan & Statistik</span>
            </Link>

          </nav>


          {/* Quick System Status Card in Sidebar */}
          <div className="p-4 mx-3 mb-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 font-medium">Kantin Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                
                Buka
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">Jam operasional: 07:00 - 17:00</p>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <Link
            href="/admin/profil"
            onClick={closeMenu}
            aria-label="Buka profil Admin Kantin"
            className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${isProfilActive ? "bg-slate-800" : "hover:bg-slate-800/80"}`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Admin Kantin</p>
              <p className="text-xs text-slate-400 truncate">admin@jajanyuk.com</p>
            </div>
            <span className="inline-block text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              Super
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-gray-200 px-6 items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">Kantin JajanYuk</span>
            <span>/</span>
            <span className="text-amber-600 font-medium capitalize">
              {pathname === "/admin"
                ? "Dashboard"
                : pathname.replace("/admin/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-200">
              
              <span>
                Hari ini, {currentTime?.toLocaleDateString("id-ID", {
                  day: "2-digit", 
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Jakarta",
                }) ?? "-- -- ----"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-200">
              
              <span>
                {currentTime?.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Jakarta",
                }) ?? "--:--:--"} WIB
              </span>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <Link
              href="/admin/profil"
              aria-label="Buka profil administrator"
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
                
              </div>
              <span className="text-xs font-semibold text-slate-700">Administrator</span>
            </Link>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="py-4 px-6 border-t border-gray-200 text-center text-xs text-gray-500 bg-white">
          &copy; 2026 JajanYuk - Sistem Manajemen Kantin Digital Sekolah & Kampus. Hak Cipta Dilindungi.
        </footer>
      </div>
    </div>
  );
}
