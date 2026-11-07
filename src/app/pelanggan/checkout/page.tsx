
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type CartItem = {
  id: string;
  tenantId: string;
  name: string;
  price: number;
  quantity: number;
};

const tenants = [
  { id: "1", name: "Tenant 1" },
  { id: "2", name: "Tenant 2" },
  { id: "3", name: "Tenant 3" },
  { id: "4", name: "Tenant 4" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [metode, setMetode] = useState("kelas");
  const [catatan, setCatatan] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("jajanyuk-cart");

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCart([]);
      }
    }

    const savedProfile = localStorage.getItem("jajanyuk-profile");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setNama(profile.nama ?? "");
        setKelas(profile.kelas ?? "");
      } catch {
        console.error("Data profil tidak dapat dibaca.");
      }
    }

    setLoaded(true);
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const tenant = tenants.find(
    (item) => item.id === cart[0]?.tenantId
  );

  const submitOrder = () => {
    if (submitting) return;

    setMessage("");

    if (!nama.trim() || !kelas.trim()) {
      setMessage("Nama lengkap dan kelas wajib diisi.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Keranjang kamu masih kosong.");
      return;
    }

    if (
      cart.some(
        (item) =>
          item.tenantId !== cart[0].tenantId ||
          !Number.isFinite(item.price) ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
      )
    ) {
      setMessage("Data keranjang tidak valid. Periksa kembali pesananmu.");
      return;
    }

    try {
      const savedProfile = localStorage.getItem("jajanyuk-profile");

      let emailTersimpan = "";

      try {
        emailTersimpan = JSON.parse(savedProfile || "{}").email || "";
      } catch {
        emailTersimpan = "";
      }

      localStorage.setItem(
        "jajanyuk-profile",
        JSON.stringify({
          nama: nama.trim(),
          kelas: kelas.trim(),
          email: emailTersimpan,
        })
      );

      const tenantId = cart[0].tenantId;

      const order = {
        id: `JY-${Date.now()}`,
        nama: nama.trim(),
        kelas: kelas.trim(),
        metode,
        catatan: catatan.trim(),
        tenantId,
        items: cart,
        total,
        status: "Menunggu Konfirmasi Kasir",
        createdAt: new Date().toISOString(),
      };

      const savedOrders = localStorage.getItem("jajanyuk-orders");
      let orders = [];

      try {
        const parsed = JSON.parse(savedOrders || "[]");
        orders = Array.isArray(parsed) ? parsed : [];
      } catch {
        orders = [];
      }

      orders.unshift(order);

      localStorage.setItem(
        "jajanyuk-orders",
        JSON.stringify(orders)
      );

      localStorage.removeItem("jajanyuk-cart");

      setSubmitting(true);
      router.push("/pelanggan/pesanan");
    } catch {
      setMessage("Pesanan gagal disimpan. Silakan coba kembali.");
    }
  };

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#493326]">
        Memuat checkout...
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] p-6">
        <div className="w-full max-w-md rounded-[28px] border border-[#EEE5DA] bg-white p-8 text-center shadow-sm">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-5 text-2xl font-extrabold text-[#493326]">
            Keranjang Kosong
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#948478]">
            Tambahkan menu terlebih dahulu sebelum melakukan checkout.
          </p>

          <Link
            href="/pelanggan/dashboard"
            className="mt-7 inline-block rounded-xl bg-[#E99557] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#D98243]"
          >
            Cari Menu
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
            href="/pelanggan/profil"
            className="rounded-xl border border-[#E9DED2] bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-[#F7EEE4]"
          >
            Profil
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#9B8B7F]">
          <Link href="/pelanggan/dashboard" className="hover:text-[#493326]">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/pelanggan/keranjang" className="hover:text-[#493326]">
            Keranjang
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#493326]">
            Checkout
          </span>
        </div>

        <section className="mt-6">
          <p className="text-sm font-semibold text-[#E99557]">
            SATU LANGKAH LAGI
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Checkout Pesanan
          </h1>

          <p className="mt-3 text-sm text-[#948478]">
            Lengkapi informasi agar pesananmu bisa segera diproses kasir.
          </p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-[28px] border border-[#EEE5DA] bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF1E7] text-2xl">
                  👤
                </div>

                <div>
                  <h2 className="text-lg font-extrabold">
                    Identitas Pemesan
                  </h2>
                  <p className="mt-1 text-xs text-[#948478]">
                    Isi informasi diri kamu.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="nama"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Nama Lengkap
                  </label>

                  <input
                    id="nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-xl border border-[#E9DED2] bg-[#FFFDF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#B5A79B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="kelas"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Kelas
                  </label>

                  <input
                    id="kelas"
                    type="text"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    placeholder="Contoh: XI RPL 1"
                    className="w-full rounded-xl border border-[#E9DED2] bg-[#FFFDF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#B5A79B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/15"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#EEE5DA] bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF1E7] text-2xl">
                  📍
                </div>

                <div>
                  <h2 className="text-lg font-extrabold">
                    Metode Pemesanan
                  </h2>
                  <p className="mt-1 text-xs text-[#948478]">
                    Pilih lokasi saat kamu melakukan pemesanan.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMetode("kelas")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    metode === "kelas"
                      ? "border-[#E99557] bg-[#FAF1E7] ring-2 ring-[#E99557]/15"
                      : "border-[#E9DED2] bg-white hover:bg-[#FFFDF9]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🏫</span>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        metode === "kelas"
                          ? "border-[#E99557] bg-[#E99557] text-white"
                          : "border-[#D9CCBF]"
                      }`}
                    >
                      {metode === "kelas" && (
                        <span className="text-xs">✓</span>
                      )}
                    </span>
                  </div>

                  <h3 className="mt-4 font-bold">
                    Pesan dari Kelas
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#948478]">
                    Pesan dari kelas dan ambil pesanan di tenant kantin.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMetode("kantin")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    metode === "kantin"
                      ? "border-[#E99557] bg-[#FAF1E7] ring-2 ring-[#E99557]/15"
                      : "border-[#E9DED2] bg-white hover:bg-[#FFFDF9]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🏪</span>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        metode === "kantin"
                          ? "border-[#E99557] bg-[#E99557] text-white"
                          : "border-[#D9CCBF]"
                      }`}
                    >
                      {metode === "kantin" && (
                        <span className="text-xs">✓</span>
                      )}
                    </span>
                  </div>

                  <h3 className="mt-4 font-bold">
                    Pesan Langsung di Kantin
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#948478]">
                    Pesan saat berada langsung di tenant kantin.
                  </p>
                </button>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#EEE5DA] bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF1E7] text-2xl">
                  📝
                </div>

                <div>
                  <h2 className="text-lg font-extrabold">
                    Catatan Pesanan
                  </h2>
                  <p className="mt-1 text-xs text-[#948478]">
                    Tambahkan permintaan khusus jika ada.
                  </p>
                </div>
              </div>

              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: Tidak pedas, sambal dipisah..."
                rows={4}
                className="mt-6 w-full resize-none rounded-xl border border-[#E9DED2] bg-[#FFFDF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#B5A79B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/15"
              />
            </section>
          </div>

          <aside className="h-fit rounded-[28px] border border-[#EEE5DA] bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-lg font-extrabold">
              Ringkasan Pesanan
            </h2>

            <div className="mt-5 rounded-2xl bg-[#FAF7F2] p-4">
              <p className="text-xs text-[#948478]">
                Pesanan dari
              </p>
              <p className="mt-1 font-bold">
                {tenant?.name ?? "Tenant"}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 border-b border-[#F0E9E1] pb-4"
                >
                  <div>
                    <p className="text-sm font-bold">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#948478]">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm text-[#948478]">
                <span>Jumlah jenis menu</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-sm text-[#948478]">
                <span>Total item</span>
                <span>{totalItems}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-[#EEE5DA] pt-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold">
                  Total Pembayaran
                </span>

                <span className="text-xl font-extrabold text-[#E99557]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {message && (
              <div
                role="alert"
                className="mt-5 rounded-xl bg-[#FBECEA] p-4 text-sm leading-6 text-[#A34E43]"
              >
                {message}
              </div>
            )}

            <button
              onClick={submitOrder}
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-[#E99557] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#D98243] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Memproses..." : "Buat Pesanan"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#948478]">
              Pesanan akan dikirim ke kasir tenant untuk mendapatkan
              konfirmasi.
            </p>

            <Link
              href="/pelanggan/keranjang"
              className="mt-4 block text-center text-sm font-semibold text-[#806F63] transition hover:text-[#E99557]"
            >
              ← Kembali ke Keranjang
            </Link>
          </aside>
        </div>
      </div>

      {/* NAVIGASI BAWAH */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EFE4D9] bg-white/95 px-2 pb-safe backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-around py-3">
          {[
            {
              label: "Beranda",
              href: "/pelanggan/dashboard",
              icon: "home",
            },
            {
              label: "Tenant",
              href: "/pelanggan/tenant",
              icon: "store",
            },
            {
              label: "Keranjang",
              href: "/pelanggan/keranjang",
              icon: "cart",
            },
            {
              label: "Pesanan",
              href: "/pelanggan/pesanan",
              icon: "orders",
            },
            {
              label: "Profil",
              href: "/pelanggan/profil",
              icon: "profile",
            },
          ].map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/pelanggan/dashboard" &&
                pathname.startsWith(item.href + "/")) ||
              (item.href === "/pelanggan/keranjang" &&
                pathname === "/pelanggan/checkout");

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
                  {item.icon === "home" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}

                  {item.icon === "store" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M3 10h18l-1.5-6h-15zM5 10v10h14V10M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}

                  {item.icon === "cart" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M3 4h2l2.4 11.5a2 2 0 0 0 2 1.5h8.8a2 2 0 0 0 2-1.6L22 8H6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="21" r="1" />
                      <circle cx="18" cy="21" r="1" />
                    </svg>
                  )}

                  {item.icon === "orders" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M8 6h13M8 12h13M8 18h13" strokeLinecap="round" />
                      <circle cx="3.5" cy="6" r="1" />
                      <circle cx="3.5" cy="12" r="1" />
                      <circle cx="3.5" cy="18" r="1" />
                    </svg>
                  )}

                  {item.icon === "profile" && (
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
