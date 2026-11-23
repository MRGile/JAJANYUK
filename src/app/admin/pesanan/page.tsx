"use client";

import { useState } from "react";
import { JollySelect } from "@/components/ui/select";
import RubberSegment from "@/components/ui/RubberSegment";
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
      <div className="min-w-0 max-w-full overflow-x-auto self-start">
        <RubberSegment
          items={[
            { value: "semua", label: "Semua Pesanan" },
            { value: "menunggu", label: "Menunggu (2)" },
            { value: "diproses", label: "Diproses (2)" },
            { value: "selesai", label: "Selesai (4)" },
            { value: "dibatalkan", label: "Dibatalkan (1)" },
          ]}
          value={statusFilter}
          onChange={(nextValue) =>
            setStatusFilter(
              nextValue as
                | "semua"
                | "menunggu"
                | "diproses"
                | "selesai"
                | "dibatalkan"
            )
          }
          trackColor="#f3f4f6"
          thumbColor="#ffffff"
          textColor="#64748b"
          activeTextColor="#0f172a"
          size="sm"
          radius={12}
          inset={3}
          equalSlots={false}
          draggable
          className="w-max"
        />
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
              <tr><td colSpan={8} className="px-6 py-10 text-center text-sm text-gray-500">Belum ada data.</td></tr>
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
                     Tenant (Blok A-01)
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
                    <strong className="font-semibold">—</strong>
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
                    <span className="font-semibold">Rp 0</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800">
                    <span>1x Curly Fries Extra Cheese</span>
                    <span className="font-semibold">Rp 0</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-slate-500 text-[11px]">
                    <span>Biaya Layanan Admin</span>
                    <span>Rp 0</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-black text-slate-900">
                    <span>Total Pembayaran</span>
                    <span className="text-amber-600 text-base">Rp 0</span>
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
