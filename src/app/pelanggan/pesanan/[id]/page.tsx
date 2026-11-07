
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
  catatan?: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

const statusList = [
  "Menunggu Konfirmasi Kasir",
  "Pesanan Dikonfirmasi",
  "Sedang Disiapkan",
  "Siap Diambil",
  "Pesanan Selesai",
];

export default function DetailPesananPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadOrder() {
      try {
        const resolvedParams = await params;

        if (!active) return;

        setId(resolvedParams.id);

        const saved = localStorage.getItem("jajanyuk-orders");

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            const found = parsed.find(
              (item: Order) => item.id === resolvedParams.id
            );

            setOrder(found || null);
          } else {
            setOrder(null);
          }
        } else {
          setOrder(null);
        }
      } catch {
        if (active) {
          setOrder(null);
        }
      } finally {
        if (active) {
          setLoaded(true);
        }
      }
    }

    loadOrder();

    return () => {
      active = false;
    };
  }, [params]);

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
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] p-8 text-center text-[#806D5D]">
        Memuat detail pesanan...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#EFE5D9] bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF1E7] text-3xl">
            ?
          </div>

          <h1 className="mt-5 text-xl font-bold text-[#493326]">
            Pesanan Tidak Ditemukan
          </h1>

          <p className="mt-2 text-sm text-[#9A8878]">
            Data pesanan mungkin sudah tidak tersedia.
          </p>

          <Link
            href="/pelanggan/pesanan"
            className="mt-6 inline-flex rounded-xl bg-[#E99557] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D98243]"
          >
            Kembali ke Pesanan
          </Link>
        </div>
      </main>
    );
  }

  const isRejected = order.status === "Pesanan Ditolak";
  const currentStatus = statusList.indexOf(order.status);
  const isCompleted = order.status === "Pesanan Selesai";
  const isKnownStatus = currentStatus !== -1;

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-10 text-[#493326]">
      {/* Header */}
      <header className="border-b border-[#EFE5D9] bg-white px-5 py-5">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/pelanggan/pesanan"
            className="text-sm font-medium text-[#A18B78] transition hover:text-[#493326]"
          >
            ← Kembali ke Pesanan
          </Link>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D58B55]">
              Informasi Transaksi
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Detail Pesanan
            </h1>

            <p className="mt-1 text-sm text-[#9A8878]">
              {order.id}
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl space-y-5 px-5 py-7">
        {/* Ringkasan Status */}
        <div className="rounded-3xl bg-[#493326] p-6 text-white shadow-sm">
          <p className="text-sm text-[#D7C2B0]">
            Status pesanan
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {order.status}
          </h2>

          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-xs text-[#D7C2B0]">
              Nomor pesanan
            </p>

            <p className="mt-1 font-semibold">
              {order.id}
            </p>

            <p className="mt-3 text-xs text-[#D7C2B0]">
              Waktu pemesanan
            </p>

            <p className="mt-1 text-sm">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Pesanan Ditolak */}
        {isRejected && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <h2 className="font-bold text-red-800">
              Pesanan Ditolak
            </h2>

            <p className="mt-2 text-sm leading-6 text-red-700">
              Pesanan kamu tidak dapat diproses oleh kasir.
              Silakan periksa kembali informasi pesanan atau hubungi
              kasir tenant terkait.
            </p>
          </div>
        )}

        {/* Status Tidak Dikenal */}
        {!isRejected && !isKnownStatus && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-800">
              Status Belum Dikenali
            </h2>

            <p className="mt-2 text-sm text-amber-700">
              Status pesanan ini belum tersedia dalam daftar tahapan.
              Silakan periksa kembali nanti.
            </p>
          </div>
        )}

        {/* Progress Status */}
        {!isRejected && isKnownStatus && (
          <div className="rounded-3xl border border-[#EFE5D9] bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold">
                Perkembangan Pesanan
              </h2>

              <p className="mt-1 text-sm text-[#9A8878]">
                Ikuti tahapan pesanan sampai siap diambil.
              </p>
            </div>

            <div className="mt-7 space-y-0">
              {statusList.map((status, index) => {
                const completed = index <= currentStatus;
                const current = index === currentStatus;
                const last = index === statusList.length - 1;

                return (
                  <div key={status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          completed
                            ? "bg-[#E99557] text-white"
                            : "bg-[#F0E8DE] text-[#A18B78]"
                        }`}
                      >
                        {completed ? "✓" : index + 1}
                      </div>

                      {!last && (
                        <div
                          className={`my-1 min-h-10 w-0.5 ${
                            index < currentStatus
                              ? "bg-[#E99557]"
                              : "bg-[#EFE5D9]"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pb-8">
                      <p
                        className={`text-sm font-semibold ${
                          completed
                            ? "text-[#493326]"
                            : "text-[#B7A99B]"
                        }`}
                      >
                        {status}
                      </p>

                      {current && (
                        <span className="mt-2 inline-block rounded-full bg-[#FFF0E2] px-3 py-1 text-xs font-semibold text-[#C4773D]">
                          Status saat ini
                        </span>
                      )}

                      {index === statusList.length - 1 &&
                        isCompleted && (
                          <p className="mt-1 text-xs text-green-700">
                            Pesanan telah selesai.
                          </p>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Informasi Pemesan */}
        <div className="rounded-3xl border border-[#EFE5D9] bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold">
            Informasi Pemesan
          </h2>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-[#A18B78]">Nama</span>
              <span className="text-right font-semibold">
                {order.nama}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-[#A18B78]">Kelas</span>
              <span className="text-right font-semibold">
                {order.kelas}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-[#A18B78]">Metode Pemesanan</span>
              <span className="text-right font-semibold">
                {order.metode === "kelas"
                  ? "Pesan dari Kelas"
                  : "Pesan di Kantin"}
              </span>
            </div>
          </div>
        </div>

        {/* Catatan */}
        <div className="rounded-3xl border border-[#EFE5D9] bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold">
            Catatan Pesanan
          </h2>

          <div className="mt-4 rounded-2xl bg-[#FAF7F2] p-4">
            <p className="text-sm leading-6 text-[#806D5D]">
              {order.catatan?.trim() ||
                "Tidak ada catatan untuk pesanan ini."}
            </p>
          </div>
        </div>

        {/* Daftar Menu */}
        <div className="rounded-3xl border border-[#EFE5D9] bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold">
            Daftar Menu
          </h2>

          <div className="mt-5 space-y-5">
            {Array.isArray(order.items) &&
              order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#A18B78]">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    {formatPrice(item.quantity * item.price)}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-6 flex justify-between border-t border-[#EFE5D9] pt-5">
            <span className="font-bold">
              Total Pembayaran
            </span>

            <span className="text-lg font-bold text-[#D98243]">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Tombol Kembali */}
        <Link
          href="/pelanggan/pesanan"
          className="block rounded-xl border border-[#E9D9C8] bg-white py-4 text-center text-sm font-semibold text-[#806D5D] transition hover:bg-[#FAF1E7]"
        >
          Kembali ke Daftar Pesanan
        </Link>
      </section>
    </main>
  );
}
