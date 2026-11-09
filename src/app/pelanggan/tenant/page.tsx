
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tenants = [
  {
    id: 1,
    name: "Tenant 1",
    category: "Makanan berat",
    description: "Menyediakan berbagai pilihan makanan berat.",
    status: "Buka",
    icon: "🍛",
    color: "bg-orange-100",
  },
  {
    id: 2,
    name: "Tenant 2",
    category: "Minuman",
    description: "Berbagai pilihan minuman segar.",
    status: "Buka",
    icon: "🥤",
    color: "bg-amber-100",
  },
  {
    id: 3,
    name: "Tenant 3",
    category: "Snack",
    description: "Aneka camilan untuk menemani waktu istirahat.",
    status: "Buka",
    icon: "🍟",
    color: "bg-yellow-100",
  },
  {
    id: 4,
    name: "Tenant 4",
    category: "Makanan ringan",
    description: "Pilihan makanan ringan dan jajanan.",
    status: "Tutup",
    icon: "🥪",
    color: "bg-rose-100",
  },
];

export default function TenantPage() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const filteredTenants = tenants.filter((tenant) =>
    `${tenant.name} ${tenant.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openCount = tenants.filter(
    (tenant) => tenant.status === "Buka"
  ).length;

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

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#35271F]">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#EFE6DC] bg-[#FAF7F2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/pelanggan/dashboard"
            className="text-2xl font-black tracking-tight text-[#3C2A20]"
          >
            Jajan<span className="text-[#E88745]">Yuk.</span>
          </Link>

          <Link
            href="/pelanggan/profil"
            className="flex items-center gap-2 rounded-full border border-[#E9DED2] bg-white px-4 py-2 text-sm font-semibold transition hover:bg-[#F5EBDD]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5E4D2] text-[#A65F32]">
              U
            </span>
            Profil Saya
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        {/* HERO */}
        <section className="relative mb-9 overflow-hidden rounded-[28px] bg-[#493326] px-7 py-9 text-white md:px-10 md:py-12">
          <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-[#E99557]/20" />
          <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-[#E99557]/10" />

          <div className="relative z-10 max-w-xl">
            <Link
              href="/pelanggan/dashboard"
              className="text-sm text-[#E8CBB5] transition hover:text-white"
            >
              ← Kembali ke Beranda
            </Link>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#F3AD72]">
              Jelajahi kantin sekolah
            </p>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
              Temukan Tenant
              <br />
              <span className="text-[#F3AD72]">Favoritmu.</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#E9D9CE]">
              Pilih tenant yang tersedia dan temukan berbagai
              makanan serta minuman untuk menemani waktu istirahatmu.
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-2 right-8 hidden text-[125px] opacity-90 md:block">
            🍱
          </div>
        </section>

        {/* INFORMASI TENANT */}
        <section className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#EFE4D9] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#9B8879]">Total Tenant</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#493326]">
              {tenants.length}
            </h2>
            <p className="mt-1 text-xs text-[#B58A6D]">
              Tenant tersedia
            </p>
          </div>

          <div className="rounded-2xl border border-[#EFE4D9] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#9B8879]">Tenant Buka</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#B96D3D]">
              {openCount}
            </h2>
            <p className="mt-1 text-xs text-[#B58A6D]">
              Siap menerima pesanan
            </p>
          </div>
        </section>

        {/* PENCARIAN */}
        <section className="mb-8">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C17A49]">
              Cari tempat jajan
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-[#3C2A20]">
              Mau cari tenant apa?
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#EDE2D7] bg-white px-5 py-4 shadow-sm transition focus-within:border-[#D88B55] focus-within:ring-2 focus-within:ring-[#E99557]/15">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 shrink-0 text-[#B58A6D]" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 5 5" strokeLinecap="round" />
            </svg>

            <input
              type="text"
              placeholder="Cari nama atau kategori tenant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-[#493326] outline-none placeholder:text-[#B7A99D]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-xs font-semibold text-[#BD7544] hover:text-[#493326]"
              >
                Hapus
              </button>
            )}
          </div>
        </section>

        {/* DAFTAR TENANT */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C17A49]">
                Pilihan tempat
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#3C2A20]">
                Daftar Tenant
              </h2>
            </div>

            <span className="rounded-full bg-[#F2E5D8] px-4 py-2 text-xs font-semibold text-[#98613F]">
              {filteredTenants.length} tenant ditemukan
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTenants.map((tenant) => (
              <article
                key={tenant.id}
                className="group overflow-hidden rounded-[22px] border border-[#EFE4D9] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#E7B58E] hover:shadow-md"
              >
                {/* VISUAL TENANT */}
                <div className={`relative flex h-40 items-center justify-center ${tenant.color}`}>
                  <span className="text-7xl transition duration-300 group-hover:scale-110">
                    {tenant.icon}
                  </span>

                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${
                      tenant.status === "Buka"
                        ? "bg-white text-[#53804F]"
                        : "bg-white text-[#A18D7E]"
                    }`}
                  >
                    <span className="mr-1">●</span>
                    {tenant.status}
                  </span>
                </div>

                {/* INFORMASI TENANT */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#B58A6D]">
                    {tenant.category}
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold text-[#493326]">
                    {tenant.name}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-[#9B8879]">
                    {tenant.description}
                  </p>

                  <div className="mt-5 border-t border-[#F1EAE3] pt-4">
                    {tenant.status === "Buka" ? (
                      <Link
                        href={`/pelanggan/tenant/${tenant.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#493326] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#684632]"
                      >
                        Lihat Menu
                        <span>→</span>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full cursor-not-allowed rounded-xl bg-[#F0ECE7] px-4 py-3 text-sm font-semibold text-[#A99A8E]"
                      >
                        Tenant Sedang Tutup
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {/* HASIL PENCARIAN KOSONG */}
            {filteredTenants.length === 0 && (
              <div className="col-span-full rounded-[22px] border border-[#EFE4D9] bg-white px-5 py-14 text-center">
                <div className="text-5xl">🔎</div>

                <h3 className="mt-4 text-lg font-bold text-[#493326]">
                  Tenant tidak ditemukan
                </h3>

                <p className="mt-2 text-sm text-[#9B8879]">
                  Coba gunakan kata pencarian lain.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#684632]"
                >
                  Tampilkan Semua Tenant
                </button>
              </div>
            )}
          </div>
        </section>

        {/* KEMBALI */}
        <div className="mt-10 border-t border-[#EDE2D7] pt-6">
          <Link
            href="/pelanggan/dashboard"
            className="text-sm font-semibold text-[#A66B45] transition hover:text-[#493326]"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>

      {/* NAVIGASI BAWAH */}
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
