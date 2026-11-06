"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "90d">("7d");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ringkasan aktivitas kantin hari ini
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/pesanan"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-all hover:shadow hover:scale-[1.02]"
          >
            <span>Semua Pesanan</span>
          </Link>
          <Link
            href="/admin/tenant"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm border border-gray-200 shadow-xs transition-all hover:border-gray-300"
          >
            <span>Kelola Tenant</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Pesanan */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Pesanan
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              842
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-emerald-600 font-bold flex items-center">
                 +12.5%
              </span>
              <span className="text-gray-400">dari kemarin</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
        </div>

        {/* Diproses */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Diproses
            </span>
             
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              218
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-blue-600 font-bold">
                25.8%
              </span>
              <span className="text-gray-400">sedang disiapkan dapur</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>
        </div>

        {/* Selesai */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Selesai
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              598
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-emerald-600 font-bold">
                71.0%
              </span>
              <span className="text-gray-400">berhasil diambil pelanggan</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
        </div>

        {/* Dibatalkan */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Dibatalkan
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              26
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-rose-600 font-bold">
                3.1%
              </span>
              <span className="text-gray-400">tingkat pembatalan rendah</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500"></div>
        </div>
      </div>

      {/* Main Grid: Grafik Garis & Pesanan per Tenant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Grafik Pesanan</h2>
              <p className="text-xs text-gray-400">Tren volume pesanan kantin</p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-gray-100 rounded-xl self-start sm:self-auto text-xs font-semibold">
              <button
                type="button"
                onClick={() => setChartPeriod("7d")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartPeriod === "7d"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-gray-500 hover:text-slate-900"
                }`}
              >
                7 Hari
              </button>
              <button
                type="button"
                onClick={() => setChartPeriod("30d")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartPeriod === "30d"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-gray-500 hover:text-slate-900"
                }`}
              >
                30 Hari
              </button>
              <button
                type="button"
                onClick={() => setChartPeriod("90d")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartPeriod === "90d"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-gray-500 hover:text-slate-900"
                }`}
              >
                90 Hari
              </button>
            </div>
          </div>

          {/* Line chart */}
          <div className="mt-6 h-64 w-full">
            {(() => {
              const series = chartPeriod === "7d"
                ? [
                    { label: "Sen", value: 110 },
                    { label: "Sel", value: 135 },
                    { label: "Rab", value: 92 },
                    { label: "Kam", value: 128 },
                    { label: "Jum", value: 152 },
                    { label: "Sab", value: 165 },
                    { label: "Min", value: 60 },
                  ]
                : chartPeriod === "30d"
                  ? [
                      { label: "Minggu 1", value: 760 },
                      { label: "Minggu 2", value: 890 },
                      { label: "Minggu 3", value: 810 },
                      { label: "Minggu 4", value: 1020 },
                    ]
                  : [
                      { label: "September", value: 3420 },
                      { label: "Oktober", value: 3980 },
                      { label: "November", value: 4450 },
                    ];
              const maxValue = Math.max(...series.map((point) => point.value)) * 1.15;
              const points = series.map((point, index) => ({
                ...point,
                x: 36 + (index * 628) / (series.length - 1),
                y: 190 - (point.value / maxValue) * 150,
              }));
              const linePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");

              return (
                <svg
                  viewBox="0 0 700 240"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                  role="img"
                  aria-label={`Grafik garis pesanan ${chartPeriod === "7d" ? "7 hari" : chartPeriod === "30d" ? "30 hari" : "90 hari"}`}
                >
                  {[40, 90, 140, 190].map((y) => (
                    <line key={y} x1="36" y1={y} x2="664" y2={y} stroke="#e5e7eb" strokeDasharray="4 5" />
                  ))}
                  <polyline
                    points={linePoints}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {points.map((point, index) => (
                    <g key={point.label}>
                      <circle cx={point.x} cy={point.y} r="6" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
                      <text x={point.x} y={point.y - 15} textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">
                        {chartPeriod === "7d" ? point.value : point.value.toLocaleString("id-ID")}
                      </text>
                      <text x={point.x} y="220" textAnchor="middle" className={`text-[11px] ${index === points.length - 1 && chartPeriod === "7d" ? "fill-amber-700 font-bold" : "fill-slate-500"}`}>
                        {point.label}
                      </text>
                    </g>
                  ))}
                </svg>
              );
            })()}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Rata-rata pesanan harian: <strong className="text-slate-800">120 pesanan</strong></span>
            <span className="text-emerald-600 font-semibold">Trafik jam makan siang (11:30 - 13:30) tertinggi</span>
          </div>
        </div>

        {/* Pesanan per Tenant Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Pesanan per Tenant</h2>
                <p className="text-xs text-gray-400">Pangsa volume penjualan hari ini</p>
              </div>
              <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                4 Tenant
              </span>
            </div>

            <div className="mt-5 space-y-5">
              {/* Tenant 1: Burger Bites 37% */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    
                    <span className="font-semibold text-slate-800">Burger Bites</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-amber-600">37%</span>
                    <span className="text-xs text-gray-400 ml-1.5">(312 pesanan)</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: "37%" }}
                    className="h-full bg-amber-500 rounded-full"
                  ></div>
                </div>
              </div>

              {/* Tenant 2: Mie Berkah 29% */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    
                    <span className="font-semibold text-slate-800">Mie Berkah</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600">29%</span>
                    <span className="text-xs text-gray-400 ml-1.5">(244 pesanan)</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: "29%" }}
                    className="h-full bg-emerald-500 rounded-full"
                  ></div>
                </div>
              </div>

              {/* Tenant 3: Snack Corner 22% */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    
                    <span className="font-semibold text-slate-800">Snack Corner</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-blue-600">22%</span>
                    <span className="text-xs text-gray-400 ml-1.5">(185 pesanan)</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: "22%" }}
                    className="h-full bg-blue-500 rounded-full"
                  ></div>
                </div>
              </div>

              {/* Tenant 4: Es & Segar 12% */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    
                    <span className="font-semibold text-slate-800">Es & Segar</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-purple-600">12%</span>
                    <span className="text-xs text-gray-400 ml-1.5">(101 pesanan)</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: "12%" }}
                    className="h-full bg-purple-500 rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              href="/admin/laporan"
              className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center justify-center gap-1 hover:underline"
            >
              Lihat Analisis Detail Tenant &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Tenant Aktif Section (4 Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tenant Aktif</h2>
            <p className="text-xs text-gray-500">Status kios dan pemilik stan kantin</p>
          </div>
          <Link
            href="/admin/tenant"
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline"
          >
            Lihat Semua Tenant &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tenant Card 1: Burger Bites */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl border border-amber-200">
                
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Aktif
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-slate-900 text-base">Burger Bites</h3>
              <p className="text-xs text-gray-400">Owner: Budi Santoso</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Pesanan Hari Ini</span>
              <span className="font-bold text-slate-900">312 pesanan</span>
            </div>
          </div>

          {/* Tenant Card 2: Mie Berkah */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl border border-emerald-200">
                
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Aktif
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-slate-900 text-base">Mie Berkah</h3>
              <p className="text-xs text-gray-400">Owner: Ibu Wahyuni</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Pesanan Hari Ini</span>
              <span className="font-bold text-slate-900">244 pesanan</span>
            </div>
          </div>

          {/* Tenant Card 3: Snack Corner */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl border border-blue-200">
                
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Aktif
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-slate-900 text-base">Snack Corner</h3>
              <p className="text-xs text-gray-400">Owner: Hendra Wijaya</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Pesanan Hari Ini</span>
              <span className="font-bold text-slate-900">185 pesanan</span>
            </div>
          </div>

          {/* Tenant Card 4: Es & Segar */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl border border-purple-200">
                
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Aktif
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-slate-900 text-base">Es & Segar</h3>
              <p className="text-xs text-gray-400">Owner: Dewi Lestari</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Pesanan Hari Ini</span>
              <span className="font-bold text-slate-900">101 pesanan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pesanan Terbaru Section (5 Rows) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pesanan Terbaru</h2>
            <p className="text-xs text-gray-400">5 transaksi pesanan terakhir di seluruh tenant kantin</p>
          </div>
          <Link
            href="/admin/pesanan"
            className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
          >
            Lihat Semua Pesanan &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">No. Pesanan</th>
                <th className="py-3.5 px-6">Pelanggan</th>
                <th className="py-3.5 px-6">Tenant</th>
                <th className="py-3.5 px-6">Menu Utama</th>
                <th className="py-3.5 px-6">Total</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {/* Row 1 */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  #ORD-0842
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-900">Ahmad Fauzi</div>
                  <div className="text-xs text-gray-400">Siswa (XII RPL 1)</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                     Burger Bites
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                  Double Beef Cheese Burger + Fries
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  Rp 45.000
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    
                    Diproses
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-xs font-medium text-gray-500">
                  13:42 WIB
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  #ORD-0841
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-900">Siti Rahma</div>
                  <div className="text-xs text-gray-400">Siswa (XI MM 2)</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                     Mie Berkah
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                  Mie Ayam Pangsit Komplit
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  Rp 22.000
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    Menunggu
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-xs font-medium text-gray-500">
                  13:39 WIB
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  #ORD-0840
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-900">Dimas Pratama</div>
                  <div className="text-xs text-gray-400">Siswa (X TKJ 1)</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                     Es & Segar
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                  Es Teh Manis Jumbo + Es Doger
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  Rp 18.000
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Selesai
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-xs font-medium text-gray-500">
                  13:35 WIB
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  #ORD-0839
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-900">Nabila Putri</div>
                  <div className="text-xs text-gray-400">Guru / Staf</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                     Snack Corner
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                  Risol Mayo 3x + Cireng Crispy
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  Rp 25.000
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Selesai
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-xs font-medium text-gray-500">
                  13:30 WIB
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  #ORD-0838
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-900">Rizky Kurniawan</div>
                  <div className="text-xs text-gray-400">Siswa (XII AKL 2)</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                     Burger Bites
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                  Crispy Chicken Burger Combo
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  Rp 28.000
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    Dibatalkan
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-xs font-medium text-gray-500">
                  13:22 WIB
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
