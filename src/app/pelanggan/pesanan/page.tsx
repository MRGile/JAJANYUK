
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  id: string;
  nama: string;
  kelas: string;
  metode: string;
  tenantId: string;
  total: number;
  status: string;
  createdAt: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

type Tab = "Aktif" | "Selesai" | "Ditolak";

export default function PesananPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Aktif");

  useEffect(() => {
    const loadOrders = () => {
      const saved = localStorage.getItem("jajanyuk-orders");

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setOrders(Array.isArray(parsed) ? parsed : []);
        } catch {
          setOrders([]);
        }
      } else {
        setOrders([]);
      }

      setLoaded(true);
    };

    loadOrders();

    window.addEventListener("storage", loadOrders);
    window.addEventListener("focus", loadOrders);

    return () => {
      window.removeEventListener("storage", loadOrders);
      window.removeEventListener("focus", loadOrders);
    };
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Tanggal tidak tersedia";
    }

    return parsedDate.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "Pesanan Selesai" &&
      order.status !== "Pesanan Ditolak"
  );

  const completedOrders = orders.filter(
    (order) => order.status === "Pesanan Selesai"
  );

  const rejectedOrders = orders.filter(
    (order) => order.status === "Pesanan Ditolak"
  );

  const filteredOrders =
    activeTab === "Aktif"
      ? activeOrders
      : activeTab === "Selesai"
      ? completedOrders
      : rejectedOrders;

  const tabs: { name: Tab; count: number }[] = [
    { name: "Aktif", count: activeOrders.length },
    { name: "Selesai", count: completedOrders.length },
    { name: "Ditolak", count: rejectedOrders.length },
  ];

  const getStatusStyle = (status: string) => {
    if (status === "Pesanan Selesai") {
      return "bg-green-50 text-green-700 border-green-100";
    }

    if (status === "Pesanan Ditolak") {
      return "bg-red-50 text-red-700 border-red-100";
    }

    if (status === "Pesanan Siap Diambil") {
      return "bg-orange-100 text-orange-800 border-orange-200";
    }

    return "bg-amber-50 text-amber-800 border-amber-100";
  };

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] p-8 text-center text-[#806D5D]">
        Memuat pesanan...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#493326]">
      {/* Header */}
      <header className="border-b border-[#EFE5D9] bg-white px-5 py-5">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/pelanggan/dashboard"
            className="text-sm font-medium text-[#A18B78] transition hover:text-[#493326]"
          >
            ← Kembali ke Beranda
          </Link>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D58B55]">
              Aktivitas Kamu
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Pesanan Saya
            </h1>

            <p className="mt-1 text-sm text-[#9A8878]">
              Pantau perkembangan pesanan makananmu di sini.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl space-y-6 px-5 py-7">
        {/* Ringkasan */}
        <div className="rounded-3xl bg-[#493326] p-5 text-white shadow-sm">
          <p className="text-sm text-[#E6D5C5]">
            Total seluruh pesanan
          </p>

          <div className="mt-2 flex items-end justify-between">
            <h2 className="text-3xl font-bold">
              {orders.length}
            </h2>

            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-[#F4E7DA]">
              Pesanan tercatat
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/15 pt-4">
            <div>
              <p className="text-xs text-[#D7C2B0]">Aktif</p>
              <p className="mt-1 text-xl font-bold">
                {activeOrders.length}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#D7C2B0]">Selesai</p>
              <p className="mt-1 text-xl font-bold">
                {completedOrders.length}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#D7C2B0]">Ditolak</p>
              <p className="mt-1 text-xl font-bold">
                {rejectedOrders.length}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Pesanan */}
        <div>
          <h2 className="mb-3 text-base font-bold">
            Daftar Pesanan
          </h2>

          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F0E8DE] p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`rounded-xl px-2 py-3 text-center transition ${
                  activeTab === tab.name
                    ? "bg-white text-[#493326] shadow-sm"
                    : "text-[#9A8878] hover:text-[#493326]"
                }`}
              >
                <span className="block text-sm font-bold">
                  {tab.name}
                </span>

                <span className="mt-1 block text-xs">
                  {tab.count} pesanan
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Pesanan */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-3xl border border-[#EFE5D9] bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF1E7] text-3xl">
                {activeTab === "Aktif"
                  ? "🛍️"
                  : activeTab === "Selesai"
                  ? "✓"
                  : "—"}
              </div>

              <h2 className="mt-5 text-lg font-bold">
                {activeTab === "Aktif"
                  ? "Belum Ada Pesanan Aktif"
                  : activeTab === "Selesai"
                  ? "Belum Ada Pesanan Selesai"
                  : "Tidak Ada Pesanan Ditolak"}
              </h2>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#9A8878]">
                {activeTab === "Aktif"
                  ? "Pesanan yang sedang diproses kasir akan muncul di sini."
                  : activeTab === "Selesai"
                  ? "Pesanan yang sudah selesai akan tersimpan di sini."
                  : "Pesanan yang ditolak kasir akan muncul di sini."}
              </p>

              {activeTab === "Aktif" && (
                <Link
                  href="/pelanggan/dashboard"
                  className="mt-6 inline-flex rounded-xl bg-[#E99557] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D98243]"
                >
                  Mulai Pesan
                </Link>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Link
                key={order.id}
                href={`/pelanggan/pesanan/${order.id}`}
                className="block rounded-3xl border border-[#EFE5D9] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Nomor dan Status */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-[#A18B78]">
                      Nomor Pesanan
                    </p>

                    <h3 className="mt-1 font-bold text-[#493326]">
                      {order.id}
                    </h3>

                    <p className="mt-1 text-xs text-[#A18B78]">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Detail Singkat */}
                <div className="mt-5 flex items-center justify-between border-t border-[#F1EAE2] pt-4">
                  <div>
                    <p className="text-xs text-[#A18B78]">
                      Jumlah menu
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {Array.isArray(order.items)
                        ? order.items.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )
                        : 0}{" "}
                      item
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[#A18B78]">
                      Total pembayaran
                    </p>

                    <p className="mt-1 font-bold text-[#D98243]">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>

                {/* Link Detail */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FAF7F2] px-4 py-3">
                  <span className="text-xs font-medium text-[#806D5D]">
                    Lihat perkembangan pesanan
                  </span>

                  <span className="text-sm font-bold text-[#D98243]">
                    →
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>


      {/* NAVIGASI BAWAH */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#EFE5D9] bg-white/95 px-2 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-around py-3">
          {[
            { label: "Beranda", href: "/pelanggan/dashboard" },
            { label: "Tenant", href: "/pelanggan/tenant" },
            { label: "Keranjang", href: "/pelanggan/keranjang" },
            { label: "Pesanan", href: "/pelanggan/pesanan" },
            { label: "Profil", href: "/pelanggan/profil" },
          ].map((item) => {
            const active = item.label === "Pesanan";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex min-w-0 flex-col items-center gap-1 px-2 transition ${
                  active
                    ? "font-bold text-[#B96D3D]"
                    : "text-[#A99A8E] hover:text-[#493326]"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  {item.label === "Beranda" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}

                  {item.label === "Tenant" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M3 10h18M9 10v10M15 10v10" />
                    </svg>
                  )}

                  {item.label === "Keranjang" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M3 4h2l2.4 11.5a2 2 0 0 0 2 1.5h8.8a2 2 0 0 0 2-1.6L22 8H6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="21" r="1" />
                      <circle cx="18" cy="21" r="1" />
                    </svg>
                  )}

                  {item.label === "Pesanan" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M8 6h13M8 12h13M8 18h13" strokeLinecap="round" />
                      <circle cx="3.5" cy="6" r=".8" fill="currentColor" />
                      <circle cx="3.5" cy="12" r=".8" fill="currentColor" />
                      <circle cx="3.5" cy="18" r=".8" fill="currentColor" />
                    </svg>
                  )}

                  {item.label === "Profil" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
                    </svg>
                  )}
                </span>

                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
