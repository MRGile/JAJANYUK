"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { id?: string; name?: string; quantity?: number; price?: number };
type Order = { id: string; nama?: string; total?: number; status?: string; metode?: string; createdAt?: string; items?: Item[] };
const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export default function OwnerTransactionsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("semua");
  const [method, setMethod] = useState("semua");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<Order | null>(null);
  const pageSize = 10;

  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const value: unknown = JSON.parse(localStorage.getItem("jajanyuk-orders") || "[]");
        setOrders(Array.isArray(value) ? value : []);
      } finally { setLoaded(true); }
    });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => orders.filter((item) => `${item.id} ${item.nama || ""}`.toLowerCase().includes(query.toLowerCase()) && (!date || item.createdAt?.slice(0, 10) === date) && (status === "semua" || item.status === status) && (method === "semua" || item.metode === method)), [orders, query, date, status, method]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const statuses = [...new Set(orders.map((item) => item.status).filter((item): item is string => !!item))];
  const methods = [...new Set(orders.map((item) => item.metode).filter((item): item is string => !!item))];

  if (!loaded) return <p role="status" className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">Memuat transaksi...</p>;
  return <div className="space-y-6"><div><h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Riwayat Transaksi</h1><p className="mt-1 text-sm text-gray-600">Cari dan tinjau pesanan yang tersimpan di browser ini.</p></div>
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><label className="text-sm font-medium">Cari transaksi<input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="ID pesanan atau nama pelanggan" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Tanggal<input type="date" value={date} onChange={(event) => { setDate(event.target.value); setPage(1); }} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Status<select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2"><option value="semua">Semua status</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-medium">Metode pembayaran<select value={method} onChange={(event) => { setMethod(event.target.value); setPage(1); }} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2"><option value="semua">Semua metode</option>{methods.map((item) => <option key={item}>{item}</option>)}</select></label></div>
      <p className="mb-3 text-xs text-gray-600">{filtered.length} transaksi ditemukan.</p>{visible.length === 0 ? <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center"><p className="font-semibold text-slate-800">Belum ada transaksi yang cocok</p><p className="mt-1 text-sm text-gray-600">Coba ubah pencarian atau filter.</p></div> : <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm"><thead className="border-b bg-gray-50 text-xs font-bold uppercase text-gray-700"><tr><th className="p-3">ID / Tanggal</th><th className="p-3">Pelanggan</th><th className="p-3">Jumlah produk</th><th className="p-3">Pembayaran</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3 text-right">Aksi</th></tr></thead><tbody className="divide-y">{visible.map((item) => <tr key={item.id} className="hover:bg-amber-50/40"><td className="p-3 font-semibold">{item.id}<span className="block text-xs font-normal text-gray-600">{item.createdAt ? new Date(item.createdAt).toLocaleString("id-ID") : "Waktu tidak tersedia"}</span></td><td className="p-3">{item.nama || "Tidak tersedia"}</td><td className="p-3">{item.items?.reduce((sum, product) => sum + (Number(product.quantity) || 0), 0) || 0}</td><td className="p-3">{item.metode || "Tidak tersedia"}</td><td className="p-3 font-semibold">{rupiah(Number(item.total) || 0)}</td><td className="p-3">{item.status || "Tidak tersedia"}</td><td className="p-3 text-right"><button type="button" onClick={() => setDetail(item)} className="font-semibold text-amber-800 underline focus-visible:outline-2 focus-visible:outline-amber-600">Detail</button></td></tr>)}</tbody></table></div>}
      <div className="mt-5 flex items-center justify-between"><span className="text-xs text-gray-600">Halaman {page} dari {totalPages}</span><div className="flex gap-2"><button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Sebelumnya</button><button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Berikutnya</button></div></div>
    </section>
    {detail && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"><section role="dialog" aria-modal="true" aria-labelledby="detail-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"><div className="flex items-center justify-between"><h2 id="detail-title" className="text-lg font-bold">Detail Transaksi</h2><button type="button" onClick={() => setDetail(null)} className="rounded-lg px-3 py-1 hover:bg-gray-100">Tutup</button></div><dl className="mt-4 space-y-3 text-sm"><div><dt className="text-gray-600">ID transaksi</dt><dd className="font-semibold">{detail.id}</dd></div><div><dt className="text-gray-600">Tanggal</dt><dd>{detail.createdAt ? new Date(detail.createdAt).toLocaleString("id-ID") : "Tidak tersedia"}</dd></div><div><dt className="text-gray-600">Pelanggan</dt><dd>{detail.nama || "Tidak tersedia"}</dd></div><div><dt className="text-gray-600">Kasir</dt><dd>Tidak tersedia pada data transaksi</dd></div><div><dt className="text-gray-600">Metode pembayaran</dt><dd>{detail.metode || "Tidak tersedia"}</dd></div><div><dt className="text-gray-600">Status</dt><dd>{detail.status || "Tidak tersedia"}</dd></div></dl><h3 className="mt-5 font-semibold">Rincian produk</h3>{!detail.items?.length ? <p className="mt-2 text-sm text-gray-600">Rincian produk tidak tersedia.</p> : <ul className="mt-2 divide-y">{detail.items.map((item, index) => <li key={`${item.id || item.name}-${index}`} className="flex justify-between py-2 text-sm"><span>{item.name || "Produk"} × {item.quantity || 1}</span><span>{rupiah((Number(item.price) || 0) * (Number(item.quantity) || 1))}</span></li>)}</ul>}<p className="mt-4 flex justify-between border-t pt-3 font-bold"><span>Total</span><span>{rupiah(Number(detail.total) || 0)}</span></p></section></div>}
  </div>;
}
