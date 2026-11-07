
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { use } from "react";
import { kasirAktif } from "../../config";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  nama: string;
  kelas: string;
  metode: string;
  catatan?: string;
  catatanKasir?: string;
  alasanPenolakan?: string;
  tenantId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  statusHistory?: {
    status: string;
    waktu: string;
  }[];
};

const STORAGE_KEY = "jajanyuk-orders";

const statusUrutan = [
  "Menunggu Konfirmasi Kasir",
  "Pesanan Dikonfirmasi",
  "Sedang Disiapkan",
  "Siap Diambil",
  "Pesanan Selesai",
];

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);

const formatTanggal = (tanggal: string) =>
  new Date(tanggal).toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  });

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Menunggu Konfirmasi Kasir":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Pesanan Dikonfirmasi":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Sedang Disiapkan":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Siap Diambil":
      return "bg-green-50 text-green-700 border-green-200";
    case "Pesanan Selesai":
      return "bg-stone-100 text-stone-700 border-stone-200";
    case "Pesanan Ditolak":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-stone-100 text-stone-700 border-stone-200";
  }
};

const cardStyle =
  "rounded-2xl border border-[#EFE5D9] bg-white p-5 sm:p-6";

export default function DetailPesananKasir({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [catatan, setCatatan] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const allOrders: Order[] = saved ? JSON.parse(saved) : [];

      const found = allOrders.find(
        (item) =>
          item.id === id &&
          item.tenantId === kasirAktif.tenantId
      );

      if (found) {
        setOrder(found);
        setCatatan(found.catatanKasir || "");
      }
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const saveOrder = (updatedOrder: Order) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const allOrders: Order[] = saved ? JSON.parse(saved) : [];

      const updatedOrders = allOrders.map((item) => {
        if (
          item.id === id &&
          item.tenantId === kasirAktif.tenantId
        ) {
          return updatedOrder;
        }

        return item;
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedOrders)
      );

      setOrder(updatedOrder);
      return true;
    } catch {
      alert("Pesanan gagal disimpan. Silakan coba kembali.");
      return false;
    }
  };

  const updateStatus = (statusBaru: string) => {
    if (!order) return;

    const updatedOrder: Order = {
      ...order,
      status: statusBaru,
      statusHistory: [
        ...(order.statusHistory || [
          {
            status: order.status,
            waktu: order.createdAt,
          },
        ]),
        {
          status: statusBaru,
          waktu: new Date().toISOString(),
        },
      ],
    };

    saveOrder(updatedOrder);
  };

  const saveNote = () => {
    if (!order) return;

    setSaving(true);

    const updatedOrder: Order = {
      ...order,
      catatanKasir: catatan.trim(),
    };

    const success = saveOrder(updatedOrder);
    setSaving(false);

    if (success) {
      alert("Catatan berhasil disimpan.");
    }
  };

  const getNextStatus = () => {
    if (!order) return null;

    const currentIndex = statusUrutan.indexOf(order.status);

    if (
      currentIndex === -1 ||
      currentIndex === statusUrutan.length - 1
    ) {
      return null;
    }

    return statusUrutan[currentIndex + 1];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-8 text-sm text-[#A18B78]">
        Memuat detail pesanan...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#EFE5D9] bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-[#493326]">
            Pesanan tidak ditemukan
          </h2>

          <p className="mt-2 text-sm text-[#A18B78]">
            Pesanan tidak tersedia atau bukan milik tenant Anda.
          </p>

          <Link
            href="/kasir/pesanan"
            className="mt-5 inline-block rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#38271E]"
          >
            Kembali ke Pesanan
          </Link>
        </div>
      </div>
    );
  }

  const nextStatus = getNextStatus();

  const history =
    order.statusHistory?.length
      ? order.statusHistory
      : [
          {
            status: order.status,
            waktu: order.createdAt,
          },
        ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 pb-28 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Navigasi */}
        <Link
          href="/kasir/pesanan"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#A18B78] transition hover:text-[#493326]"
        >
          <span>←</span>
          Kembali ke Manajemen Pesanan
        </Link>

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-[#A18B78]">
              Detail Pesanan
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#493326] sm:text-3xl">
              {order.id}
            </h1>

            <p className="mt-2 text-sm text-[#A18B78]">
              Dibuat pada {formatTanggal(order.createdAt)}
            </p>
          </div>

          <span
            className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Informasi Utama */}
          <div className="space-y-6 lg:col-span-2">

            {/* Informasi Pelanggan */}
            <section className={cardStyle}>
              <div className="mb-5 border-b border-[#F0E8DE] pb-4">
                <h2 className="text-lg font-bold text-[#493326]">
                  Informasi Pelanggan
                </h2>
                <p className="mt-1 text-sm text-[#A18B78]">
                  Informasi pemesan dan metode pemesanan
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#A18B78]">
                    Nama Pelanggan
                  </p>
                  <p className="mt-1 font-semibold text-[#493326]">
                    {order.nama}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#A18B78]">
                    Kelas
                  </p>
                  <p className="mt-1 font-semibold text-[#493326]">
                    {order.kelas}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#A18B78]">
                    Metode Pemesanan
                  </p>
                  <p className="mt-1 font-semibold text-[#493326]">
                    {order.metode}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#A18B78]">
                    Tenant
                  </p>
                  <p className="mt-1 font-semibold text-[#493326]">
                    Tenant {order.tenantId}
                  </p>
                </div>
              </div>
            </section>

            {/* Rincian Pesanan */}
            <section className={cardStyle}>
              <div className="mb-5 border-b border-[#F0E8DE] pb-4">
                <h2 className="text-lg font-bold text-[#493326]">
                  Rincian Pesanan
                </h2>
                <p className="mt-1 text-sm text-[#A18B78]">
                  Daftar produk yang dipesan pelanggan
                </p>
              </div>

              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-start justify-between gap-4 border-b border-[#F0E8DE] pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-[#493326]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-[#A18B78]">
                        {item.quantity} × {formatRupiah(item.price)}
                      </p>
                    </div>

                    <p className="whitespace-nowrap font-semibold text-[#493326]">
                      {formatRupiah(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between gap-3 rounded-xl bg-[#FAF7F2] p-4">
                <span className="font-bold text-[#493326]">
                  Total Pembayaran
                </span>

                <span className="text-lg font-bold text-[#493326]">
                  {formatRupiah(order.total)}
                </span>
              </div>
            </section>

            {/* Catatan Pelanggan */}
            <section className={cardStyle}>
              <h2 className="mb-3 font-bold text-[#493326]">
                Catatan Pelanggan
              </h2>

              <div className="rounded-xl bg-[#FAF7F2] p-4">
                <p className="text-sm leading-relaxed text-[#725D4C]">
                  {order.catatan || "Tidak ada catatan dari pelanggan."}
                </p>
              </div>
            </section>

            {/* Catatan Kasir */}
            <section className={cardStyle}>
              <h2 className="font-bold text-[#493326]">
                Catatan Internal Kasir
              </h2>

              <p className="mt-1 text-sm text-[#A18B78]">
                Catatan ini digunakan untuk keperluan internal tenant.
              </p>

              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={4}
                placeholder="Tambahkan catatan untuk pesanan ini..."
                className="mt-4 w-full resize-none rounded-xl border border-[#EFE5D9] bg-[#FFFEFC] p-3 text-sm text-[#493326] outline-none transition placeholder:text-[#B7A99B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/10"
              />

              <button
                onClick={saveNote}
                disabled={saving}
                className="mt-3 rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#38271E] disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Catatan"}
              </button>
            </section>

            {/* Alasan Penolakan */}
            {order.status === "Pesanan Ditolak" && (
              <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <h2 className="font-bold text-red-800">
                  Alasan Penolakan
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-red-700">
                  {order.alasanPenolakan ||
                    "Tidak ada alasan yang dicatat."}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Aksi Pesanan */}
            <section className={cardStyle}>
              <h2 className="mb-4 font-bold text-[#493326]">
                Aksi Pesanan
              </h2>

              {order.status === "Menunggu Konfirmasi Kasir" && (
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      updateStatus("Pesanan Dikonfirmasi")
                    }
                    className="w-full rounded-xl bg-[#493326] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#38271E]"
                  >
                    Terima Pesanan
                  </button>

                  <p className="text-xs leading-relaxed text-[#A18B78]">
                    Untuk menolak pesanan, gunakan tombol Tolak di halaman manajemen pesanan.
                  </p>
                </div>
              )}

              {nextStatus && order.status !== "Menunggu Konfirmasi Kasir" && (
                <button
                  onClick={() => updateStatus(nextStatus)}
                  className="w-full rounded-xl bg-[#E99557] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#D98243]"
                >
                  {nextStatus === "Sedang Disiapkan"
                    ? "Mulai Siapkan"
                    : nextStatus === "Siap Diambil"
                    ? "Tandai Siap Diambil"
                    : nextStatus === "Pesanan Selesai"
                    ? "Selesaikan Pesanan"
                    : "Perbarui Status"}
                </button>
              )}

              {order.status === "Pesanan Selesai" && (
                <p className="rounded-xl bg-[#F0E8DE] p-3 text-center text-sm font-medium text-[#725D4C]">
                  Pesanan telah selesai.
                </p>
              )}

              {order.status === "Pesanan Ditolak" && (
                <p className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-700">
                  Pesanan telah ditolak.
                </p>
              )}
            </section>

            {/* Riwayat Status */}
            <section className={cardStyle}>
              <h2 className="mb-5 font-bold text-[#493326]">
                Riwayat Status
              </h2>

              <div className="space-y-5">
                {history.map((item, index) => (
                  <div
                    key={`${item.status}-${index}`}
                    className="flex gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          index === history.length - 1
                            ? "bg-[#E99557]"
                            : "bg-[#A18B78]"
                        }`}
                      />

                      {index !== history.length - 1 && (
                        <div className="mt-1 h-10 w-px bg-[#E5D9CC]" />
                      )}
                    </div>

                    <div className="-mt-1 min-w-0">
                      <p className="text-sm font-semibold text-[#493326]">
                        {item.status}
                      </p>

                      <p className="mt-1 text-xs text-[#A18B78]">
                        {formatTanggal(item.waktu)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
