"use client";

import { useState } from "react";

const adminData = {
  namaLengkap: "Admin Kantin",
  nip: "198801012015011001",
  idAdmin: "ADM-001",
  role: "Super Administrator",
  status: "Aktif",
  jenisKelamin: "Laki-laki",
  agama: "Islam",
  tanggalLahir: "01 Januari 1988",
  noHp: "0812-3456-7890",
  email: "admin@jajanyuk.com",
  alamat: "Jl. Kantin Utama No. 1, Jakarta Selatan",
  unitKerja: "Kantin JajanYuk",
  bergabungSejak: "01 Januari 2024",
};

export default function ProfilAdminPage() {
  const [activeTab, setActiveTab] = useState<"info" | "keamanan">("info");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // form state (edit modal)
  const [form, setForm] = useState({
    namaLengkap: adminData.namaLengkap,
    agama: adminData.agama,
    tanggalLahir: "1988-01-01",
    noHp: adminData.noHp,
    email: adminData.email,
    alamat: adminData.alamat,
  });

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    triggerToast("Profil berhasil diperbarui!");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPasswordForm(false);
    triggerToast("Kata sandi berhasil diubah!");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
          <span className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-black text-sm shrink-0">✓</span>
          <div>
            <p className="font-bold text-sm">{toastMsg}</p>
            <p className="text-xs text-emerald-100">Perubahan telah tersimpan ke sistem.</p>
          </div>
        </div>
      )}

      {/* ── HERO BANNER ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
        {/* decorative pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage:"radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 40%)"}} />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6">
          {/* Left: avatar + info */}
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg shadow-amber-500/30">
                AD
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>

            {/* Name + meta */}
            <div>
              <p className="text-slate-400 text-xs font-medium mb-0.5">Administrator · JajanYuk</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {adminData.namaLengkap}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                  Super Admin
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  ● Aktif
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  ID: {adminData.idAdmin}
                </span>
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
              Perbarui Data
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="relative px-6 flex gap-1 border-t border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "info"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Informasi Profil
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("keamanan")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "keamanan"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Keamanan Akun
          </button>
        </div>
      </div>

      {/* ── TAB: INFORMASI PROFIL ── */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Card: Data Akun */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Data Akun</h2>
                <p className="text-[11px] text-gray-400">Hanya baca</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 font-medium mb-1">ID Admin</p>
                <p className="text-sm font-bold text-slate-900 font-mono">{adminData.idAdmin}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 font-medium mb-1">NIP</p>
                <p className="text-sm font-bold text-slate-900 font-mono">{adminData.nip}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 font-medium mb-1">Role / Peran</p>
                <span className="inline-flex items-center text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {adminData.role}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 font-medium mb-1">Status Akun</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ● {adminData.status}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 font-medium mb-1">Unit Kerja</p>
                <p className="text-sm font-semibold text-slate-800">{adminData.unitKerja}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 font-medium mb-1">Bergabung Sejak</p>
                <p className="text-sm font-semibold text-slate-800">{adminData.bergabungSejak}</p>
              </div>
            </div>
          </div>

          {/* Card: Data Pribadi */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              </div>
              <h2 className="text-sm font-bold text-slate-900">Data Pribadi</h2>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-xs w-32 shrink-0 pt-0.5 font-medium">Jenis Kelamin</span>
                <span className="text-sm font-semibold text-slate-800">{adminData.jenisKelamin}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-xs w-32 shrink-0 pt-0.5 font-medium">Agama</span>
                <span className="text-sm font-semibold text-slate-800">{adminData.agama}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-xs w-32 shrink-0 pt-0.5 font-medium">Tanggal Lahir</span>
                <span className="text-sm font-semibold text-slate-800">{adminData.tanggalLahir}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-xs w-32 shrink-0 pt-0.5 font-medium">No. HP</span>
                <span className="text-sm font-semibold text-slate-800">{adminData.noHp}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-xs w-32 shrink-0 pt-0.5 font-medium">Email</span>
                <span className="text-sm font-semibold text-amber-600 break-all">{adminData.email}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-xs w-32 shrink-0 pt-0.5 font-medium">Alamat</span>
                <span className="text-sm font-semibold text-slate-800 leading-relaxed">{adminData.alamat}</span>
              </div>
            </div>
          </div>

          {/* Card: Statistik Aktivitas */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              </div>
              <h2 className="text-sm font-bold text-slate-900">Ringkasan Aktivitas Admin</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Total Pengguna Dikelola", value: "1.284", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                { label: "Total Tenant Aktif", value: "4 Kios", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
                { label: "Pesanan Hari Ini", value: "842", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                { label: "Akun Dibuat Bulan Ini", value: "32", color: "text-slate-700", bg: "bg-gray-50", border: "border-gray-100" },
              ].map((item) => (
                <div key={item.label} className={`${item.bg} border ${item.border} rounded-xl p-4`}>
                  <p className="text-[11px] text-gray-500 font-medium mb-1.5 leading-snug">{item.label}</p>
                  <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: KEAMANAN AKUN ── */}
      {activeTab === "keamanan" && (
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

          {/* Card: Email Login */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <h2 className="text-sm font-bold text-slate-900">Email Login</h2>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-gray-400 font-medium mb-0.5">Alamat Email Aktif</p>
                <p className="text-sm font-semibold text-slate-800">{adminData.email}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                ● Terverifikasi
              </span>
            </div>
          </div>

          {/* Card: Kata Sandi */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                </div>
                <h2 className="text-sm font-bold text-slate-900">Kata Sandi</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {showPasswordForm ? "Batal" : "Ubah"}
              </button>
            </div>

            {!showPasswordForm ? (
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-gray-400 text-lg tracking-widest">••••••••</span>
                <span className="text-[11px] text-gray-400 font-medium">Terakhir diubah: 01 Jan 2024</span>
              </div>
            ) : (
              <form onSubmit={handleSavePassword} className="space-y-4">
                {[
                  { label: "Kata Sandi Lama", show: showOldPass, toggle: () => setShowOldPass(!showOldPass) },
                  { label: "Kata Sandi Baru", show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                  { label: "Konfirmasi Kata Sandi Baru", show: showConfirmPass, toggle: () => setShowConfirmPass(!showConfirmPass) },
                ].map((item) => (
                  <div key={item.label}>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {item.label} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={item.show ? "text" : "password"}
                        required
                        minLength={8}
                        placeholder="Minimal 8 karakter"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={item.toggle}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-700"
                      >
                        {item.show ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowPasswordForm(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-slate-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                    Batal
                  </button>
                  <button type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-sm cursor-pointer transition-all">
                    Simpan Kata Sandi
                  </button>
                </div>
              </form>
            )}
          </div>


        </div>
      )}

      {/* ── MODAL PERBARUI DATA ── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl my-8 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                </div>
                <div>
                  <h3 className="text-base font-bold">Perbarui Data</h3>
                  <p className="text-xs text-slate-400">Edit informasi pribadi akun admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/10 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                aria-label="Tutup"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={form.namaLengkap}
                  onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Agama <span className="text-rose-500">*</span></label>
                  <select
                    value={form.agama}
                    onChange={(e) => setForm({ ...form, agama: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {["Islam","Kristen","Katolik","Hindu","Buddha","Konghucu"].map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Lahir <span className="text-rose-500">*</span></label>
                  <input
                    type="date"
                    value={form.tanggalLahir}
                    onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. HP <span className="text-rose-500">*</span></label>
                  <input
                    type="tel"
                    value={form.noHp}
                    onChange={(e) => setForm({ ...form, noHp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    value={form.alamat}
                    onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              {/* Readonly section */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <p className="text-[11px] font-bold text-amber-700 mb-3 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  Data Akun (hanya baca)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "ID Admin", value: adminData.idAdmin },
                    { label: "NIP", value: adminData.nip },
                    { label: "Role", value: adminData.role },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] text-amber-700 font-semibold mb-1">{item.label}</p>
                      <input
                        type="text"
                        value={item.value}
                        readOnly
                        className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs bg-white/60 text-slate-600 cursor-not-allowed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-slate-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  ✓ Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
