
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { kasirAktif } from "./config";

type Order = {
  id: string;
  nama: string;
  kelas: string;
  total: number;
  status: string;
  createdAt: string;
  tenantId: string;
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatTanggal = (value: string) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusStyle = (status: string) => {
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

export default function KasirDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem("jajanyuk-orders");
        const parsed: Order[] = savedOrders
          ? JSON.parse(savedOrders)
          : [];

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
    };

    loadOrders();

    window.addEventListener("storage", loadOrders);
    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  const menunggu = orders.filter(
    (order) => order.status === "Menunggu Konfirmasi Kasir"
  ).length;

  const diproses = orders.filter(
    (order) =>
      order.status === "Pesanan Dikonfirmasi" ||
      order.status === "Sedang Disiapkan"
  ).length;

  const siapDiambil = orders.filter(
    (order) => order.status === "Siap Diambil"
  ).length;

  const selesai = orders.filter(
    (order) => order.status === "Pesanan Selesai"
  ).length;

  const ringkasan = [
    {
      label: "Menunggu Konfirmasi",
      jumlah: menunggu,
      keterangan: "Perlu diperiksa",
      warna: "bg-[#FFF2D9]",
      teks: "text-[#A66B16]",
    },
    {
      label: "Sedang Diproses",
      jumlah: diproses,
      keterangan: "Dalam pengerjaan",
      warna: "bg-[#F0E8DE]",
      teks: "text-[#72543E]",
    },
    {
      label: "Siap Diambil",
      jumlah: siapDiambil,
      keterangan: "Menunggu pelanggan",
      warna: "bg-[#F3EAF8]",
      teks: "text-[#81569A]",
    },
    {
      label: "Pesanan Selesai",
      jumlah: selesai,
      keterangan: "Berhasil diselesaikan",
      warna: "bg-[#E5F3E9]",
      teks: "text-[#39754B]",
    },
  ];

  const pesananTerbaru = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-6 pb-28 sm:px-6 md:px-8 md:py-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#A18B78]">
            JajanYuk / Dashboard
          </p>
          <h1 className="text-2xl font-extrabold text-[#493326] sm:text-3xl">
            Dashboard Kasir
          </h1>
          <p className="mt-2 text-sm text-[#A18B78]">
            Pantau dan kelola pesanan tenant kamu di sini.
          </p>
        </div>

        <Link
          href="/kasir/pesanan"
          className="inline-flex w-fit items-center justify-center rounded-xl bg-[#493326] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#604331]"
        >
          Lihat Semua Pesanan
          <span className="ml-3">→</span>
        </Link>
      </div>

      {/* Tenant Aktif */}
      <div className="mb-7 flex flex-col justify-between gap-4 rounded-2xl bg-[#493326] p-6 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#E5CDB8]">
            Tenant yang sedang dikelola
          </p>
          <h2 className="mt-1 text-xl font-bold">
            Tenant {kasirAktif.tenantId}
          </h2>
          <p className="mt-2 text-sm text-[#E5CDB8]">
            Login sebagai {kasirAktif.nama}
          </p>
        </div>

        <div className="w-fit rounded-xl bg-white/10 px-4 py-3">
          <p className="text-xs text-[#E5CDB8]">Total Pesanan</p>
          <p className="mt-1 text-2xl font-bold">{orders.length}</p>
        </div>
      </div>

      {/* Ringkasan */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#493326]">
            Ringkasan Pesanan
          </h2>
          <p className="mt-1 text-sm text-[#A18B78]">
            Kondisi pesanan tenant saat ini.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ringkasan.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#EFE5D9] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-[#8D7969]">
                  {item.label}
                </p>
                <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${item.warna} ${item.teks}`}>
                  {item.label === "Menunggu Konfirmasi" ? "Baru" : "Status"}
                </span>
              </div>

              <p className="mt-4 text-3xl font-extrabold text-[#493326]">
                {loading ? "..." : item.jumlah}
              </p>

              <p className="mt-2 text-xs text-[#A18B78]">
                {item.keterangan}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pesanan Terbaru */}
      <section className="overflow-hidden rounded-2xl border border-[#EFE5D9] bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-[#EFE5D9] p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[#493326]">
              Pesanan Terbaru
            </h2>
            <p className="mt-1 text-sm text-[#A18B78]">
              Lima pesanan terakhir yang masuk.
            </p>
          </div>

          <Link
            href="/kasir/pesanan"
            className="text-sm font-semibold text-[#D98243] hover:underline"
          >
            Lihat semua →
          </Link>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-[#A18B78]">
            Memuat pesanan...
          </div>
        ) : pesananTerbaru.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="text-base font-semibold text-[#493326]">
              Belum ada pesanan
            </p>
            <p className="mt-2 text-sm text-[#A18B78]">
              Pesanan pelanggan akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F3ECE4]">
            {pesananTerbaru.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-3 p-5 transition hover:bg-[#FFFCF8] sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="min-w-0">
                  <p className="font-bold text-[#493326]">
                    {order.nama}
                  </p>
                  <p className="mt-1 text-xs text-[#A18B78]">
                    {order.id} · Kelas {order.kelas}
                  </p>
                  <p className="mt-1 text-xs text-[#A18B78]">
                    {formatTanggal(order.createdAt)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-[#493326]">
                      {formatRupiah(order.total)}
                    </p>
                    <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <Link
                    href={`/kasir/pesanan/${order.id}`}
                    className="rounded-lg border border-[#EFE5D9] px-4 py-2 text-sm font-semibold text-[#493326] transition hover:bg-[#F0E8DE]"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Catatan */}
      <div className="mt-6 rounded-2xl border border-[#EFE5D9] bg-[#F0E8DE]/60 p-5">
        <p className="text-sm font-bold text-[#493326]">
          Informasi
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#8D7969]">
          Dashboard ini hanya menampilkan pesanan milik Tenant{" "}
          {kasirAktif.tenantId}. Pastikan pesanan baru segera diperiksa dan
          dikonfirmasi agar pelanggan mendapatkan kepastian.
        </p>
      </div>
    </div>
  );
}
