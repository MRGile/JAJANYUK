
"use client";

import { useEffect, useState } from "react";
import { kasirAktif } from "../config";

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
  tenantId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  catatanKasir?: string;
  alasanPenolakan?: string;
};

const STORAGE_KEY = "jajanyuk-orders";

const statusList = [
  "Semua",
  "Menunggu Konfirmasi Kasir",
  "Pesanan Dikonfirmasi",
  "Sedang Disiapkan",
  "Siap Diambil",
  "Pesanan Selesai",
  "Pesanan Ditolak",
];

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka || 0);

const formatTanggal = (tanggal: string) =>
  new Date(tanggal).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Menunggu Konfirmasi Kasir":
      return "bg-[#FFF2D9] text-[#A66B16]";
    case "Pesanan Dikonfirmasi":
      return "bg-[#F0E8DE] text-[#72543E]";
    case "Sedang Disiapkan":
      return "bg-[#E9EFFA] text-[#456A9B]";
    case "Siap Diambil":
      return "bg-[#F3EAF8] text-[#81569A]";
    case "Pesanan Selesai":
      return "bg-[#E5F3E9] text-[#39754B]";
    case "Pesanan Ditolak":
      return "bg-[#FCE8E6] text-[#B34E46]";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const labelStatus = (status: string) => {
  switch (status) {
    case "Menunggu Konfirmasi Kasir":
      return "Menunggu";
    case "Pesanan Dikonfirmasi":
      return "Dikonfirmasi";
    case "Sedang Disiapkan":
      return "Disiapkan";
    case "Pesanan Selesai":
      return "Selesai";
    case "Pesanan Ditolak":
      return "Ditolak";
    default:
      return status;
  }
};

export default function PesananKasirPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: Order[] = saved ? JSON.parse(saved) : [];

      const tenantOrders = parsed.filter(
        (order) => order.tenantId === kasirAktif.tenantId
      );

      tenantOrders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setOrders(tenantOrders);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveOrders = (updatedOrders: Order[]) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const allOrders: Order[] = saved ? JSON.parse(saved) : [];

      const updatedAllOrders = allOrders.map((order) => {
        if (order.tenantId !== kasirAktif.tenantId) {
          return order;
        }

        const updated = updatedOrders.find(
          (item) => item.id === order.id
        );

        return updated || order;
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedAllOrders)
      );

      setOrders(
        updatedAllOrders.filter(
          (order) => order.tenantId === kasirAktif.tenantId
        )
      );
    } catch {
      alert("Gagal menyimpan perubahan pesanan.");
    }
  };

  const updateStatus = (id: string, status: string) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    saveOrders(updated);
  };

  const acceptOrder = (id: string) => {
    updateStatus(id, "Pesanan Dikonfirmasi");
  };

  const rejectOrder = (id: string) => {
    if (!rejectReason.trim()) {
      alert("Masukkan alasan penolakan terlebih dahulu.");
      return;
    }

    const updated = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            status: "Pesanan Ditolak",
            alasanPenolakan: rejectReason.trim(),
          }
        : order
    );

    saveOrders(updated);
    setRejectId(null);
    setRejectReason("");
  };

  const saveNote = (id: string) => {
    const updated = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            catatanKasir: notes[id] ?? order.catatanKasir ?? "",
          }
        : order
    );

    saveOrders(updated);
    alert("Catatan kasir berhasil disimpan.");
  };

  const filteredOrders =
    filter === "Semua"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getNextStatus = (status: string) => {
    switch (status) {
      case "Pesanan Dikonfirmasi":
        return "Sedang Disiapkan";
      case "Sedang Disiapkan":
        return "Siap Diambil";
      case "Siap Diambil":
        return "Pesanan Selesai";
      default:
        return null;
    }
  };

  const ringkasan = [
    {
      label: "Total Pesanan",
      value: orders.length,
      color: "text-[#493326]",
    },
    {
      label: "Menunggu",
      value: orders.filter(
        (o) => o.status === "Menunggu Konfirmasi Kasir"
      ).length,
      color: "text-[#A66B16]",
    },
    {
      label: "Diproses",
      value: orders.filter(
        (o) =>
          o.status === "Pesanan Dikonfirmasi" ||
          o.status === "Sedang Disiapkan"
      ).length,
      color: "text-[#72543E]",
    },
    {
      label: "Siap Diambil",
      value: orders.filter(
        (o) => o.status === "Siap Diambil"
      ).length,
      color: "text-[#81569A]",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-8 text-sm text-[#A18B78]">
        Memuat pesanan...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-6 pb-28 sm:px-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-7">
          <p className="text-sm text-[#A18B78]">
            JajanYuk / Manajemen Pesanan
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-extrabold text-[#493326] sm:text-3xl">
                Manajemen Pesanan
              </h1>
              <p className="mt-2 text-sm text-[#A18B78]">
                Kelola dan proses pesanan pelanggan tenant kamu.
              </p>
            </div>

            <div className="rounded-xl border border-[#EFE5D9] bg-white px-4 py-3">
              <p className="text-xs text-[#A18B78]">Tenant Aktif</p>
              <p className="mt-1 font-bold text-[#493326]">
                Tenant {kasirAktif.tenantId}
              </p>
            </div>
          </div>
        </div>

        {/* Ringkasan */}
        <section className="mb-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {ringkasan.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#EFE5D9] bg-white p-5"
            >
              <p className="text-sm text-[#A18B78]">{item.label}</p>
              <p className={`mt-3 text-3xl font-extrabold ${item.color}`}>
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Filter */}
        <section className="mb-6">
          <h2 className="mb-3 font-bold text-[#493326]">
            Filter Status
          </h2>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {statusList.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  filter === status
                    ? "border-[#493326] bg-[#493326] text-white"
                    : "border-[#EFE5D9] bg-white text-[#8D7969] hover:bg-[#F0E8DE]"
                }`}
              >
                {status === "Semua" ? "Semua" : labelStatus(status)}
              </button>
            ))}
          </div>
        </section>

        {/* Jumlah Hasil */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-[#493326]">
            Daftar Pesanan
          </h2>
          <span className="text-xs text-[#A18B78]">
            {filteredOrders.length} pesanan
          </span>
        </div>

        {/* Daftar Pesanan */}
        <div className="space-y-5">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-[#EFE5D9] bg-white px-5 py-14 text-center">
              <h3 className="font-bold text-[#493326]">
                Belum ada pesanan
              </h3>
              <p className="mt-2 text-sm text-[#A18B78]">
                Pesanan dengan status ini belum tersedia.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const nextStatus = getNextStatus(order.status);

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-[#EFE5D9] bg-white"
                >
                  {/* Header Pesanan */}
                  <div className="flex flex-col justify-between gap-3 bg-[#FFFCF8] p-5 sm:flex-row sm:items-center sm:px-6">
                    <div>
                      <p className="text-xs text-[#A18B78]">
                        ID Pesanan
                      </p>
                      <h3 className="mt-1 font-bold text-[#493326]">
                        {order.id}
                      </h3>
                      <p className="mt-1 text-xs text-[#A18B78]">
                        {formatTanggal(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">

                    {/* Informasi Pelanggan */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-[#A18B78]">
                          Nama Pelanggan
                        </p>
                        <p className="mt-1 font-semibold text-[#493326]">
                          {order.nama}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A18B78]">
                          Kelas
                        </p>
                        <p className="mt-1 font-semibold text-[#493326]">
                          {order.kelas}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A18B78]">
                          Metode Pemesanan
                        </p>
                        <p className="mt-1 font-semibold text-[#493326]">
                          {order.metode}
                        </p>
                      </div>
                    </div>

                    <div className="my-5 border-t border-[#F3ECE4]" />

                    {/* Detail Item */}
                    <div>
                      <h4 className="mb-4 text-sm font-bold text-[#493326]">
                        Detail Pesanan
                      </h4>

                      <div className="space-y-3">
                        {order.items?.map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="flex justify-between gap-3 text-sm"
                          >
                            <div>
                              <p className="font-semibold text-[#493326]">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-[#A18B78]">
                                {item.quantity} × {formatRupiah(item.price)}
                              </p>
                            </div>

                            <p className="font-semibold text-[#493326]">
                              {formatRupiah(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-between border-t border-[#EFE5D9] pt-4">
                        <span className="text-sm font-bold text-[#493326]">
                          Total Pembayaran
                        </span>
                        <span className="font-extrabold text-[#493326]">
                          {formatRupiah(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Catatan Pelanggan */}
                    {order.catatan && (
                      <div className="mt-5 rounded-xl bg-[#FAF7F2] p-4">
                        <p className="text-xs font-bold text-[#8D7969]">
                          Catatan Pelanggan
                        </p>
                        <p className="mt-2 text-sm text-[#493326]">
                          {order.catatan}
                        </p>
                      </div>
                    )}

                    {/* Alasan Penolakan */}
                    {order.alasanPenolakan && (
                      <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
                        <p className="text-xs font-bold text-red-700">
                          Alasan Penolakan
                        </p>
                        <p className="mt-2 text-sm text-red-700">
                          {order.alasanPenolakan}
                        </p>
                      </div>
                    )}

                    {/* Catatan Kasir */}
                    {order.status !== "Pesanan Ditolak" &&
                      order.status !== "Pesanan Selesai" && (
                        <div className="mt-5">
                          <label className="mb-2 block text-sm font-bold text-[#493326]">
                            Catatan Kasir
                          </label>

                          <textarea
                            value={
                              notes[order.id] ??
                              order.catatanKasir ??
                              ""
                            }
                            onChange={(e) =>
                              setNotes((prev) => ({
                                ...prev,
                                [order.id]: e.target.value,
                              }))
                            }
                            placeholder="Tambahkan catatan untuk pesanan ini..."
                            rows={2}
                            className="w-full rounded-xl border border-[#EFE5D9] bg-[#FFFCF8] p-3 text-sm text-[#493326] outline-none transition placeholder:text-[#B7A596] focus:border-[#E99557]"
                          />

                          <button
                            onClick={() => saveNote(order.id)}
                            className="mt-2 rounded-lg border border-[#EFE5D9] px-4 py-2 text-sm font-semibold text-[#72543E] transition hover:bg-[#F0E8DE]"
                          >
                            Simpan Catatan
                          </button>
                        </div>
                      )}

                    {/* Form Penolakan */}
                    {rejectId === order.id && (
                      <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                        <label className="mb-2 block text-sm font-bold text-red-800">
                          Alasan Penolakan
                        </label>

                        <textarea
                          value={rejectReason}
                          onChange={(e) =>
                            setRejectReason(e.target.value)
                          }
                          rows={3}
                          placeholder="Tuliskan alasan pesanan ditolak..."
                          className="w-full rounded-xl border border-red-200 bg-white p-3 text-sm outline-none focus:border-red-400"
                        />

                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() => rejectOrder(order.id)}
                            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                          >
                            Konfirmasi Penolakan
                          </button>

                          <button
                            onClick={() => {
                              setRejectId(null);
                              setRejectReason("");
                            }}
                            className="rounded-xl border border-[#EFE5D9] bg-white px-4 py-2.5 text-sm font-semibold text-[#72543E]"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tombol Aksi */}
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-[#F3ECE4] pt-5">
                      {order.status === "Menunggu Konfirmasi Kasir" && (
                        <>
                          <button
                            onClick={() => acceptOrder(order.id)}
                            className="rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#604331]"
                          >
                            Terima Pesanan
                          </button>

                          <button
                            onClick={() => {
                              setRejectId(order.id);
                              setRejectReason("");
                            }}
                            className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Tolak Pesanan
                          </button>
                        </>
                      )}

                      {nextStatus && (
                        <button
                          onClick={() =>
                            updateStatus(order.id, nextStatus)
                          }
                          className="rounded-xl bg-[#E99557] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D98243]"
                        >
                          {nextStatus === "Sedang Disiapkan"
                            ? "Mulai Siapkan"
                            : nextStatus === "Siap Diambil"
                            ? "Tandai Siap Diambil"
                            : "Selesaikan Pesanan"}
                        </button>
                      )}

                      {order.status === "Pesanan Selesai" && (
                        <p className="text-sm font-medium text-[#39754B]">
                          Pesanan telah selesai.
                        </p>
                      )}

                      {order.status === "Pesanan Ditolak" && (
                        <p className="text-sm font-medium text-red-600">
                          Pesanan telah ditolak.
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
