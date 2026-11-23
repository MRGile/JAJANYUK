"use client";

import { useEffect, useState } from "react";
import RubberSegment from "@/components/ui/RubberSegment";

type ReportData = {
  summary: { ordersCount: number; completedCount: number; cancelledCount: number; revenue: number; profit: number };
  daily: Array<{ date: string; ordersCount: number; revenue: number }>;
  tenants: Array<{ id: number; name: string; ordersCount: number; completedCount: number; cancelledCount: number; revenue: number }>;
};

function toDateParam(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function LaporanStatistikPage() {
  const [period, setPeriod] = useState<
  "harian" | "mingguan" | "bulanan"
>("harian");
  const [report, setReport] = useState<ReportData | null>(null);
  const [reportError, setReportError] = useState("");

  useEffect(() => {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - (period === "harian" ? 0 : period === "mingguan" ? 6 : 29));
    const query = new URLSearchParams({ from: toDateParam(start), to: toDateParam(end) });

    fetch(`/api/reports?${query}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Gagal memuat laporan.");
        return result.data as ReportData;
      })
      .then((data) => { setReport(data); setReportError(""); })
      .catch((error: unknown) => {
        setReport(null);
        setReportError(error instanceof Error ? error.message : "Gagal memuat laporan.");
      });
  }, [period]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
  const tenantRevenue = report?.tenants.reduce((sum, tenant) => sum + tenant.revenue, 0) ?? 0;

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
        <div className="flex items-center gap-3 min-w-0">
          <div className="min-w-0 max-w-full overflow-x-auto">
            <RubberSegment
              items={[
                { value: "harian", label: "Harian (Hari Ini)" },
                { value: "mingguan", label: "Mingguan (7 Hari)" },
                { value: "bulanan", label: "Bulanan (30 Hari)" },
              ]}
              value={period}
              onChange={(nextValue) =>
                setPeriod(
                  nextValue as "harian" | "mingguan" | "bulanan"
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
              {report?.summary.ordersCount.toLocaleString("id-ID") ?? "—"}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {reportError || "Jumlah pesanan dalam periode terpilih"}
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
              {report?.summary.completedCount.toLocaleString("id-ID") ?? "—"}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {report ? `${report.summary.ordersCount ? Math.round(report.summary.completedCount / report.summary.ordersCount * 100) : 0}% selesai` : "Menunggu data dari database"}
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
              {report?.summary.cancelledCount.toLocaleString("id-ID") ?? "—"}
            </div>
            <p className="text-xs text-rose-600 font-semibold mt-1">
              {report ? `${report.summary.ordersCount ? Math.round(report.summary.cancelledCount / report.summary.ordersCount * 100) : 0}% dibatalkan` : "Menunggu data dari database"}
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
              {report ? formatCurrency(report.summary.revenue) : "—"}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {report ? `Laba kotor ${formatCurrency(report.summary.profit)}` : reportError || "Menunggu data dari database"}
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

        {/* Database-backed horizontal comparison bars */}
        <div className="mt-6 space-y-6">
          {!report && !reportError ? (
            <p className="py-8 text-center text-sm text-gray-500">Memuat data laporan...</p>
          ) : reportError ? (
            <p className="py-8 text-center text-sm text-rose-600">{reportError}</p>
          ) : report?.tenants.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">Belum ada data tenant pada periode ini.</p>
          ) : report?.tenants.map((tenant) => {
            const share = tenantRevenue ? Math.round(tenant.revenue / tenantRevenue * 100) : 0;
            return (
              <div key={tenant.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold text-slate-900">{tenant.name}</span>
                  <span className="text-right text-xs font-semibold text-slate-600">{formatCurrency(tenant.revenue)} · {share}%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100 p-0.5">
                  <div style={{ width: `${share}%` }} className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500" />
                </div>
              </div>
            );
          })}
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
            {report ? "Data dari database" : "Menunggu data database"}
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
              {!report && !reportError ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">Memuat data laporan...</td></tr>
              ) : reportError ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-rose-600">{reportError}</td></tr>
              ) : report?.tenants.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">Belum ada data tenant pada periode ini.</td></tr>
              ) : report?.tenants.map((tenant) => {
                const successRate = tenant.ordersCount ? Math.round(tenant.completedCount / tenant.ordersCount * 100) : 0;
                return (
                  <tr key={tenant.id} className="hover:bg-amber-50/40">
                    <td className="px-6 py-4 font-bold text-slate-900">{tenant.name}</td>
                    <td className="px-6 py-4 text-slate-600">—</td>
                    <td className="px-6 py-4 font-semibold">{tenant.ordersCount.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 font-medium text-emerald-600">{tenant.completedCount.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 font-medium text-rose-600">{tenant.cancelledCount.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4"><span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">{successRate}%</span></td>
                    <td className="px-6 py-4 text-right font-extrabold text-slate-900">{formatCurrency(tenant.revenue)}</td>
                  </tr>
                );
              })}
            </tbody>

            {/* Total / Summary Footer Row */}
            <tfoot className="bg-slate-50 font-bold text-slate-900 border-t-2 border-gray-200 text-sm">
              <tr>
                <td className="py-4 px-6">
                  TOTAL KANTIN
                </td>
                <td className="py-4 px-6 text-gray-500 font-normal">
                  {report?.tenants.length ?? "—"} Tenant
                </td>
                <td className="py-4 px-6 font-black text-slate-900">
                  {report?.summary.ordersCount.toLocaleString("id-ID") ?? "—"}
                </td>
                <td className="py-4 px-6 text-emerald-600 font-black">
                  {report?.summary.completedCount.toLocaleString("id-ID") ?? "—"}
                </td>
                <td className="py-4 px-6 text-rose-600 font-black">
                  {report?.summary.cancelledCount.toLocaleString("id-ID") ?? "—"}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                    {report ? `${report.summary.ordersCount ? Math.round(report.summary.completedCount / report.summary.ordersCount * 100) : 0}% rata-rata` : "—"}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-black text-amber-600 text-base">
                  {report ? formatCurrency(report.summary.revenue) : "—"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
