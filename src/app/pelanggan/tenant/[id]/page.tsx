
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const tenants = [
  {
    id: "1",
    name: "Tenant 1",
    category: "Makanan Berat",
    description: "Menyediakan berbagai pilihan makanan berat.",
    emoji: "🍛",
  },
  {
    id: "2",
    name: "Tenant 2",
    category: "Minuman",
    description: "Berbagai pilihan minuman segar.",
    emoji: "🥤",
  },
  {
    id: "3",
    name: "Tenant 3",
    category: "Snack",
    description: "Aneka camilan untuk menemani waktu istirahat.",
    emoji: "🍟",
  },
  {
    id: "4",
    name: "Tenant 4",
    category: "Makanan Ringan",
    description: "Pilihan makanan ringan dan jajanan.",
    emoji: "🍞",
  },
];

const menus = [
  {
    id: 1,
    tenantId: "1",
    name: "Nasi Ayam",
    price: 12000,
    description: "Nasi dengan lauk ayam.",
    status: "Tersedia",
    emoji: "🍗",
  },
  {
    id: 2,
    tenantId: "1",
    name: "Nasi Goreng",
    price: 13000,
    description: "Nasi goreng dengan bumbu spesial.",
    status: "Tersedia",
    emoji: "🍛",
  },
  {
    id: 3,
    tenantId: "1",
    name: "Mie Goreng",
    price: 10000,
    description: "Mie goreng dengan bumbu pilihan.",
    status: "Habis",
    emoji: "🍜",
  },
  {
    id: 4,
    tenantId: "2",
    name: "Es Teh",
    price: 5000,
    description: "Minuman teh dingin.",
    status: "Tersedia",
    emoji: "🧋",
  },
  {
    id: 5,
    tenantId: "2",
    name: "Jus Jeruk",
    price: 8000,
    description: "Minuman jeruk segar.",
    status: "Tersedia",
    emoji: "🍊",
  },
  {
    id: 6,
    tenantId: "3",
    name: "Kentang Goreng",
    price: 10000,
    description: "Kentang goreng renyah.",
    status: "Tersedia",
    emoji: "🍟",
  },
  {
    id: 7,
    tenantId: "4",
    name: "Roti Bakar",
    price: 8000,
    description: "Roti bakar dengan berbagai rasa.",
    status: "Tersedia",
    emoji: "🍞",
  },
];

export default function DetailTenantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [tenantId, setTenantId] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  useEffect(() => {
    let active = true;

    async function loadTenant() {
      const resolvedParams = await params;

      if (active) {
        setTenantId(resolvedParams.id);
      }
    }

    loadTenant();

    return () => {
      active = false;
    };
  }, [params]);

  const tenant = tenants.find((item) => item.id === tenantId);

  const tenantMenus = useMemo(
    () => menus.filter((menu) => menu.tenantId === tenantId),
    [tenantId]
  );

  const filteredMenus = tenantMenus.filter((menu) => {
    const matchesSearch = menu.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "Semua" || menu.status === filter;

    return matchesSearch && matchesFilter;
  });

  const availableCount = tenantMenus.filter(
    (menu) => menu.status === "Tersedia"
  ).length;

  if (!tenantId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#493326]">
        Memuat detail tenant...
      </main>
    );
  }

  if (!tenant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🏪</div>
          <h1 className="mt-4 text-xl font-bold text-[#493326]">
            Tenant tidak ditemukan
          </h1>
          <p className="mt-2 text-sm text-[#8B7B70]">
            Tenant yang kamu cari tidak tersedia.
          </p>
          <Link
            href="/pelanggan/tenant"
            className="mt-6 inline-block rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white"
          >
            Kembali ke daftar tenant
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#493326]">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-[#EEE5DA] bg-[#FFFDF9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/pelanggan/dashboard"
            className="text-2xl font-extrabold tracking-tight"
          >
            JajanYuk<span className="text-[#E99557]">.</span>
          </Link>

          <Link
            href="/pelanggan/keranjang"
            className="rounded-xl border border-[#E9DED2] bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-[#F7EEE4]"
          >
            Keranjang
          </Link>
        </div>
      </header>

      {/* KONTEN DETAIL TENANT */}
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#9B8B7F]">
          <Link
            href="/pelanggan/tenant"
            className="transition hover:text-[#493326]"
          >
            Daftar Tenant
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#493326]">
            {tenant.name}
          </span>
        </div>

        <section className="relative mt-6 overflow-hidden rounded-[28px] bg-[#493326] p-7 text-white sm:p-10">
          <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full bg-[#E99557]/20" />
          <div className="absolute -bottom-20 right-28 h-48 w-48 rounded-full bg-[#E99557]/10" />

          <div className="relative z-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-5xl">
              {tenant.emoji}
            </div>

            <p className="mt-6 text-sm font-medium text-[#F4BE91]">
              {tenant.category}
            </p>

            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              {tenant.name}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#E7D8CC]">
              {tenant.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                <p className="text-xs text-[#E7D8CC]">Total menu</p>
                <p className="mt-1 text-xl font-bold">
                  {tenantMenus.length}
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                <p className="text-xs text-[#E7D8CC]">Menu tersedia</p>
                <p className="mt-1 text-xl font-bold">
                  {availableCount}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DAFTAR MENU */}
        <section className="mt-10">
          <div>
            <p className="text-sm font-semibold text-[#E99557]">
              PILIHAN UNTUKMU
            </p>
            <h2 className="mt-1 text-2xl font-extrabold">
              Daftar Menu
            </h2>
            <p className="mt-2 text-sm text-[#948478]">
              Temukan makanan dan minuman favoritmu.
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                ⌕
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama menu..."
                className="w-full rounded-2xl border border-[#E9DED2] bg-white py-4 pl-12 pr-4 text-sm outline-none transition placeholder:text-[#B5A79B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/15"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Semua", "Tersedia", "Habis"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    filter === item
                      ? "bg-[#493326] text-white"
                      : "border border-[#E9DED2] bg-white text-[#806F63] hover:bg-[#F5EDE4]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-[#948478]">
              Menampilkan{" "}
              <span className="font-bold text-[#493326]">
                {filteredMenus.length}
              </span>{" "}
              menu
            </p>
          </div>

          {filteredMenus.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMenus.map((menu) => (
                <article
                  key={menu.id}
                  className="group overflow-hidden rounded-3xl border border-[#EEE5DA] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#493326]/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF1E7] text-4xl">
                      {menu.emoji}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        menu.status === "Tersedia"
                          ? "bg-[#EAF3E8] text-[#54764D]"
                          : "bg-[#F3ECE7] text-[#9B8170]"
                      }`}
                    >
                      {menu.status}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {menu.name}
                  </h3>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-[#948478]">
                    {menu.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#F0E9E1] pt-4">
                    <div>
                      <p className="text-xs text-[#A99A8E]">
                        Harga
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-[#493326]">
                        Rp{menu.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {menu.status === "Tersedia" ? (
                      <Link
                        href={`/pelanggan/menu/${menu.id}`}
                        className="rounded-xl bg-[#E99557] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D98243]"
                      >
                        Pilih Menu
                      </Link>
                    ) : (
                      <span className="cursor-not-allowed rounded-xl bg-[#F1EEEA] px-4 py-3 text-sm font-semibold text-[#AA9D92]">
                        Tidak tersedia
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-dashed border-[#DCCFC1] bg-white px-6 py-12 text-center">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-4 font-bold">
                Menu tidak ditemukan
              </h3>
              <p className="mt-2 text-sm text-[#948478]">
                Coba gunakan kata kunci atau filter yang berbeda.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("Semua");
                }}
                className="mt-5 rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white"
              >
                Reset pencarian
              </button>
            </div>
          )}
        </section>

        <div className="mt-10 border-t border-[#E9DED2] pt-6">
          <Link
            href="/pelanggan/tenant"
            className="text-sm font-semibold text-[#806F63] transition hover:text-[#E99557]"
          >
            ← Kembali ke daftar tenant
          </Link>
        </div>
      </div>

      {/* NAVIGASI BAWAH */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#EFE5D9] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl justify-around">
          <Link
            href="/pelanggan/dashboard"
            className="flex flex-col items-center gap-1 text-xs text-[#A18B78] transition hover:text-[#493326]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
              <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" />
            </svg>
            Beranda
          </Link>

          <Link
            href="/pelanggan/tenant"
            className="flex flex-col items-center gap-1 text-xs font-bold text-[#D98243]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 10h18l-1.5-6h-15z" />
              <path d="M4 10v10h16V10M9 20v-6h6v6" />
            </svg>
            Tenant
          </Link>

          <Link
            href="/pelanggan/keranjang"
            className="flex flex-col items-center gap-1 text-xs text-[#A18B78] transition hover:text-[#493326]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 3h2l2.4 12h10.8l2-8H6" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="18" cy="19" r="1" />
            </svg>
            Keranjang
          </Link>

          <Link
            href="/pelanggan/pesanan"
            className="flex flex-col items-center gap-1 text-xs text-[#A18B78] transition hover:text-[#493326]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
              <path d="M8 6h13M8 12h13M8 18h13" />
              <path d="M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            Pesanan
          </Link>

          <Link
            href="/pelanggan/profil"
            className="flex flex-col items-center gap-1 text-xs text-[#A18B78] transition hover:text-[#493326]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            Profil
          </Link>
        </div>
      </nav>
    </main>
  );
}
