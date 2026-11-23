"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RubberSegment from "@/components/ui/RubberSegment";

export default function AdminDashboardPage() {
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "90d">("7d");
  const [tenantRows, setTenantRows] = useState<Array<{ id: number; name: string; description: string | null }>>([]);
  const [report, setReport] = useState<{ summary: { ordersCount: number; completedCount: number; cancelledCount: number }; daily: Array<{ date: string; ordersCount: number }>; tenants: Array<{ id: number; name: string; ordersCount: number }> } | null>(null);
  const [anchorDate, setAnchorDate] = useState("2000-01-01");
  const [recentOrders, setRecentOrders] = useState<Array<{ id: number; orderNumber: string; customerName: string | null; tenantName: string | null; total: string | number; status: string | null; createdAt: string | Date | null; items: Array<{ name: string }> }>>([]);

  useEffect(() => {
    fetch("/api/tenants")
      .then(async (response) => {
        if (!response.ok) throw new Error("Gagal memuat tenant");
        const result = await response.json();
        return Array.isArray(result.data) ? result.data : [];
      })
      .then((rows) => setTenantRows(rows))
      .catch(() => setTenantRows([]));
  }, []);

  useEffect(() => {
    const end = new Date();
    const currentDate = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`;
    const start = new Date(end);
    start.setDate(end.getDate() - (chartPeriod === "7d" ? 6 : chartPeriod === "30d" ? 29 : 89));
    const dateParam = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    fetch(`/api/reports?from=${dateParam(start)}&to=${dateParam(end)}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Gagal memuat laporan");
        setAnchorDate(currentDate);
        setReport(result.data);
      })
      .catch(() => setReport(null));
    fetch("/api/orders")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Gagal memuat pesanan");
        setRecentOrders(Array.isArray(result.data) ? result.data.slice(0, 5) : []);
      })
      .catch(() => setRecentOrders([]));
  }, [chartPeriod]);

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
              {report?.summary.ordersCount.toLocaleString("id-ID") ?? "—"}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-emerald-600 font-bold flex items-center">
              {report ? `${report.summary.ordersCount ? Math.round(report.summary.completedCount / report.summary.ordersCount * 100) : 0}%` : "—"}
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
              {report ? Math.max(0, report.summary.ordersCount - report.summary.completedCount - report.summary.cancelledCount).toLocaleString("id-ID") : "—"}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-blue-600 font-bold">
              {report ? `${report.summary.ordersCount ? Math.round(Math.max(0, report.summary.ordersCount - report.summary.completedCount - report.summary.cancelledCount) / report.summary.ordersCount * 100) : 0}%` : "—"}
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
              {report?.summary.completedCount.toLocaleString("id-ID") ?? "—"}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-emerald-600 font-bold">
                {report ? `${report.summary.ordersCount ? Math.round(report.summary.completedCount / report.summary.ordersCount * 100) : 0}%` : "—"}
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
              {report?.summary.cancelledCount.toLocaleString("id-ID") ?? "—"}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-rose-600 font-bold">
                {report ? `${report.summary.ordersCount ? Math.round(report.summary.cancelledCount / report.summary.ordersCount * 100) : 0}%` : "—"}
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
            <RubberSegment
              items={[
                { value: "7d", label: "7 Hari" },
                { value: "30d", label: "30 Hari" },
                { value: "90d", label: "90 Hari" },
              ]}
              value={chartPeriod}
              onChange={(nextValue) =>
                setChartPeriod(nextValue as "7d" | "30d" | "90d")
              }
              trackColor="#f3f4f6"
              thumbColor="#ffffff"
              textColor="#64748b"
              activeTextColor="#0f172a"
              size="sm"
              radius={12}
              inset={3}
              equalSlots
              draggable
              className="self-start sm:self-auto"
            />
          </div>

          {/* Line chart */}
          <div className="mt-6 h-64 w-full">
            {(() => {
              const dailyCounts = new Map<string, number>((report?.daily ?? []).map((day) => [String(day.date).slice(0, 10), day.ordersCount]));
              const groups = chartPeriod === "7d" ? 7 : chartPeriod === "30d" ? 4 : 3;
              const dayCount = chartPeriod === "7d" ? 7 : chartPeriod === "30d" ? 30 : 90;
              const days: Array<{ date: Date; value: number }> = Array.from({ length: dayCount }, (_, index) => {
                const date = new Date(`${anchorDate}T00:00:00`);
                date.setDate(date.getDate() - (dayCount - index - 1));
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                return { date, value: dailyCounts.get(key) ?? 0 };
              });
              const series = Array.from({ length: groups }, (_, index) => {
                const bucket = days.filter((_, dayIndex) => Math.floor(dayIndex * groups / days.length) === index);
                const label = chartPeriod === "7d" ? ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"][bucket[0].date.getDay()] : chartPeriod === "30d" ? `Minggu ${index + 1}` : new Intl.DateTimeFormat("id-ID", { month: "short" }).format(bucket[0].date);
                return { label, value: bucket.reduce((sum, day) => sum + day.value, 0) };
              });
              const maxValue = Math.max(1, ...series.map((point) => point.value)) * 1.15;
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
            <span>Rata-rata pesanan harian: <strong className="text-slate-800">{report ? `${Math.round(report.summary.ordersCount / (chartPeriod === "7d" ? 7 : chartPeriod === "30d" ? 30 : 90)).toLocaleString("id-ID")} pesanan` : "—"}</strong></span>
            <span className="text-gray-400">Ringkasan berdasarkan transaksi database</span>
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
                {tenantRows.length} Tenant
              </span>
            </div>

            <div className="mt-5 space-y-5">
              {tenantRows.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">Belum ada data tenant.</p>
              ) : tenantRows.map((tenant) => (
                <div key={tenant.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-800">{tenant.name}</span>
                    <span className="text-xs text-gray-400">{report?.tenants.find((row) => row.id === tenant.id)?.ordersCount ?? 0} pesanan</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div style={{ width: `${Math.min(100, (report?.summary.ordersCount ? (report.tenants.find((row) => row.id === tenant.id)?.ordersCount ?? 0) / report.summary.ordersCount * 100 : 0))}%` }} className="h-full rounded-full bg-amber-500" />
                  </div>
                </div>
              ))}
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

      {/* Tenant Aktif Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tenant Aktif</h2>
            <p className="text-xs text-gray-500">Status tenant dari database</p>
          </div>
          <Link href="/admin/tenant" className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline">
            Lihat Semua Tenant &rarr;
          </Link>
        </div>
        {tenantRows.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">Belum ada tenant di database.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tenantRows.map((tenant) => (
              <article key={tenant.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-2xl">🏪</div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">Aktif</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{tenant.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">{tenant.description || ""}</p>
              </article>
            ))}
          </div>
        )}
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
              {recentOrders.length ? recentOrders.map((order) => <tr key={order.id}>
                <td className="px-6 py-4 font-semibold">{order.orderNumber}</td><td className="px-6 py-4">{order.customerName || "—"}</td><td className="px-6 py-4">{order.tenantName || "—"}</td><td className="px-6 py-4">{order.items[0]?.name || "—"}</td><td className="px-6 py-4">Rp {Number(order.total).toLocaleString("id-ID")}</td><td className="px-6 py-4">{order.status || "—"}</td><td className="px-6 py-4 text-right">{order.createdAt ? new Date(order.createdAt).toLocaleString("id-ID") : "—"}</td>
              </tr>) : <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">Belum ada data pesanan di database.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
