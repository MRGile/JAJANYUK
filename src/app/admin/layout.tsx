
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/ui/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pageTitles: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/tenant": "Tenant",
    "/admin/pengguna": "Pengguna",
    "/admin/pesanan": "Pesanan",
    "/admin/laporan": "Laporan",
    "/admin/profil": "Profil",
  };

  const currentPage = pageTitles[pathname] || "Halaman";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-slate-800 antialiased md:flex-row">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-[58px] bg-white border-b border-gray-200 px-5 md:px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-700">
              Kantin JajanYuk
            </span>

            <span className="text-gray-400">/</span>

            <span className="font-medium text-orange-500">
              {currentPage}
            </span>
          </div>

          {/* Date & Time */}
          <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
            <span>
              {currentTime?.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>

            <span className="text-gray-300">|</span>

            <span className="font-medium text-slate-700 tabular-nums">
              {currentTime?.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-5 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>
              © {currentTime?.getFullYear() ?? ""} Kantin JajanYuk.
              All rights reserved.
            </p>

            <p>Admin Dashboard</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
