"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const menus = [
  {
    id: "1",
    tenantId: "1",
    name: "Nasi Ayam",
    price: 12000,
    description: "Nasi putih dengan ayam goreng dan sambal.",
    category: "Makanan",
    available: true,
    emoji: "🍗",
  },
  {
    id: "2",
    tenantId: "1",
    name: "Nasi Goreng",
    price: 13000,
    description: "Nasi goreng dengan bumbu khas dan telur.",
    category: "Makanan",
    available: true,
    emoji: "🍛",
  },
  {
    id: "3",
    tenantId: "1",
    name: "Mie Goreng",
    price: 10000,
    description: "Mie goreng dengan sayuran dan bumbu pilihan.",
    category: "Makanan",
    available: false,
    emoji: "🍜",
  },
  {
    id: "4",
    tenantId: "2",
    name: "Es Teh",
    price: 5000,
    description: "Teh segar dengan es batu.",
    category: "Minuman",
    available: true,
    emoji: "🧋",
  },
  {
    id: "5",
    tenantId: "2",
    name: "Jus Jeruk",
    price: 8000,
    description: "Jus jeruk segar.",
    category: "Minuman",
    available: true,
    emoji: "🍊",
  },
  {
    id: "6",
    tenantId: "3",
    name: "Kentang Goreng",
    price: 10000,
    description: "Kentang goreng renyah.",
    category: "Camilan",
    available: true,
    emoji: "🍟",
  },
  {
    id: "7",
    tenantId: "4",
    name: "Roti Bakar",
    price: 8000,
    description: "Roti bakar dengan isian manis.",
    category: "Camilan",
    available: true,
    emoji: "🍞",
  },
];

const tenants = [
  { id: "1", name: "Tenant 1" },
  { id: "2", name: "Tenant 2" },
  { id: "3", name: "Tenant 3" },
  { id: "4", name: "Tenant 4" },
];

export default function DetailMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    let active = true;

    async function loadMenu() {
      const resolvedParams = await params;

      if (active) {
        setId(resolvedParams.id);
      }
    }

    loadMenu();

    return () => {
      active = false;
    };
  }, [params]);

  const menu = menus.find((item) => item.id === id);
  const tenant = tenants.find((item) => item.id === menu?.tenantId);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const addToCart = () => {
    if (!menu || !menu.available) return;

    try {
      const savedCart = localStorage.getItem("jajanyuk-cart");
      const cart = savedCart ? JSON.parse(savedCart) : [];

      if (!Array.isArray(cart)) {
        setMessageType("error");
        setMessage("Data keranjang tidak valid.");
        return;
      }

      if (cart.length > 0 && cart[0].tenantId !== menu.tenantId) {
        setMessageType("error");
        setMessage(
          "Keranjang berisi pesanan dari tenant lain. Selesaikan atau kosongkan keranjang terlebih dahulu.",
        );
        return;
      }

      const existingItem = cart.find(
        (item: { id: string }) => item.id === menu.id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: menu.id,
          tenantId: menu.tenantId,
          name: menu.name,
          price: menu.price,
          quantity,
        });
      }

      localStorage.setItem("jajanyuk-cart", JSON.stringify(cart));

      setMessageType("success");
      setMessage("Menu berhasil ditambahkan ke keranjang.");
    } catch {
      setMessageType("error");
      setMessage("Gagal menambahkan menu ke keranjang.");
    }
  };

  if (!id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#493326]">
        Memuat detail menu...
      </main>
    );
  }

  if (!menu) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🍽️</div>
          <h1 className="mt-4 text-xl font-bold text-[#493326]">
            Menu tidak ditemukan
          </h1>
          <p className="mt-2 text-sm text-[#948478]">
            Menu yang kamu cari tidak tersedia.
          </p>
          <Link
            href="/pelanggan/dashboard"
            className="mt-6 inline-block rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#493326]">
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

      <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#9B8B7F]">
          <Link
            href="/pelanggan/tenant"
            className="transition hover:text-[#493326]"
          >
            Tenant
          </Link>
          <span>/</span>
          <Link
            href={`/pelanggan/tenant/${menu.tenantId}`}
            className="transition hover:text-[#493326]"
          >
            {tenant?.name ?? "Detail Tenant"}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#493326]">{menu.name}</span>
        </div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-[#EEE5DA] bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="flex min-h-[300px] items-center justify-center bg-[#F5EBDD] p-8 sm:min-h-[430px]">
              <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white/70 text-9xl shadow-sm sm:h-64 sm:w-64">
                {menu.emoji}
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#FAF1E7] px-4 py-2 text-xs font-bold text-[#B87543]">
                  {menu.category}
                </span>

                <span
                  className={`rounded-full px-3 py-2 text-xs font-semibold ${
                    menu.available
                      ? "bg-[#EAF3E8] text-[#54764D]"
                      : "bg-[#F3ECE7] text-[#9B8170]"
                  }`}
                >
                  {menu.available ? "Tersedia" : "Stok habis"}
                </span>
              </div>

              <p className="mt-7 text-sm font-semibold text-[#E99557]">
                {tenant?.name ?? "Tenant JajanYuk"}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                {menu.name}
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#948478]">
                {menu.description}
              </p>

              <div className="mt-7 border-b border-[#F0E9E1] pb-6">
                <p className="text-xs font-medium text-[#A99A8E]">
                  Harga satuan
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#493326]">
                  {formatPrice(menu.price)}
                </p>
              </div>

              {menu.available && (
                <>
                  <div className="mt-6">
                    <p className="mb-3 text-sm font-bold">Jumlah Pesanan</p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setQuantity(Math.max(1, quantity - 1));
                          setMessage("");
                        }}
                        disabled={quantity <= 1}
                        aria-label="Kurangi jumlah"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E9DED2] bg-white text-xl font-bold transition hover:bg-[#F7EEE4] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="w-8 text-center text-lg font-bold">
                        {quantity}
                      </span>

                      <button
                        onClick={() => {
                          setQuantity(quantity + 1);
                          setMessage("");
                        }}
                        aria-label="Tambah jumlah"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E9DED2] bg-white text-xl font-bold transition hover:bg-[#F7EEE4]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4">
                    <span className="text-sm font-medium text-[#948478]">
                      Total Pesanan
                    </span>
                    <span className="text-xl font-extrabold">
                      {formatPrice(menu.price * quantity)}
                    </span>
                  </div>

                  <button
                    onClick={addToCart}
                    className="mt-5 w-full rounded-xl bg-[#E99557] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#D98243]"
                  >
                    Tambah ke Keranjang
                  </button>
                </>
              )}

              {!menu.available && (
                <div className="mt-6 rounded-2xl bg-[#F5F0EA] p-4 text-sm text-[#947F70]">
                  Maaf, menu ini sedang habis dan belum bisa dipesan.
                </div>
              )}

              {message && (
                <div
                  role="status"
                  className={`mt-4 rounded-xl p-4 text-sm leading-6 ${
                    messageType === "success"
                      ? "bg-[#EAF3E8] text-[#54764D]"
                      : "bg-[#FBECEA] text-[#A34E43]"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                onClick={() => router.push("/pelanggan/keranjang")}
                className="mt-3 w-full rounded-xl border border-[#E9DED2] bg-white px-5 py-4 text-sm font-bold text-[#493326] transition hover:bg-[#FAF7F2]"
              >
                Lihat Keranjang
              </button>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <Link
            href={`/pelanggan/tenant/${menu.tenantId}`}
            className="text-sm font-semibold text-[#806F63] transition hover:text-[#E99557]"
          >
            ← Kembali ke menu tenant
          </Link>
        </div>
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
            const active = item.label === "Tenant";

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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path
                        d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {item.label === "Tenant" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M3 10h18M9 10v10M15 10v10" />
                    </svg>
                  )}
                  {item.label === "Keranjang" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path
                        d="M3 4h2l2.4 11.5a2 2 0 0 0 2 1.5h8.8a2 2 0 0 0 2-1.6L22 8H6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="21" r="1" />
                      <circle cx="18" cy="21" r="1" />
                    </svg>
                  )}
                  {item.label === "Pesanan" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path d="M8 6h13M8 12h13M8 18h13" strokeLinecap="round" />
                      <circle cx="3.5" cy="6" r=".8" fill="currentColor" />
                      <circle cx="3.5" cy="12" r=".8" fill="currentColor" />
                      <circle cx="3.5" cy="18" r=".8" fill="currentColor" />
                    </svg>
                  )}
                  {item.label === "Profil" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
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
