"use client";

import { useState } from "react";

export default function ManajemenTenantPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(true);
  const [isMieActive, setIsMieActive] = useState(true);
  const [isSnackActive, setIsSnackActive] = useState(true);
  const [isEsActive, setIsEsActive] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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
          <p className="text-2xl font-black text-slate-900 mt-1">4 Kios</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Tenant Buka</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {(isBurgerActive ? 1 : 0) + (isMieActive ? 1 : 0) + (isSnackActive ? 1 : 0) + (isEsActive ? 1 : 0)} Kios
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Menu Aktif</span>
          <p className="text-2xl font-black text-slate-900 mt-1">70 Menu</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Pesanan Hari Ini</span>
          <p className="text-2xl font-black text-amber-600 mt-1">842 Pesanan</p>
        </div>
      </div>

      {/* 4 Tenant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tenant 1: Burger Bites */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl">X</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">Burger Bites</h2>
                    <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-md">
                      Makanan
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Kios Blok A-01 • 08:00 - 16:30 WIB
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  isBurgerActive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {isBurgerActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Spesialis burger daging sapi panggang, chicken burger, kentang goreng keju, dan paket hemat makan siang siswa.
            </p>

            {/* Owner & Tenant Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-400 text-[11px] block">Pemilik Stan</span>
                <span className="font-semibold text-slate-800">Budi Santoso</span>
                <span className="text-gray-500 text-[11px] block truncate">budi@burgerbites.com</span>
                <span className="text-gray-500 text-[11px] block">0812-3456-7890</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-gray-400 text-[11px] block">Pesanan Hari Ini</span>
                  <span className="text-lg font-black text-amber-600">312 Pesanan</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Omset: <strong className="text-slate-800">Rp 4.250.000</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              18 Menu Aktif • Rating 4.8 ⭐
            </span>
            <button
              type="button"
              onClick={() => setIsBurgerActive(!isBurgerActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isBurgerActive
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
              }`}
            >
              {isBurgerActive ? "Nonaktifkan Tenant" : "Aktifkan Tenant"}
            </button>
          </div>
        </div>

        {/* Tenant 2: Mie Berkah */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl">X</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">Mie Berkah</h2>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md">
                      Makanan
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Kios Blok A-02 • 07:30 - 16:00 WIB
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  isMieActive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {isMieActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Aneka sajian mie ayam pangsit, bakso sapi urat, bihun bebek, dan kuah kaldu segar gurih tanpa bahan pengawet.
            </p>

            {/* Owner & Tenant Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-400 text-[11px] block">Pemilik Stan</span>
                <span className="font-semibold text-slate-800">Ibu Wahyuni</span>
                <span className="text-gray-500 text-[11px] block truncate">wahyuni@mieberkah.com</span>
                <span className="text-gray-500 text-[11px] block">0813-7890-1234</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-gray-400 text-[11px] block">Pesanan Hari Ini</span>
                  <span className="text-lg font-black text-emerald-600">244 Pesanan</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Omset: <strong className="text-slate-800">Rp 3.120.000</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              14 Menu Aktif • Rating 4.9 ⭐
            </span>
            <button
              type="button"
              onClick={() => setIsMieActive(!isMieActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isMieActive
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
              }`}
            >
              {isMieActive ? "Nonaktifkan Tenant" : "Aktifkan Tenant"}
            </button>
          </div>
        </div>

        {/* Tenant 3: Snack Corner */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-3xl">X</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">Snack Corner</h2>
                    <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-md">
                      Snack
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Kios Blok B-01 • 08:30 - 15:30 WIB
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  isSnackActive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {isSnackActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Camilan renyah, risol mayo lumer, pastel ayam, sosis solo, cireng pedas, dan aneka jajanan pasar ramah kantong.
            </p>

            {/* Owner & Tenant Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-400 text-[11px] block">Pemilik Stan</span>
                <span className="font-semibold text-slate-800">Hendra Wijaya</span>
                <span className="text-gray-500 text-[11px] block truncate">hendra@snackcorner.com</span>
                <span className="text-gray-500 text-[11px] block">0856-1122-3344</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-gray-400 text-[11px] block">Pesanan Hari Ini</span>
                  <span className="text-lg font-black text-blue-600">185 Pesanan</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Omset: <strong className="text-slate-800">Rp 1.950.000</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              22 Menu Aktif • Rating 4.7 ⭐
            </span>
            <button
              type="button"
              onClick={() => setIsSnackActive(!isSnackActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSnackActive
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
              }`}
            >
              {isSnackActive ? "Nonaktifkan Tenant" : "Aktifkan Tenant"}
            </button>
          </div>
        </div>

        {/* Tenant 4: Es & Segar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-3xl">X</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">Es & Segar</h2>
                    <span className="text-xs bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-md">
                      Minuman
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Kios Blok B-02 • 08:00 - 17:00 WIB
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  isEsActive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {isEsActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Minuman pelepas dahaga, es teh manis jumbo, aneka jus buah segar, es doger, kopi susu gula aren, dan es cincau kelapa.
            </p>

            {/* Owner & Tenant Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-400 text-[11px] block">Pemilik Stan</span>
                <span className="font-semibold text-slate-800">Dewi Lestari</span>
                <span className="text-gray-500 text-[11px] block truncate">dewi@essegar.com</span>
                <span className="text-gray-500 text-[11px] block">0878-9988-7766</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-gray-400 text-[11px] block">Pesanan Hari Ini</span>
                  <span className="text-lg font-black text-purple-600">101 Pesanan</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Omset: <strong className="text-slate-800">Rp 1.280.000</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              16 Menu Aktif • Rating 4.6 ⭐
            </span>
            <button
              type="button"
              onClick={() => setIsEsActive(!isEsActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isEsActive
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
              }`}
            >
              {isEsActive ? "Nonaktifkan Tenant" : "Aktifkan Tenant"}
            </button>
          </div>
        </div>
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
