
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

export default function RiwayatPage() {
  const pathname = usePathname();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

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

    return () => {
      window.removeEventListener("storage", loadOrders);
    };
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const completedOrders = orders.filter(
    (order) =>
      order.status === "Pesanan Selesai" ||
      order.status === "Pesanan Ditolak"
  );

  const navItems = [
    {
      label: "Beranda",
      href: "/pelanggan/dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="m3 10 9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 9v11h14V9M9 20v-7h6v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Tenant",
      href: "/pelanggan/tenant",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 10h18l-2-7H5l-2 7Z" strokeLinejoin="round" />
          <path d="M5 10v11h14V10M9 21v-7h6v7M3 10c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Keranjang",
      href: "/pelanggan/keranjang",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </svg>
      ),
    },
    {
      label: "Pesanan",
      href: "/pelanggan/pesanan",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 5h12M8 12h12M8 19h12" strokeLinecap="round" />
          <path d="M3 5h.01M3 12h.01M3 19h.01" strokeLinecap="round" strokeWidth="3" />
        </svg>
      ),
    },
    {
      label: "Profil",
      href: "/pelanggan/profil",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] p-8 text-center text-[#806D5D]">
        Memuat riwayat...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#493326]">
      {/* Header */}
      <header className="border-b border-[#EFE5D9] bg-white px-5 py-5">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/pelanggan/profil"
            className="text-sm font-medium text-[#A18B78] transition hover:text-[#493326]"
          >
            ← Kembali ke Profil
          </Link>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D58B55]">
              Aktivitas Akun
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Riwayat Pesanan
            </h1>

            <p className="mt-1 text-sm text-[#9A8878]">
              Daftar pesanan yang telah selesai atau ditolak.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl space-y-5 px-5 py-7">
        {/* Ringkasan */}
        <div className="rounded-3xl bg-[#493326] p-6 text-white shadow-sm">
          <p className="text-sm text-[#E6D5C5]">
            Total Riwayat Pesanan
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {completedOrders.length} Pesanan
          </h2>

          <p className="mt-2 text-xs text-[#E6D5C5]">
            Semua pesanan selesai dan ditolak tercatat di sini.
          </p>
        </div>

        {/* Daftar Riwayat */}
        {completedOrders.length === 0 ? (
          <div className="rounded-3xl border border-[#EFE5D9] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0E8DE] text-[#A18B78]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M8 5h12M8 12h12M8 19h12" strokeLinecap="round" />
                <path d="M3 5h.01M3 12h.01M3 19h.01" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </div>

            <h2 className="mt-4 font-bold">
              Belum Ada Riwayat
            </h2>

            <p className="mt-2 text-sm text-[#9A8878]">
              Pesanan yang selesai atau ditolak akan muncul di sini.
            </p>

            <Link
              href="/pelanggan/dashboard"
              className="mt-5 inline-block rounded-xl bg-[#E99557] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D98243]"
            >
              Mulai Pesan
            </Link>
          </div>
        ) : (
          completedOrders.map((order) => (
            <Link
              key={order.id}
              href={`/pelanggan/pesanan/${order.id}`}
              className="block rounded-3xl border border-[#EFE5D9] bg-white p-5 shadow-sm transition hover:border-[#E9D9C8] hover:shadow-md"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-[#A18B78]">
                    Nomor Pesanan
                  </p>

                  <h2 className="mt-1 font-bold">
                    {order.id}
                  </h2>

                  <p className="mt-1 text-xs text-[#9A8878]">
                    {new Date(order.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>

                <span
                  className={`h-fit rounded-full px-3 py-2 text-xs font-semibold ${
                    order.status === "Pesanan Selesai"
                      ? "bg-[#E8F2E7] text-[#477348]"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-5 border-t border-[#F1EAE2] pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#9A8878]">
                    {order.items.length} jenis menu
                  </p>

                  <p className="font-bold text-[#493326]">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-right text-sm font-semibold text-[#D98243]">
                Lihat Detail →
              </p>
            </Link>
          ))
        )}
      </section>

      {/* Navigasi Bawah */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#EFE5D9] bg-white/95 px-2 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl justify-around">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/pelanggan/dashboard" &&
                pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex min-w-0 flex-col items-center gap-1 text-[11px] transition ${
                  active
                    ? "font-bold text-[#D98243]"
                    : "text-[#A18B78] hover:text-[#493326]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
