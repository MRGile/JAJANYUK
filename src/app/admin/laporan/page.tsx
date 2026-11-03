"use client";

import { useState } from "react";

export default function LaporanStatistikPage() {
  const [period, setPeriod] = useState<"harian" | "mingguan" | "bulanan">("harian");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Laporan & Statistik
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analisis performa penjualan, omset tenant, dan efisiensi pesanan kantin
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPeriod("harian")}
              className={`px-4 py-2 rounded-lg transition-all ${
                period === "harian"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
              Harian (Hari Ini)
            </button>
            <button
              type="button"
              onClick={() => setPeriod("mingguan")}
              className={`px-4 py-2 rounded-lg transition-all ${
                period === "mingguan"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
              Mingguan (7 Hari)
            </button>
            <button
              type="button"
              onClick={() => setPeriod("bulanan")}
              className={`px-4 py-2 rounded-lg transition-all ${
                period === "bulanan"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
              Bulanan (30 Hari)
            </button>
          </div>

          <button
            type="button"
            onClick={() => alert("Laporan rekap berhasil diunduh!")}
            className="hidden sm:inline-flex items-center gap-1.5 bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            
            <span>Unduh Laporan</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Pesanan */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Pesanan
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg">
              
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {period === "harian" && "842"}
              {period === "mingguan" && "5.240"}
              {period === "bulanan" && "22.850"}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {period === "harian" && "Akumulasi pesanan masuk hari ini"}
              {period === "mingguan" && "Rata-rata 748 pesanan/hari"}
              {period === "bulanan" && "Rata-rata 761 pesanan/hari"}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
        </div>

        {/* Total Selesai */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Selesai
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">
              
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {period === "harian" && "598"}
              {period === "mingguan" && "5.092"}
              {period === "bulanan" && "22.180"}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {period === "harian" && "96.8% rasio keberhasilan"}
              {period === "mingguan" && "97.1% pesanan sukses tersajikan"}
              {period === "bulanan" && "97.0% kepuasan layanan selesai"}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
        </div>

        {/* Total Dibatalkan */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Dibatalkan
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center text-lg">
              ️
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {period === "harian" && "26"}
              {period === "mingguan" && "148"}
              {period === "bulanan" && "670"}
            </div>
            <p className="text-xs text-rose-600 font-semibold mt-1">
              {period === "harian" && "3.2% tingkat pembatalan"}
              {period === "mingguan" && "2.9% pembatalan karena stok habis"}
              {period === "bulanan" && "3.0% toleransi normal"}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500"></div>
        </div>

        {/* Pendapatan Estimasi */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Pendapatan Estimasi
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg">
              
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {period === "harian" && "Rp 10.600.000"}
              {period === "mingguan" && "Rp 68.450.000"}
              {period === "bulanan" && "Rp 295.300.000"}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {period === "harian" && "+14% dibanding kemarin"}
              {period === "mingguan" && "+9.5% pertumbuhan mingguan"}
              {period === "bulanan" && "Total perputaran uang kantin"}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
        </div>
      </div>

      {/* Bar Chart per Tenant (Pure CSS/HTML, NO libraries) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Grafik Penjualan per Tenant</h2>
            <p className="text-xs text-gray-400">Perbandingan kontribusi omset antar kios kantin</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 self-start sm:self-auto">
            Mode: {period === "harian" ? "Harian" : period === "mingguan" ? "Mingguan" : "Bulanan"}
          </span>
        </div>

        {/* Pure CSS Horizontal Comparison Bars */}
        <div className="mt-6 space-y-6">
          {/* Tenant 1: Burger Bites */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                
                <span className="font-bold text-slate-900">Burger Bites</span>
                <span className="text-xs text-gray-400">(Kategori: Makanan Cepat Saji)</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-amber-600 text-base">
                  {period === "harian" && "Rp 4.250.000"}
                  {period === "mingguan" && "Rp 27.500.000"}
                  {period === "bulanan" && "Rp 118.000.000"}
                </span>
                <span className="text-xs text-gray-500 ml-2 font-semibold">40.1%</span>
              </div>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5">
              <div
                style={{ width: "40.1%" }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-xs transition-all duration-500"
              ></div>
            </div>
          </div>

          {/* Tenant 2: Mie Berkah */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                
                <span className="font-bold text-slate-900">Mie Berkah</span>
                <span className="text-xs text-gray-400">(Kategori: Aneka Mie & Bakso)</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-emerald-600 text-base">
                  {period === "harian" && "Rp 3.120.000"}
                  {period === "mingguan" && "Rp 20.100.000"}
                  {period === "bulanan" && "Rp 86.000.000"}
                </span>
                <span className="text-xs text-gray-500 ml-2 font-semibold">29.4%</span>
              </div>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5">
              <div
                style={{ width: "29.4%" }}
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-xs transition-all duration-500"
              ></div>
            </div>
          </div>

          {/* Tenant 3: Snack Corner */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                
                <span className="font-bold text-slate-900">Snack Corner</span>
                <span className="text-xs text-gray-400">(Kategori: Jajanan & Gorengan)</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-blue-600 text-base">
                  {period === "harian" && "Rp 1.950.000"}
                  {period === "mingguan" && "Rp 12.800.000"}
                  {period === "bulanan" && "Rp 55.500.000"}
                </span>
                <span className="text-xs text-gray-500 ml-2 font-semibold">18.4%</span>
              </div>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5">
              <div
                style={{ width: "18.4%" }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-xs transition-all duration-500"
              ></div>
            </div>
          </div>

          {/* Tenant 4: Es & Segar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                
                <span className="font-bold text-slate-900">Es & Segar</span>
                <span className="text-xs text-gray-400">(Kategori: Minuman Dingin & Jus)</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-purple-600 text-base">
                  {period === "harian" && "Rp 1.280.000"}
                  {period === "mingguan" && "Rp 8.050.000"}
                  {period === "bulanan" && "Rp 35.800.000"}
                </span>
                <span className="text-xs text-gray-500 ml-2 font-semibold">12.1%</span>
              </div>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5">
              <div
                style={{ width: "12.1%" }}
                className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-xs transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tabel Perbandingan Performa Tenant</h2>
            <p className="text-xs text-gray-400">Rekapitulasi pesanan, rasio keberhasilan, dan omset masing-masing kios</p>
          </div>
          <span className="text-xs text-gray-400">
            Terakhir diperbarui: 13:45 WIB
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">Nama Tenant</th>
                <th className="py-3.5 px-6">Kategori</th>
                <th className="py-3.5 px-6">Total Pesanan</th>
                <th className="py-3.5 px-6">Selesai</th>
                <th className="py-3.5 px-6">Dibatalkan</th>
                <th className="py-3.5 px-6">% Sukses</th>
                <th className="py-3.5 px-6 text-right">Estimasi Omset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {/* Row 1: Burger Bites */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    
                    <span>Burger Bites</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Makanan Cepat Saji
                </td>
                <td className="py-4 px-6 font-semibold text-slate-900">
                  {period === "harian" && "312"}
                  {period === "mingguan" && "2.050"}
                  {period === "bulanan" && "9.120"}
                </td>
                <td className="py-4 px-6 text-emerald-600 font-medium">
                  {period === "harian" && "298"}
                  {period === "mingguan" && "1.990"}
                  {period === "bulanan" && "8.850"}
                </td>
                <td className="py-4 px-6 text-rose-600 font-medium">
                  {period === "harian" && "14"}
                  {period === "mingguan" && "60"}
                  {period === "bulanan" && "270"}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    95.5%
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-extrabold text-slate-900">
                  {period === "harian" && "Rp 4.250.000"}
                  {period === "mingguan" && "Rp 27.500.000"}
                  {period === "bulanan" && "Rp 118.000.000"}
                </td>
              </tr>

              {/* Row 2: Mie Berkah */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    
                    <span>Mie Berkah</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Makanan Tradisional
                </td>
                <td className="py-4 px-6 font-semibold text-slate-900">
                  {period === "harian" && "244"}
                  {period === "mingguan" && "1.520"}
                  {period === "bulanan" && "6.710"}
                </td>
                <td className="py-4 px-6 text-emerald-600 font-medium">
                  {period === "harian" && "238"}
                  {period === "mingguan" && "1.480"}
                  {period === "bulanan" && "6.530"}
                </td>
                <td className="py-4 px-6 text-rose-600 font-medium">
                  {period === "harian" && "6"}
                  {period === "mingguan" && "40"}
                  {period === "bulanan" && "180"}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    97.5%
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-extrabold text-slate-900">
                  {period === "harian" && "Rp 3.120.000"}
                  {period === "mingguan" && "Rp 20.100.000"}
                  {period === "bulanan" && "Rp 86.000.000"}
                </td>
              </tr>

              {/* Row 3: Snack Corner */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    
                    <span>Snack Corner</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Camilan & Snack
                </td>
                <td className="py-4 px-6 font-semibold text-slate-900">
                  {period === "harian" && "185"}
                  {period === "mingguan" && "1.130"}
                  {period === "bulanan" && "4.890"}
                </td>
                <td className="py-4 px-6 text-emerald-600 font-medium">
                  {period === "harian" && "181"}
                  {period === "mingguan" && "1.102"}
                  {period === "bulanan" && "4.780"}
                </td>
                <td className="py-4 px-6 text-rose-600 font-medium">
                  {period === "harian" && "4"}
                  {period === "mingguan" && "28"}
                  {period === "bulanan" && "110"}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    97.8%
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-extrabold text-slate-900">
                  {period === "harian" && "Rp 1.950.000"}
                  {period === "mingguan" && "Rp 12.800.000"}
                  {period === "bulanan" && "Rp 55.500.000"}
                </td>
              </tr>

              {/* Row 4: Es & Segar */}
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    
                    <span>Es & Segar</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Minuman Segar
                </td>
                <td className="py-4 px-6 font-semibold text-slate-900">
                  {period === "harian" && "101"}
                  {period === "mingguan" && "540"}
                  {period === "bulanan" && "2.130"}
                </td>
                <td className="py-4 px-6 text-emerald-600 font-medium">
                  {period === "harian" && "99"}
                  {period === "mingguan" && "520"}
                  {period === "bulanan" && "2.020"}
                </td>
                <td className="py-4 px-6 text-rose-600 font-medium">
                  {period === "harian" && "2"}
                  {period === "mingguan" && "20"}
                  {period === "bulanan" && "110"}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    98.0%
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-extrabold text-slate-900">
                  {period === "harian" && "Rp 1.280.000"}
                  {period === "mingguan" && "Rp 8.050.000"}
                  {period === "bulanan" && "Rp 35.800.000"}
                </td>
              </tr>
            </tbody>

            {/* Total / Summary Footer Row */}
            <tfoot className="bg-slate-50 font-bold text-slate-900 border-t-2 border-gray-200 text-sm">
              <tr>
                <td className="py-4 px-6">
                  TOTAL KANTIN
                </td>
                <td className="py-4 px-6 text-gray-500 font-normal">
                  4 Tenant
                </td>
                <td className="py-4 px-6 font-black text-slate-900">
                  {period === "harian" && "842"}
                  {period === "mingguan" && "5.240"}
                  {period === "bulanan" && "22.850"}
                </td>
                <td className="py-4 px-6 text-emerald-600 font-black">
                  {period === "harian" && "598"}
                  {period === "mingguan" && "5.092"}
                  {period === "bulanan" && "22.180"}
                </td>
                <td className="py-4 px-6 text-rose-600 font-black">
                  {period === "harian" && "26"}
                  {period === "mingguan" && "148"}
                  {period === "bulanan" && "670"}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                    97.2% Rata-rata
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-black text-amber-600 text-base">
                  {period === "harian" && "Rp 10.600.000"}
                  {period === "mingguan" && "Rp 68.450.000"}
                  {period === "bulanan" && "Rp 295.300.000"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
