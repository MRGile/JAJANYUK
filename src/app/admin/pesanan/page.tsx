"use client";

import { useState } from "react";

export default function ManajemenPesananPage() {
  const [statusFilter, setStatusFilter] = useState<"semua" | "menunggu" | "diproses" | "selesai" | "dibatalkan">("semua");
  const [tenantFilter, setTenantFilter] = useState<"semua" | "burger" | "mie" | "snack" | "es">("semua");
  const [activeModalOrderId, setActiveModalOrderId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Pesanan
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pantau dan tinjau seluruh transaksi antrean pesanan makanan kantin secara langsung
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            
            <span>Live Sinkronisasi Aktif</span>
          </div>
        </div>
      </div>

      {/* Filter and Controls Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="inline-flex flex-wrap p-1 bg-gray-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter("semua")}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                statusFilter === "semua"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
              Semua Pesanan
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("menunggu")}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                statusFilter === "menunggu"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
               Menunggu (2)
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("diproses")}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                statusFilter === "diproses"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
               Diproses (2)
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("selesai")}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                statusFilter === "selesai"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
               Selesai (4)
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("dibatalkan")}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                statusFilter === "dibatalkan"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
               Dibatalkan (1)
            </button>
          </div>

          {/* Tenant Filter Dropdown */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="text-xs font-semibold text-gray-500">Filter Tenant:</span>
            <select
              value={tenantFilter}
              onChange={(e) =>
                setTenantFilter(
                  e.target.value as "semua" | "burger" | "mie" | "snack" | "es"
                )
              }
              className="text-xs font-semibold bg-gray-50 border border-gray-300 text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="semua">Semua Tenant Kios</option>
              <option value="burger"> Burger Bites</option>
              <option value="mie"> Mie Berkah</option>
              <option value="snack"> Snack Corner</option>
              <option value="es"> Es & Segar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table (Explicit JSX, NO Arrays) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">No. Pesanan</th>
                <th className="py-3.5 px-6">Tenant</th>
                <th className="py-3.5 px-6">Pelanggan</th>
                <th className="py-3.5 px-6">Rincian Menu</th>
                <th className="py-3.5 px-6">Total Bayar</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Waktu</th>
                <th className="py-3.5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {/* Order 1: ORD-0842 (Burger Bites / Diproses) */}
              {(statusFilter === "semua" || statusFilter === "diproses") &&
                (tenantFilter === "semua" || tenantFilter === "burger") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0842
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Burger Bites
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Ahmad Fauzi</div>
                      <div className="text-xs text-gray-400">0812-9988-1234</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      2x Double Beef Burger + 1x Fries
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 65.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        
                        Diproses
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:42 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0842")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 2: ORD-0841 (Mie Berkah / Menunggu) */}
              {(statusFilter === "semua" || statusFilter === "menunggu") &&
                (tenantFilter === "semua" || tenantFilter === "mie") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0841
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Mie Berkah
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Siti Rahma</div>
                      <div className="text-xs text-gray-400">0857-4433-2211</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      1x Mie Ayam Komplit + 1x Pangsit Goreng
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 28.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        Menunggu
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:39 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0841")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 3: ORD-0840 (Es & Segar / Selesai) */}
              {(statusFilter === "semua" || statusFilter === "selesai") &&
                (tenantFilter === "semua" || tenantFilter === "es") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0840
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Es & Segar
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Dimas Pratama</div>
                      <div className="text-xs text-gray-400">0899-7788-9900</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      2x Es Teh Jumbo + 1x Jus Alpukat
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 24.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Selesai
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:35 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0840")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 4: ORD-0839 (Snack Corner / Selesai) */}
              {(statusFilter === "semua" || statusFilter === "selesai") &&
                (tenantFilter === "semua" || tenantFilter === "snack") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0839
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Snack Corner
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Nabila Putri</div>
                      <div className="text-xs text-gray-400">0819-2233-4455</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      3x Risol Mayo + 2x Pastel Ayam
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 25.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Selesai
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:30 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0839")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 5: ORD-0838 (Burger Bites / Dibatalkan) */}
              {(statusFilter === "semua" || statusFilter === "dibatalkan") &&
                (tenantFilter === "semua" || tenantFilter === "burger") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0838
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Burger Bites
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Rizky Kurniawan</div>
                      <div className="text-xs text-gray-400">0812-7711-2233</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      1x Crispy Chicken Burger Combo
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 32.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        Dibatalkan
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:22 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0838")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 6: ORD-0837 (Mie Berkah / Selesai) */}
              {(statusFilter === "semua" || statusFilter === "selesai") &&
                (tenantFilter === "semua" || tenantFilter === "mie") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0837
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Mie Berkah
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Maya Lestari</div>
                      <div className="text-xs text-gray-400">0856-3344-5566</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      2x Bakso Urat Kuah Pedas + Es Teh
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 42.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Selesai
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:15 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0837")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 7: ORD-0836 (Snack Corner / Diproses) */}
              {(statusFilter === "semua" || statusFilter === "diproses") &&
                (tenantFilter === "semua" || tenantFilter === "snack") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0836
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Snack Corner
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Bagus Tri</div>
                      <div className="text-xs text-gray-400">0813-1122-8899</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      4x Tahu Walik + 1x Tempe Mendoan
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 20.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        
                        Diproses
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:10 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0836")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 8: ORD-0835 (Es & Segar / Menunggu) */}
              {(statusFilter === "semua" || statusFilter === "menunggu") &&
                (tenantFilter === "semua" || tenantFilter === "es") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0835
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Es & Segar
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">Citra Kirana</div>
                      <div className="text-xs text-gray-400">0821-4455-7788</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      2x Es Cincau Susu Gula Aren
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 20.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        Menunggu
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      13:05 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0835")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}

              {/* Order 9: ORD-0834 (Burger Bites / Selesai) */}
              {(statusFilter === "semua" || statusFilter === "selesai") &&
                (tenantFilter === "semua" || tenantFilter === "burger") && (
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #ORD-0834
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                         Burger Bites
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">David Pratama</div>
                      <div className="text-xs text-gray-400">0877-6655-4433</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-slate-600 truncate">
                      1x Triple Bacon Burger + Cola
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      Rp 48.000
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Selesai
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      12:55 WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveModalOrderId("ORD-0834")}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {activeModalOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                  Detail Transaksi Kantin
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  #{activeModalOrderId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalOrderId(null)}
                className="text-slate-400 hover:text-white text-xl p-1 rounded-lg"
              >
                X
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Status & Tenant Banner */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <span className="text-xs text-gray-400 block">Stan Tenant</span>
                  <span className="text-sm font-bold text-slate-900">
                     Burger Bites (Blok A-01)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Status Pesanan</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Diproses
                  </span>
                </div>
              </div>

              {/* Pelanggan Info */}
              <div className="text-xs space-y-1">
                <span className="font-bold text-gray-400 uppercase tracking-wider block">
                  Informasi Pemesan
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-800 pt-1">
                  <div>
                    <span className="text-gray-400 block">Nama:</span>
                    <strong className="font-semibold">Ahmad Fauzi</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">WhatsApp:</span>
                    <strong className="font-semibold">0812-9988-1234</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Metode Pembayaran:</span>
                    <span className="inline-block bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      QRIS JajanYuk
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Waktu Pesan:</span>
                    <span className="font-semibold">13:42 WIB</span>
                  </div>
                </div>
              </div>

              {/* Item Breakdown */}
              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Daftar Pesanan
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-800">
                    <span>2x Double Beef Cheese Burger</span>
                    <span className="font-semibold">Rp 50.000</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800">
                    <span>1x Curly Fries Extra Cheese</span>
                    <span className="font-semibold">Rp 15.000</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-slate-500 text-[11px]">
                    <span>Biaya Layanan Admin</span>
                    <span>Rp 0</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-black text-slate-900">
                    <span>Total Pembayaran</span>
                    <span className="text-amber-600 text-base">Rp 65.000</span>
                  </div>
                </div>
              </div>

              {/* Catatan Khusus */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block">Catatan Pesanan:</span>
                <p className="text-amber-800 mt-0.5">
                  &ldquo;Tolong saus sambalnya dipisah ya min, terima kasih.&rdquo;
                </p>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalOrderId(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-slate-700 font-semibold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  X
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Cetak struk #${activeModalOrderId} berhasil!`);
                    setActiveModalOrderId(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>️</span>
                  <span>Cetak Struk Pesanan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
