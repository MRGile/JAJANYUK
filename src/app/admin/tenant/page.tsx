"use client";

import { useEffect, useState } from "react";

type Tenant = { id: number; name: string; description: string | null };

export default function ManajemenTenantPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenantRows, setTenantRows] = useState<Tenant[]>([]);
  const [activeTenantIds, setActiveTenantIds] = useState<number[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    fetch("/api/tenants")
      .then(async (response) => {
        if (!response.ok) throw new Error("Gagal memuat tenant");
        const result = await response.json();
        return Array.isArray(result.data) ? result.data as Tenant[] : [];
      })
      .then((rows) => {
        setTenantRows(rows);
        setActiveTenantIds(rows.map((tenant) => tenant.id));
      })
      .catch(() => setTenantRows([]));
  }, []);

  const toggleTenant = (tenantId: number) => {
    setActiveTenantIds((current) => current.includes(tenantId)
      ? current.filter((id) => id !== tenantId)
      : [...current, tenantId]);
  };

  const handleSubmitTenant = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
          
          <div>
            <p className="font-bold text-sm">Tenant Berhasil Ditambahkan!</p>
            <p className="text-xs text-emerald-100">Data tenant baru telah tersimpan ke sistem.</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Tenant
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola data stan kantin, jam operasional, dan akun pemilik kios
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-all hover:shadow hover:scale-[1.02] cursor-pointer"
        >
          <span className="text-lg leading-none font-black">+</span>
          <span>Tambah Tenant</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Tenant</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{tenantRows.length} Kios</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Tenant Buka</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {activeTenantIds.length} Kios
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Menu Aktif</span>
          <p className="text-2xl font-black text-slate-900 mt-1">0 Menu</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Pesanan Hari Ini</span>
          <p className="text-2xl font-black text-amber-600 mt-1">0 Pesanan</p>
        </div>
      </div>

      {/* Tenant Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tenantRows.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 md:col-span-2">
            Belum ada tenant di database.
          </div>
        ) : tenantRows.map((tenant) => {
          const isActive = activeTenantIds.includes(tenant.id);
          return (
            <article key={tenant.id} className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-3xl">🏪</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">{tenant.name}</h2>
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Tenant</span>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500">ID {tenant.id}</p>
                    </div>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${isActive ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
                    {isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-gray-600">{tenant.description || "Belum ada deskripsi."}</p>
                <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 text-xs">
                  <div className="rounded-xl bg-gray-50 p-2.5">
                    <span className="block text-[11px] text-gray-400">Total Menu Aktif</span>
                    <span className="text-lg font-black text-slate-900">—</span>
                  </div>
                  <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-2.5">
                    <span className="block text-[11px] text-gray-400">Pesanan Hari Ini</span>
                    <span className="text-lg font-black text-amber-600">—</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end border-t border-gray-100 pt-4">
                <button type="button" onClick={() => toggleTenant(tenant.id)} className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition ${isActive ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100" : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>
                  {isActive ? "Nonaktifkan Tenant" : "Aktifkan Tenant"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {/* Modal Form Tambah Tenant */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl font-bold">X</div>
                <div>
                  <h3 className="text-lg font-bold">Tambah Tenant Baru</h3>
                  <p className="text-xs text-slate-300">
                    Lengkapi formulir informasi tenant dan akun owner stan kantin
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/10 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                aria-label="Tutup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmitTenant} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Section 1: Data Kios */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                  <span className="font-black">X</span>
                  <span>Informasi Stan & Usaha</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Tenant / Stan <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Soto Ayam Lamongan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori Usaha <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    >
                      <option value="Makanan">Makanan</option>
                      <option value="Minuman">Minuman</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat / Lokasi Kios <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Gedung Kantin Utama, Lantai 1 Kios No. C-04"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Deskripsi Tenant
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tuliskan deskripsi menu atau ringkasan makanan yang dijual..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jam Buka Operasional <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="time"
                      defaultValue="08:00"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jam Tutup Operasional <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="time"
                      defaultValue="16:30"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor Telepon Kios <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Foto Logo / Banner Tenant
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Data Akun Owner */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                  <span className="font-black">X</span>
                  <span>Data Akun Pemilik (Owner)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap Pemilik <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Supriyadi Pratama"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Owner (Login) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="supriyadi@tenant.jajanyuk.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password Sementara <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Minimal 8 karakter"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-slate-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-sm transition-all hover:shadow cursor-pointer"
                >
                  Simpan Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
