"use client";

import { useEffect, useState } from "react";

type OrderItem = { name?: string; quantity?: number };
type Order = { id: string; nama?: string; total?: number; status?: string; createdAt?: string; items?: OrderItem[] };
type Expense = { date: string; amount: number };
const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export default function OwnerDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "90d">("7d");
  const [loaded, setLoaded] = useState(false);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const savedOrders: unknown = JSON.parse(localStorage.getItem("jajanyuk-orders") || "[]");
        const savedExpenses: unknown = JSON.parse(localStorage.getItem("jajanyuk-owner-expenses") || "{}");
        setOrders(Array.isArray(savedOrders) ? savedOrders : []);
        setExpenses(savedExpenses && typeof savedExpenses === "object" ? Object.values(savedExpenses) as Expense[] : []);
        setToday(new Date());
      } finally { setLoaded(true); }
    });
    return () => { mounted = false; };
  }, []);

  if (!loaded || !today) return <p role="status" className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">Memuat ringkasan Owner...</p>;

  const done = orders.filter((order) => order.status === "Pesanan Selesai").length;
  const cancelled = orders.filter((order) => order.status === "Pesanan Ditolak").length;
  const processing = orders.filter((order) => ["Pesanan Dikonfirmasi", "Sedang Disiapkan", "Siap Diambil"].includes(order.status || "")).length;
  const startToday = new Date(today); startToday.setHours(0, 0, 0, 0);
  const income = orders.filter((order) => order.createdAt && new Date(order.createdAt) >= startToday && order.status !== "Pesanan Ditolak").reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const expense = expenses.filter((item) => item.date === today.toLocaleDateString("en-CA")).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const series = chartPeriod === "7d"
    ? Array.from({ length: 7 }, (_, index) => {
        const day = new Date(startToday); day.setDate(startToday.getDate() - 6 + index);
        const next = new Date(day); next.setDate(day.getDate() + 1);
        return { label: day.toLocaleDateString("id-ID", { weekday: "short" }), value: orders.filter((order) => order.createdAt && new Date(order.createdAt) >= day && new Date(order.createdAt) < next).length };
      })
    : chartPeriod === "30d"
      ? Array.from({ length: 4 }, (_, index) => {
          const end = new Date(startToday); end.setDate(startToday.getDate() - (3 - index) * 7 + 1);
          const start = new Date(end); start.setDate(end.getDate() - (index === 0 ? 9 : 6));
          return { label: `Minggu ${index + 1}`, value: orders.filter((order) => order.createdAt && new Date(order.createdAt) >= start && new Date(order.createdAt) < end).length };
        })
      : Array.from({ length: 3 }, (_, index) => {
          const start = new Date(today.getFullYear(), today.getMonth() - 2 + index, 1);
          const end = new Date(today.getFullYear(), today.getMonth() - 1 + index, 1);
          return { label: start.toLocaleDateString("id-ID", { month: "short" }), value: orders.filter((order) => order.createdAt && new Date(order.createdAt) >= start && new Date(order.createdAt) < end).length };
        });
  const maxValue = Math.max(1, ...series.map((point) => point.value));
  const points = series.map((point, index) => ({ ...point, x: 40 + index * 620 / Math.max(1, series.length - 1), y: 190 - point.value / maxValue * 145 }));
  const popular: Record<string, number> = {};
  for (const order of orders) for (const item of order.items || []) {
    const name = item.name || "Produk tanpa nama";
    popular[name] = (popular[name] || 0) + (Number(item.quantity) || 0);
  }
  const bestSellers = Object.entries(popular).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const bestSellerMax = Math.max(1, ...bestSellers.map(([, count]) => count));
  const cards = [
    { label: "Total Transaksi", value: orders.length, note: "Pesanan tersimpan", color: "bg-amber-500" },
    { label: "Diproses", value: processing, note: "Sedang disiapkan", color: "bg-blue-500" },
    { label: "Selesai", value: done, note: "Pesanan dituntaskan", color: "bg-emerald-500" },
    { label: "Ditolak", value: cancelled, note: "Pesanan dibatalkan", color: "bg-rose-500" },
  ];

  return <div className="space-y-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Dashboard Owner</h1><p className="mt-1 text-sm text-gray-600">Ringkasan aktivitas kantin berdasarkan data yang tersedia.</p></div><div className="flex flex-wrap gap-3"><a href="/owner/transaksi" className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-amber-700">Semua Transaksi</a><a href="/owner/produk" className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-amber-600">Kelola Produk</a></div></div>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <section key={card.label} className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-gray-600">{card.label}</p><p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{card.value.toLocaleString("id-ID")}</p><p className="mt-2 text-xs text-gray-600">{card.note}</p><div className={`absolute inset-x-0 bottom-0 h-1 ${card.color}`} /></section>)}</div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2 sm:p-6"><div className="flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-bold text-slate-900">Grafik Transaksi</h2><p className="text-xs text-gray-600">Jumlah pesanan dalam periode terpilih.</p></div><div className="inline-flex self-start rounded-xl bg-gray-100 p-1 text-xs font-semibold" aria-label="Periode grafik">{(["7d", "30d", "90d"] as const).map((item) => <button key={item} type="button" onClick={() => setChartPeriod(item)} aria-pressed={chartPeriod === item} className={`rounded-lg px-3 py-1.5 focus-visible:outline-2 focus-visible:outline-amber-600 ${chartPeriod === item ? "bg-white text-slate-900 shadow-sm" : "text-gray-600 hover:text-slate-900"}`}>{item === "7d" ? "7 Hari" : item === "30d" ? "30 Hari" : "90 Hari"}</button>)}</div></div>
        {orders.length === 0 ? <div className="pt-5"><div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center"><p className="font-semibold text-slate-800">Belum ada transaksi</p><p className="mt-1 text-sm text-gray-600">Grafik akan terisi setelah pesanan tersimpan.</p></div></div> : <div className="mt-5 h-64 w-full"><svg viewBox="0 0 700 240" preserveAspectRatio="none" className="h-full w-full" role="img" aria-label={`Grafik jumlah transaksi untuk ${chartPeriod === "7d" ? "7 hari" : chartPeriod === "30d" ? "30 hari" : "90 hari"}`}><title>Grafik transaksi berdasarkan periode</title>{[40, 90, 140, 190].map((y) => <line key={y} x1="36" y1={y} x2="664" y2={y} stroke="#e5e7eb" strokeDasharray="4 5" />)}<polyline points={points.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />{points.map((point) => <g key={point.label}><circle cx={point.x} cy={point.y} r="6" fill="#fff" stroke="#d97706" strokeWidth="3"><title>{`${point.label}: ${point.value} transaksi`}</title></circle><text x={point.x} y={point.y - 14} textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">{point.value}</text><text x={point.x} y="220" textAnchor="middle" className="fill-slate-600 text-[11px]">{point.label}</text></g>)}</svg></div>}
        <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-3 text-xs text-gray-700 sm:flex-row sm:items-center sm:justify-between"><span>Pemasukan tercatat hari ini <strong className="text-slate-900">{rupiah(income)}</strong></span><span>Pengeluaran <strong className="text-slate-900">{rupiah(expense)}</strong> · Bersih <strong className={income - expense < 0 ? "text-rose-700" : "text-emerald-700"}>{rupiah(income - expense)}</strong></span></div>
      </section>
      <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"><div className="border-b border-gray-100 pb-4"><h2 className="text-lg font-bold text-slate-900">Menu Terlaris</h2><p className="text-xs text-gray-600">Jumlah produk dari pesanan yang tersimpan.</p></div>{bestSellers.length === 0 ? <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center"><p className="font-semibold text-slate-800">Belum ada data produk terjual</p><p className="mt-1 text-sm text-gray-600">Rincian muncul ketika pesanan berisi produk.</p></div> : <div className="mt-5 flex-1 space-y-5">{bestSellers.map(([name, count]) => <div key={name}><div className="mb-1.5 flex items-center justify-between gap-3 text-sm"><span className="truncate font-semibold text-slate-800">{name}</span><span className="shrink-0 font-bold text-amber-700">{count} terjual</span></div><div className="h-3 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-amber-500" style={{ width: `${count / bestSellerMax * 100}%` }} /></div></div>)}</div>}<div className="mt-6 border-t border-gray-100 pt-4"><a href="/owner/produk" className="flex justify-center text-xs font-bold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">Lihat Manajemen Produk</a></div></section>
    </div>
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-lg font-bold text-slate-900">Transaksi Terbaru</h2><p className="text-xs text-gray-600">Pesanan terbaru yang tersimpan di browser ini.</p></div><a href="/owner/transaksi" className="text-xs font-bold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">Lihat Semua Transaksi</a></div>
      {orders.length === 0 ? <div className="p-5 sm:p-6"><div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center"><p className="font-semibold text-slate-800">Belum ada transaksi</p><p className="mt-1 text-sm text-gray-600">Transaksi baru akan muncul di tabel ini.</p></div></div> : <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm text-slate-700"><thead className="border-b border-gray-100 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-700"><tr><th className="px-5 py-3.5 sm:px-6">ID Pesanan</th><th className="px-5 py-3.5 sm:px-6">Pelanggan</th><th className="px-5 py-3.5 sm:px-6">Menu</th><th className="px-5 py-3.5 sm:px-6">Total</th><th className="px-5 py-3.5 sm:px-6">Status</th><th className="px-5 py-3.5 text-right sm:px-6">Waktu</th></tr></thead><tbody className="divide-y divide-gray-100">{orders.slice(0, 5).map((order) => <tr key={order.id} className="hover:bg-amber-50/40"><td className="px-5 py-4 font-bold text-slate-900 sm:px-6">{order.id}</td><td className="px-5 py-4">{order.nama || "Nama tidak tersedia"}</td><td className="max-w-xs truncate px-5 py-4 text-gray-700 sm:px-6">{order.items?.reduce((label, item, index) => `${label}${index ? ", " : ""}${item.name || "Produk"} × ${item.quantity || 1}`, "") || "Rincian tidak tersedia"}</td><td className="px-5 py-4 font-bold text-slate-900 sm:px-6">{rupiah(Number(order.total) || 0)}</td><td className="px-5 py-4 sm:px-6">{order.status || "Status tidak tersedia"}</td><td className="px-5 py-4 text-right text-xs text-gray-600 sm:px-6">{order.createdAt ? new Date(order.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "—"}</td></tr>)}</tbody></table></div>}
      <p className="px-5 pb-5 text-xs text-gray-600 sm:px-6">Informasi kasir dan status pembayaran belum tersedia pada data transaksi saat ini.</p></section>
  </div>;
}
