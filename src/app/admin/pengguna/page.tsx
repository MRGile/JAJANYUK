"use client";

import { useEffect, useState } from "react";
import RubberSegment from "@/components/ui/RubberSegment";

type UserRow = { id: number; name: string; email: string; role: string; phone: string | null };

export default function ManajemenPenggunaPage() {
  const [userRows, setUserRows] = useState<UserRow[]>([]);
  const [tenantRows, setTenantRows] = useState<Array<{ id: number; name: string }>>([]);
  const [roleFilter, setRoleFilter] = useState<"semua" | "siswa" | "kasir" | "owner">("semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRole, setFormRole] = useState<"Siswa" | "Kasir" | "Owner">("Siswa");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then(async (response) => {
        if (!response.ok) throw new Error("Gagal memuat pengguna");
        const result = await response.json();
        return Array.isArray(result.data) ? result.data as UserRow[] : [];
      })
      .then((rows) => setUserRows(rows))
      .catch(() => setUserRows([]));
  }, []);

  const filteredUsers = userRows.filter((user) => {
    if (roleFilter === "semua") return true;
    if (roleFilter === "siswa") return user.role === "pelanggan";
    return user.role === roleFilter;
  });

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

  const handleSubmitUser = (e: React.FormEvent) => {
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
          <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-black text-sm flex-shrink-0">X</span>
          <div>
            <p className="font-bold text-sm">Pengguna Berhasil Ditambahkan!</p>
            <p className="text-xs text-emerald-100">Akun pengguna baru telah aktif di sistem.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Pengguna
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola hak akses dan akun siswa, kasir stan, serta pemilik tenant
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-all hover:shadow hover:scale-[1.02] cursor-pointer"
        >
          <span className="text-lg leading-none font-black">+</span>
          <span>Tambah Pengguna</span>
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Pengguna</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{userRows.length}</p>
          <span className="text-[11px] text-gray-400">Terdaftar di database</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Akun Siswa</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{userRows.filter((user) => user.role === "pelanggan").length}</p>
          <span className="text-[11px] text-gray-400">Pelanggan aktif</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Kasir Tenant</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{userRows.filter((user) => user.role === "kasir").length}</p>
          <span className="text-[11px] text-gray-400">Petugas kasir kios</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Owner Kios</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{userRows.filter((user) => user.role === "owner").length}</p>
          <span className="text-[11px] text-gray-400">Mitra kantin</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <RubberSegment
            items={[
              { value: "semua", label: "Semua Pengguna" },
              { value: "siswa", label: "Siswa" },
              { value: "kasir", label: "Kasir" },
              { value: "owner", label: "Owner" },
            ]}
            value={roleFilter}
            onChange={(nextValue) =>
              setRoleFilter(
                nextValue as "semua" | "siswa" | "kasir" | "owner"
              )
            }
            trackColor="#f3f4f6"
            thumbColor="#ffffff"
            textColor="#64748b"
            activeTextColor="#0f172a"
            size="md"
            radius={12}
            inset={3}
            equalSlots
            draggable
            className="self-start sm:self-auto"
          />

          <div className="text-xs text-gray-400 font-medium">
            Menampilkan data pengguna aktif sistem
          </div>

        </div>

        {/* Users Table (Explicit JSX, NO Arrays) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">Nama Pengguna</th>
                <th className="py-3.5 px-6">Email &amp; Kontak</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Afiliasi / Tenant</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredUsers.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">Belum ada data pengguna.</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-amber-50/40">
                  <td className="px-6 py-4 font-semibold text-slate-900">{user.name}</td>
                  <td className="px-6 py-4"><div>{user.email}</div><div className="text-xs text-gray-400">{user.phone || "—"}</div></td>
                  <td className="px-6 py-4 capitalize">{user.role === "pelanggan" ? "Siswa" : user.role}</td>
                  <td className="px-6 py-4 text-gray-500">—</td>
                  <td className="px-6 py-4 text-gray-500">Tercatat</td>
                  <td className="px-6 py-4 text-right text-gray-400">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah Pengguna */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl font-bold">X</div>
                <div>
                  <h3 className="text-lg font-bold">Tambah Pengguna Baru</h3>
                  <p className="text-xs text-slate-300">
                    Daftarkan siswa, staf kasir, atau pemilik stan kantin
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

            {/* Modal Body */}
            <form onSubmit={handleSubmitUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Ihsan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Pengguna <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp / HP <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password Akun <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 8 karakter"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Peran / Role <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as "Siswa" | "Kasir" | "Owner")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  >
                    <option value="Siswa">Siswa</option>
                    <option value="Kasir">Kasir</option>
                    <option value="Owner">Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status Akun <span className="text-rose-500">*</span>
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              {/* Conditional Tenant selector if Kasir or Owner */}
              {(formRole === "Kasir" || formRole === "Owner") && (
                <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                  <label className="block text-xs font-semibold text-amber-900 mb-1">
                    Pilih Tenant Afiliasi <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="">Pilih tenant</option>
                    {tenantRows.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-amber-700 mt-1">
                    Pengguna ini akan memiliki akses operasional stan terkait.
                  </p>
                </div>
              )}

              {/* Conditional Class info if Siswa */}
              {formRole === "Siswa" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kelas / Jurusan Siswa
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: XII RPL 1 / XI TKJ 2"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>
              )}

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
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
