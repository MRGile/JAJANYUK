"use client";

import { useEffect, useMemo, useState } from "react";

type Product = { id: string; name: string; category: string; description: string; price: number; cost: number; stock: number | null; available: boolean; photo: string };
type ProductForm = { name: string; category: string; description: string; price: string; cost: string; stock: string; available: boolean; photo: string };
const blankForm: ProductForm = { name: "", category: "Makanan", description: "", price: "", cost: "", stock: "", available: true, photo: "" };
const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export default function OwnerProductsPage() {
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("semua");
  const [sort, setSort] = useState("nama");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState("");
  const [form, setForm] = useState<ProductForm>(blankForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const value: unknown = JSON.parse(localStorage.getItem("jajanyuk-owner-products") || "{}");
        setProducts(value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, Product> : {});
      } finally { setLoaded(true); }
    });
    return () => { mounted = false; };
  }, []);

  const visible = useMemo(() => Object.values(products).filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()) && (category === "semua" || item.category === category)).sort((a, b) => sort === "harga" ? a.price - b.price : a.name.localeCompare(b.name, "id")), [products, query, category, sort]);
  const openAdd = () => { setEditing(""); setForm(blankForm); setModal(true); };
  const openEdit = (item: Product) => { setEditing(item.id); setForm({ name: item.name, category: item.category, description: item.description, price: String(item.price), cost: item.cost ? String(item.cost) : "", stock: item.stock === null ? "" : String(item.stock), available: item.available, photo: item.photo || "" }); setModal(true); };

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(form.price); const cost = Number(form.cost || 0); const stock = form.stock === "" ? null : Number(form.stock);
    if (!form.name.trim() || !Number.isFinite(price) || price <= 0 || (stock !== null && (!Number.isInteger(stock) || stock < 0))) { setMessage("Periksa nama, harga, dan stok produk."); return; }
    const id = editing || `PRD-${Date.now()}`;
    const next = { ...products, [id]: { id, name: form.name.trim(), category: form.category, description: form.description.trim(), price, cost, stock, available: form.available, photo: form.photo } };
    try { localStorage.setItem("jajanyuk-owner-products", JSON.stringify(next)); setProducts(next); setMessage("Produk tersimpan di browser ini. Katalog pelanggan belum terhubung."); setModal(false); }
    catch { setMessage("Produk gagal disimpan. Periksa ruang penyimpanan browser."); }
  };

  const remove = (item: Product) => {
    if (!window.confirm(`Hapus produk ${item.name}?`)) return;
    const next = { ...products }; delete next[item.id];
    try { localStorage.setItem("jajanyuk-owner-products", JSON.stringify(next)); setProducts(next); setMessage("Produk dihapus dari daftar Owner di browser ini."); }
    catch { setMessage("Produk gagal dihapus."); }
  };

  if (!loaded) return <p role="status" className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">Memuat produk...</p>;
  return <div className="space-y-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Manajemen Produk</h1><p className="mt-1 text-sm text-gray-600">Kelola produk Owner pada penyimpanan browser ini.</p></div><button type="button" onClick={openAdd} className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-amber-700">Tambah Produk</button></div>
    {message && <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-slate-900">{message}</p>}
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="mb-5 grid gap-3 sm:grid-cols-3"><label className="text-sm font-medium">Cari produk<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nama atau kategori" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Kategori<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2"><option value="semua">Semua kategori</option><option>Makanan</option><option>Minuman</option><option>Camilan</option><option>Lainnya</option></select></label><label className="text-sm font-medium">Urutkan<select value={sort} onChange={(event) => setSort(event.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2"><option value="nama">Nama</option><option value="harga">Harga terendah</option></select></label></div>
      {visible.length === 0 ? <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center"><p className="font-semibold text-slate-800">Belum ada produk Owner</p><p className="mt-1 text-sm text-gray-600">Tambahkan produk untuk mulai mengelola katalog.</p></div> : <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b bg-gray-50 text-xs font-bold uppercase text-gray-700"><tr><th className="p-3">Produk</th><th className="p-3">Kategori</th><th className="p-3">Harga jual</th><th className="p-3">Modal</th><th className="p-3">Stok</th><th className="p-3">Status</th><th className="p-3 text-right">Aksi</th></tr></thead><tbody className="divide-y">{visible.map((item) => <tr key={item.id}><td className="p-3"><div className="flex items-center gap-3">{item.photo ? <img src={item.photo} alt={`Foto ${item.name}`} className="h-12 w-12 rounded-lg object-cover" /> : <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-600">Foto</div>}<div className="font-semibold">{item.name}<span className="block max-w-xs truncate text-xs font-normal text-gray-600">{item.description}</span></div></div></td><td className="p-3">{item.category}</td><td className="p-3">{rupiah(item.price)}</td><td className="p-3">{item.cost ? rupiah(item.cost) : "Tidak diisi"}</td><td className="p-3">{item.stock ?? "Tidak memakai stok"}</td><td className="p-3">{item.available ? "Tersedia" : "Tidak tersedia"}</td><td className="p-3 text-right"><button type="button" onClick={() => openEdit(item)} className="mr-3 font-semibold text-amber-800 underline">Edit</button><button type="button" onClick={() => remove(item)} className="font-semibold text-rose-800 underline">Hapus</button></td></tr>)}</tbody></table></div>}
    </section>
    {modal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"><section role="dialog" aria-modal="true" aria-labelledby="product-form-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"><div className="mb-4 flex items-center justify-between"><h2 id="product-form-title" className="text-lg font-bold">{editing ? "Edit Produk" : "Tambah Produk"}</h2><button type="button" onClick={() => setModal(false)} className="rounded-lg px-3 py-1 hover:bg-gray-100">X</button></div><form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Nama produk<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Kategori<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2"><option>Makanan</option><option>Minuman</option><option>Camilan</option><option>Lainnya</option></select></label><label className="text-sm font-medium sm:col-span-2">Deskripsi<input value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Harga jual<input required type="number" min="1" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Harga modal<input type="number" min="0" value={form.cost} onChange={(event) => setForm({ ...form, cost: event.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="text-sm font-medium">Stok<input type="number" min="0" step="1" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" /></label><label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.available} onChange={(event) => setForm({ ...form, available: event.target.checked })} />Tersedia</label><label className="text-sm font-medium sm:col-span-2">Foto produk<input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 1000000) { setMessage("Ukuran foto maksimal 1 MB."); return; } const reader = new FileReader(); reader.onload = () => setForm((current) => ({ ...current, photo: String(reader.result || "") })); reader.readAsDataURL(file); }} className="mt-1 block w-full text-sm" /></label>{form.photo && <img src={form.photo} alt="Pratinjau foto produk" className="h-20 w-20 rounded-lg object-cover sm:col-span-2" />}<div className="flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={() => setModal(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Batal</button><button className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950">Simpan Produk</button></div></form></section></div>}
  </div>;
}
