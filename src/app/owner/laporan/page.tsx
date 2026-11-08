"use client";

import { useEffect, useState } from "react";

type Order = { id: string; total?: number; createdAt?: string; status?: string; nama?: string };
type Expense = { id: string; date: string; category: string; description: string; amount: number };
const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export default function OwnerFinancePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expenses, setExpenses] = useState<Record<string, Expense>>({});
  const [loaded, setLoaded] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [period, setPeriod] = useState("bulanan");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Bahan baku");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const storedOrders: unknown = JSON.parse(localStorage.getItem("jajanyuk-orders") || "[]");
        const storedExpenses: unknown = JSON.parse(localStorage.getItem("jajanyuk-owner-expenses") || "{}");
        setOrders(Array.isArray(storedOrders) ? storedOrders : []);
        setExpenses(storedExpenses && typeof storedExpenses === "object" && !Array.isArray(storedExpenses) ? storedExpenses as Record<string, Expense> : {});
        setToday(new Date());
      } finally { setLoaded(true); }
    });
    return () => { mounted = false; };
  }, []);

  const now = today ?? new Date(0);
  const start = new Date(now); start.setHours(0, 0, 0, 0);
  if (period === "mingguan") start.setDate(now.getDate() - 6);
  if (period === "bulanan") start.setDate(1);
  const visibleOrders = orders.filter((item) => item.createdAt && new Date(item.createdAt) >= start && new Date(item.createdAt) <= now && item.status !== "Pesanan Ditolak");
  const visibleExpenses = Object.values(expenses).filter((item) => new Date(`${item.date}T00:00:00`) >= start && new Date(`${item.date}T00:00:00`) <= now && `${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  const income = visibleOrders.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
  const outcome = visibleExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const saveExpense = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!date || !description.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) { setMessage("Lengkapi tanggal, keterangan, dan jumlah yang valid."); return; }
    const id = `EXP-${Date.now()}`;
    const next = { ...expenses, [id]: { id, date, category, description: description.trim(), amount: numericAmount } };
    try {
      localStorage.setItem("jajanyuk-owner-expenses", JSON.stringify(next));
      setExpenses(next); setDescription(""); setAmount(""); setMessage("Pengeluaran tersimpan di browser ini."); setShowForm(false);
    } catch { setMessage("Penyimpanan gagal. Periksa ruang penyimpanan browser."); }
  };

  const exportCsv = () => {
    const rows = ["Tanggal,Jenis,Keterangan,Jumlah", ...visibleOrders.map((item) => `${item.createdAt || ""},Pemasukan,${item.id},${Number(item.total) || 0}`), ...visibleExpenses.map((item) => `${item.date},Pengeluaran,${item.description},${item.amount}`)];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "laporan-keuangan.csv"; anchor.click(); URL.revokeObjectURL(url);
  };

  if (!loaded || !today) return <p role="status" className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">Memuat laporan keuangan...</p>;
  return <div className="space-y-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Laporan Keuangan</h1><p className="mt-1 text-sm text-gray-600">Pantau pemasukan penjualan dan catat pengeluaran kantin.</p></div><button type="button" onClick={exportCsv} className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50">Ekspor CSV</button></div>
    {message && <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-slate-900">{message}</p>}
    <div className="flex flex-wrap items-center gap-2"><label htmlFor="finance-period" className="text-sm font-semibold">Periode laporan</label><select id="finance-period" value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"><option value="harian">Harian</option><option value="mingguan">7 hari terakhir</option><option value="bulanan">Bulan ini</option></select></div>
    <div className="grid gap-4 sm:grid-cols-3">{[{ label: "Total income", value: income }, { label: "Total outcome", value: outcome }, { label: "Keuntungan bersih", value: income - outcome }].map((item) => <section key={item.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-gray-600">{item.label}</p><p className="mt-2 text-2xl font-extrabold text-slate-900">{rupiah(item.value)}</p></section>)}</div>
    <div className="grid gap-6 xl:grid-cols-2"><section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Pemasukan penjualan</h2><p className="mt-1 text-xs text-gray-600">{visibleOrders.length} transaksi pada periode ini.</p>{visibleOrders.length === 0 ? <p className="mt-5 rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-600">Belum ada pemasukan pada periode ini.</p> : <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b bg-gray-50 text-xs"><tr><th className="p-3">Tanggal</th><th className="p-3">ID transaksi</th><th className="p-3">Pelanggan</th><th className="p-3 text-right">Jumlah</th></tr></thead><tbody className="divide-y">{visibleOrders.map((item) => <tr key={item.id}><td className="p-3">{item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "Tidak tersedia"}</td><td className="p-3 font-semibold">{item.id}</td><td className="p-3">{item.nama || "Tidak tersedia"}</td><td className="p-3 text-right font-semibold">{rupiah(Number(item.total) || 0)}</td></tr>)}</tbody></table></div>}</section>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold text-slate-900">Pengeluaran</h2><p className="mt-1 text-xs text-gray-600">Catatan biaya yang disimpan pada browser ini.</p></div><button type="button" onClick={() => setShowForm(!showForm)} className="shrink-0 rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-600">{showForm ? "Tutup" : "Catat pengeluaran"}</button></div>
        {showForm && <form onSubmit={saveExpense} className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Tanggal<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Kategori<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2"><option>Bahan baku</option><option>Operasional</option><option>Peralatan</option><option>Lainnya</option></select></label><label className="text-sm font-medium sm:col-span-2">Keterangan<input required value={description} onChange={(event) => setDescription(event.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Jumlah<input required type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><div className="flex items-end"><button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Simpan</button></div></form>}
        <label className="mt-4 block text-sm font-medium">Cari pengeluaran<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kategori atau keterangan" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
        {visibleExpenses.length === 0 ? <p className="mt-4 rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-600">Belum ada pengeluaran yang cocok.</p> : <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b bg-gray-50 text-xs"><tr><th className="p-3">Tanggal</th><th className="p-3">Keterangan</th><th className="p-3">Kategori</th><th className="p-3 text-right">Jumlah</th></tr></thead><tbody className="divide-y">{visibleExpenses.map((item) => <tr key={item.id}><td className="p-3">{item.date}</td><td className="p-3">{item.description}</td><td className="p-3">{item.category}</td><td className="p-3 text-right font-semibold">{rupiah(item.amount)}</td></tr>)}</tbody></table></div>}</section></div>
    <p className="text-xs text-gray-600">Pemasukan dihitung dari pesanan selain yang ditolak. Status pembayaran belum tersedia pada data transaksi.</p>
  </div>;
}
