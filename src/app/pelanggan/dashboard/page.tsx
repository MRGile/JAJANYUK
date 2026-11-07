
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tenants = [
  { id: 1, name: "Tenant 1", category: "Makanan berat", icon: "🍛", color: "bg-orange-100" },
  { id: 2, name: "Tenant 2", category: "Minuman", icon: "🥤", color: "bg-amber-100" },
  { id: 3, name: "Tenant 3", category: "Snack", icon: "🍟", color: "bg-yellow-100" },
  { id: 4, name: "Tenant 4", category: "Makanan ringan", icon: "🥪", color: "bg-rose-100" },
];

const menus = [
  { id: 1, name: "Nasi Ayam", tenant: "Tenant 1", price: 12000, icon: "🍗", color: "bg-orange-100" },
  { id: 2, name: "Mie Goreng", tenant: "Tenant 2", price: 10000, icon: "🍜", color: "bg-amber-100" },
  { id: 3, name: "Nasi Goreng", tenant: "Tenant 1", price: 13000, icon: "🍛", color: "bg-yellow-100" },
];

export default function Dashboard() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#35271F]">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#EFE6DC] bg-[#FAF7F2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/pelanggan/dashboard" className="text-2xl font-black tracking-tight text-[#3C2A20]">
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

      <div className="mx-auto max-w-6xl space-y-10 px-5 py-7 md:px-8 md:py-10">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] bg-[#493326] px-7 py-10 text-white shadow-lg shadow-[#493326]/10 md:px-12 md:py-14">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#E99557]/20" />
          <div className="absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-[#E99557]/10" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-[#F8D9BD]">
              SELAMAT DATANG DI JAJANYUK
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">
              Lapar? <br />
              <span className="text-[#F3AD72]">Jajan aja dulu.</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#E9D9CE] md:text-base">
              Pilih makanan favoritmu, pesan dari kelas atau langsung di kantin,
              dan nikmati waktu istirahat tanpa antre panjang.
            </p>

            <Link
              href="/pelanggan/tenant"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#E99557] px-6 py-3.5 text-sm font-bold text-[#38251A] transition hover:bg-[#F4AA70]"
            >
              Mulai Pesan
              <span>→</span>
            </Link>
          </div>

          <div className="pointer-events-none absolute bottom-4 right-8 hidden text-[150px] opacity-90 md:block">
            🍱
          </div>
        </section>

        {/* SEARCH */}
        <section>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C17A49]">
              Temukan favoritmu
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#3C2A20]">
              Mau makan apa hari ini?
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#EDE2D7] bg-white px-5 py-4 shadow-sm transition focus-within:border-[#D88B55] focus-within:ring-2 focus-within:ring-[#E99557]/15">
            <span className="text-xl text-[#B58A6D]">⌕</span>
            <input
              type="text"
              placeholder="Cari makanan favorit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-[#493326] outline-none placeholder:text-[#B7A99D]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-xs font-semibold text-[#B8794B] hover:text-[#493326]"
              >
                Hapus
              </button>
            )}
          </div>
        </section>

        {/* TENANTS */}
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C17A49]">
                Pilihan tempat
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#3C2A20]">
                Tenant Kantin
              </h2>
            </div>

            <Link
              href="/pelanggan/tenant"
              className="text-sm font-bold text-[#BD7544] transition hover:text-[#75452D]"
            >
              Lihat semua →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {tenants.map((tenant) => (
              <Link
                key={tenant.id}
                href={`/pelanggan/tenant/${tenant.id}`}
                className="group rounded-2xl border border-[#EFE4D9] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#E7B58E] hover:shadow-md md:p-5"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${tenant.color}`}>
                  {tenant.icon}
                </div>

                <h3 className="mt-4 font-bold text-[#493326]">
                  {tenant.name}
                </h3>

                <p className="mt-1 text-xs text-[#9B8879]">
                  {tenant.category}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#F1EAE3] pt-3">
                  <span className="text-xs font-semibold text-[#BD7544]">
                    Lihat menu
                  </span>
                  <span className="text-[#BD7544] transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* MENU PILIHAN */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C17A49]">
              Rekomendasi
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#3C2A20]">
              Menu Pilihan
            </h2>
            <p className="mt-1 text-sm text-[#9B8879]">
              Temukan menu yang cocok untuk menemani istirahatmu.
            </p>
          </div>

          {filteredMenus.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMenus.map((menu) => (
                <article
                  key={menu.id}
                  className="group overflow-hidden rounded-2xl border border-[#EFE4D9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`flex h-40 items-center justify-center text-7xl ${menu.color}`}>
                    {menu.icon}
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#B58A6D]">
                      {menu.tenant}
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-[#493326]">
                      {menu.name}
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-base font-extrabold text-[#B96D3D]">
                        Rp{menu.price.toLocaleString("id-ID")}
                      </p>

                      <Link
                        href={`/pelanggan/menu/${menu.id}`}
                        className="rounded-xl bg-[#493326] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#684632]"
                      >
                        Lihat Menu →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#EFE4D9] bg-white px-5 py-12 text-center">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-3 font-bold text-[#493326]">
                Menu tidak ditemukan
              </h3>
              <p className="mt-1 text-sm text-[#9B8879]">
                Coba gunakan kata kunci pencarian yang berbeda.
              </p>
            </div>
          )}
        </section>
      </div>


      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EFE4D9] bg-white/95 px-2 pb-safe backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-around py-3">
          {[
            { label: "Beranda", href: "/pelanggan/dashboard" },
            { label: "Tenant", href: "/pelanggan/tenant" },
            { label: "Keranjang", href: "/pelanggan/keranjang" },
            { label: "Pesanan", href: "/pelanggan/pesanan" },
            { label: "Profil", href: "/pelanggan/profil" },
          ].map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/pelanggan/dashboard" &&
                pathname.startsWith(item.href + "/"));

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
