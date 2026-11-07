
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type CartItem = {
  id: string;
  tenantId: string;
  name: string;
  price: number;
  quantity: number;
};

export default function KeranjangPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("jajanyuk-cart");

      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setCart(Array.isArray(parsed) ? parsed : []);
        } catch {
          setCart([]);
        }
      } else {
        setCart([]);
      }

      setLoaded(true);
    };

    loadCart();

    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("jajanyuk-cart", JSON.stringify(newCart));
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const updateQuantity = (id: string, change: number) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );

    saveCart(newCart);
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  const clearCart = () => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin mengosongkan seluruh keranjang?"
    );

    if (confirmed) {
      saveCart([]);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#493326]">
        Memuat keranjang...
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
            href="/pelanggan/profil"
            className="rounded-xl border border-[#E9DED2] bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-[#F7EEE4]"
          >
            Profil
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#9B8B7F]">
          <Link
            href="/pelanggan/dashboard"
            className="hover:text-[#493326]"
          >
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#493326]">
            Keranjang
          </span>
        </div>

        <section className="mt-6">
          <p className="text-sm font-semibold text-[#E99557]">
            PESANAN KAMU
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Keranjang Saya
          </h1>

          <p className="mt-3 text-sm text-[#948478]">
            Periksa kembali pesananmu sebelum melanjutkan checkout.
          </p>
        </section>

        {cart.length === 0 ? (
          <section className="mt-8 rounded-[28px] border border-[#EEE5DA] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#FAF1E7] text-6xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-extrabold">
              Keranjang masih kosong
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#948478]">
              Sepertinya kamu belum memilih menu. Yuk, cari makanan dan
              minuman favoritmu!
            </p>

            <Link
              href="/pelanggan/dashboard"
              className="mt-7 inline-block rounded-xl bg-[#E99557] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D98243]"
            >
              Cari Menu
            </Link>
          </section>
        ) : (
          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">
                    Daftar Pesanan
                  </h2>
                  <p className="mt-1 text-sm text-[#948478]">
                    {cart.length} jenis menu · {totalItems} total item
                  </p>
                </div>

                <button
                  onClick={clearCart}
                  className="rounded-xl border border-[#F0D8D3] bg-white px-4 py-2.5 text-sm font-semibold text-[#B75C4D] transition hover:bg-[#FDF1EF]"
                >
                  Kosongkan Keranjang
                </button>
              </div>

              {cart.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-[#EEE5DA] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#FAF1E7] text-4xl">
                        🍽️
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-[#948478]">
                          {formatPrice(item.price)} / item
                        </p>

                        <p className="mt-2 text-sm font-bold text-[#E99557]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label={`Kurangi jumlah ${item.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9DED2] text-lg font-bold transition hover:bg-[#FAF1E7] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="w-6 text-center font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Tambah jumlah ${item.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9DED2] text-lg font-bold transition hover:bg-[#FAF1E7]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-semibold text-[#B75C4D] transition hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <Link
                href="/pelanggan/dashboard"
                className="inline-block pt-2 text-sm font-semibold text-[#806F63] transition hover:text-[#E99557]"
              >
                ← Tambah Menu Lagi
              </Link>
            </div>

            <aside className="h-fit rounded-[28px] border border-[#EEE5DA] bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-lg font-extrabold">
                Ringkasan Pesanan
              </h2>

              <div className="mt-6 flex justify-between text-sm text-[#948478]">
                <span>Jenis menu</span>
                <span className="font-semibold text-[#493326]">
                  {cart.length}
                </span>
              </div>

              <div className="mt-4 flex justify-between text-sm text-[#948478]">
                <span>Total item</span>
                <span className="font-semibold text-[#493326]">
                  {totalItems}
                </span>
              </div>

              <div className="mt-6 border-t border-[#EEE5DA] pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">
                    Total Harga
                  </span>

                  <span className="text-xl font-extrabold text-[#E99557]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#FAF7F2] p-4">
                <p className="text-xs leading-5 text-[#948478]">
                  Pastikan pesananmu sudah sesuai sebelum melanjutkan
                  ke halaman checkout.
                </p>
              </div>

              <button
                onClick={() => router.push("/pelanggan/checkout")}
                className="mt-6 w-full rounded-xl bg-[#E99557] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#D98243]"
              >
                Lanjut Checkout
              </button>

              <Link
                href="/pelanggan/dashboard"
                className="mt-4 block text-center text-sm font-semibold text-[#806F63] transition hover:text-[#E99557]"
              >
                Tambah Menu Lagi
              </Link>
            </aside>
          </section>
        )}
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
