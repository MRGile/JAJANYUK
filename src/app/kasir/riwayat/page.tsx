
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
  tenantId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  alasanPenolakan?: string;
};

const STORAGE_KEY = "jajanyuk-orders";

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka || 0);

const formatTanggal = (tanggal: string) =>
  new Date(tanggal).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function RiwayatKasirPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed: Order[] = saved ? JSON.parse(saved) : [];

        const tenantOrders = parsed.filter(
          (order) =>
            order.tenantId === kasirAktif.tenantId &&
            (order.status === "Pesanan Selesai" ||
              order.status === "Pesanan Ditolak")
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

  const selesai = orders.filter(
    (order) => order.status === "Pesanan Selesai"
  );

  const ditolak = orders.filter(
    (order) => order.status === "Pesanan Ditolak"
  );

  const totalPendapatan = selesai.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const cocokFilter =
        filter === "Semua" || order.status === filter;

      const keyword = search.toLowerCase();

      const cocokSearch =
        order.id.toLowerCase().includes(keyword) ||
        order.nama.toLowerCase().includes(keyword) ||
        order.kelas.toLowerCase().includes(keyword);

      return cocokFilter && cocokSearch;
    });
  }, [orders, filter, search]);

  const statusStyle = (status: string) => {
    return status === "Pesanan Selesai"
      ? "bg-[#E5F3E9] text-[#39754B]"
      : "bg-[#FCE8E6] text-[#B34E46]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-8 text-sm text-[#A18B78]">
        Memuat riwayat pesanan...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-6 pb-28 sm:px-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-7">
          <p className="text-sm text-[#A18B78]">
            JajanYuk / Riwayat
          </p>

          <div className="mt-2">
            <h1 className="text-2xl font-extrabold text-[#493326] sm:text-3xl">
              Riwayat Pesanan
            </h1>
            <p className="mt-2 text-sm text-[#A18B78]">
              Lihat kembali transaksi yang telah selesai atau ditolak.
            </p>
          </div>
        </div>

        {/* Tenant Aktif */}
        <div className="mb-7 flex flex-col justify-between gap-3 rounded-2xl bg-[#493326] p-5 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-xs text-[#E5CDB8]">
              Riwayat transaksi tenant
            </p>
            <h2 className="mt-1 text-lg font-bold">
              Tenant {kasirAktif.tenantId}
            </h2>
          </div>

          <p className="text-sm text-[#E5CDB8]">
            {orders.length} total riwayat
          </p>
        </div>

        {/* Ringkasan */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#EFE5D9] bg-white p-5">
            <p className="text-sm text-[#A18B78]">
              Total Riwayat
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#493326]">
              {orders.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EFE5D9] bg-white p-5">
            <p className="text-sm text-[#A18B78]">
              Pesanan Selesai
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#39754B]">
              {selesai.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EFE5D9] bg-white p-5">
            <p className="text-sm text-[#A18B78]">
              Total Transaksi Selesai
            </p>
            <p className="mt-3 text-xl font-extrabold text-[#E99557] sm:text-2xl">
              {formatRupiah(totalPendapatan)}
            </p>
          </div>
        </section>

        {/* Pencarian */}
        <section className="mb-5">
          <label className="mb-2 block text-sm font-bold text-[#493326]">
            Cari Riwayat
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID pesanan, nama pelanggan, atau kelas..."
            className="w-full rounded-xl border border-[#EFE5D9] bg-white px-4 py-3 text-sm text-[#493326] outline-none transition placeholder:text-[#B7A596] focus:border-[#E99557]"
          />
        </section>

        {/* Filter */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { label: "Semua", value: "Semua" },
              { label: "Selesai", value: "Pesanan Selesai" },
              { label: "Ditolak", value: "Pesanan Ditolak" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`shrink-0 rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${
                  filter === item.value
                    ? "border-[#493326] bg-[#493326] text-white"
                    : "border-[#EFE5D9] bg-white text-[#8D7969] hover:bg-[#F0E8DE]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* Daftar Riwayat */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[#493326]">
              Daftar Riwayat
            </h2>
            <span className="text-xs text-[#A18B78]">
              {filteredOrders.length} hasil
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-[#EFE5D9] bg-white px-5 py-14 text-center">
              <h3 className="font-bold text-[#493326]">
                Riwayat tidak ditemukan
              </h3>
              <p className="mt-2 text-sm text-[#A18B78]">
                Coba gunakan kata kunci atau filter yang berbeda.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-[#EFE5D9] bg-white p-5 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-xs text-[#A18B78]">
                        ID Pesanan
                      </p>
                      <h3 className="mt-1 font-bold text-[#493326]">
                        {order.id}
                      </h3>
                      <p className="mt-2 text-xs text-[#A18B78]">
                        {formatTanggal(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(order.status)}`}
                    >
                      {order.status === "Pesanan Selesai"
                        ? "Selesai"
                        : "Ditolak"}
                    </span>
                  </div>

                  <div className="my-5 border-t border-[#F3ECE4]" />

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-[#A18B78]">
                        Pelanggan
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

                  <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#F3ECE4] pt-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs text-[#A18B78]">
                        Total Pesanan
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-[#493326]">
                        {formatRupiah(order.total)}
                      </p>
                    </div>

                    <Link
                      href={`/kasir/pesanan/${order.id}`}
                      className="inline-flex w-fit items-center justify-center rounded-xl border border-[#EFE5D9] px-5 py-2.5 text-sm font-semibold text-[#493326] transition hover:bg-[#F0E8DE]"
                    >
                      Lihat Detail →
                    </Link>
                  </div>

                  {order.alasanPenolakan && (
                    <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                      <p className="text-xs font-bold text-red-700">
                        Alasan Penolakan
                      </p>
                      <p className="mt-2 text-sm text-red-700">
                        {order.alasanPenolakan}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
