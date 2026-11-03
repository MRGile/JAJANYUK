"use client";

import { useState } from "react";

export default function ManajemenPenggunaPage() {
  const [roleFilter, setRoleFilter] = useState<"semua" | "siswa" | "kasir" | "owner">("semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRole, setFormRole] = useState<"Siswa" | "Kasir" | "Owner">("Siswa");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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
          <p className="text-2xl font-black text-slate-900 mt-1">1.284</p>
          <span className="text-[11px] text-gray-400">Terdaftar di database</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Akun Siswa</span>
          <p className="text-2xl font-black text-blue-600 mt-1">1.265</p>
          <span className="text-[11px] text-gray-400">Pelanggan aktif</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Kasir Tenant</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">8</p>
          <span className="text-[11px] text-gray-400">Petugas kasir kios</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase">Owner Kios</span>
          <p className="text-2xl font-black text-amber-600 mt-1">4</p>
          <span className="text-[11px] text-gray-400">Mitra kantin</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRoleFilter("semua")}
              className={`px-4 py-2 rounded-lg transition-all ${
                roleFilter === "semua"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
              Semua Pengguna
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter("siswa")}
              className={`px-4 py-2 rounded-lg transition-all ${
                roleFilter === "siswa"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
               Siswa
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter("kasir")}
              className={`px-4 py-2 rounded-lg transition-all ${
                roleFilter === "kasir"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
               Kasir
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter("owner")}
              className={`px-4 py-2 rounded-lg transition-all ${
                roleFilter === "owner"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
               Owner
            </button>
          </div>

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
              {/* User 1: Farhan Mahendra (Siswa) */}
              {(roleFilter === "semua" || roleFilter === "siswa") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        FM
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Farhan Mahendra</div>
                        <div className="text-xs text-gray-400">NISN: 0064829102</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">farhan.m@student.id</div>
                    <div className="text-xs text-gray-400">0812-9988-1234</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                       Siswa
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Kelas XII RPL 1
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 2: Alya Putri (Siswa) */}
              {(roleFilter === "semua" || roleFilter === "siswa") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-xs">
                        AP
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Alya Putri</div>
                        <div className="text-xs text-gray-400">NISN: 0075192841</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">alya.p@student.id</div>
                    <div className="text-xs text-gray-400">0857-4433-2211</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                       Siswa
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Kelas XI MM 2
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 3: Kevin Sanjaya (Siswa Nonaktif) */}
              {(roleFilter === "semua" || roleFilter === "siswa") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center text-xs">
                        KS
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Kevin Sanjaya</div>
                        <div className="text-xs text-gray-400">NISN: 0081298402</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">kevin.s@student.id</div>
                    <div className="text-xs text-gray-400">0899-7788-9900</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                       Siswa
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Kelas X TKJ 1
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      Nonaktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 4: Rina Melati (Kasir Burger Bites) */}
              {(roleFilter === "semua" || roleFilter === "kasir") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        RM
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Rina Melati</div>
                        <div className="text-xs text-gray-400">Staf Kasir</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">rina@burgerbites.com</div>
                    <div className="text-xs text-gray-400">0812-4455-6677</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                       Kasir
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800"> Burger Bites</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 5: Joko Prasetyo (Kasir Mie Berkah) */}
              {(roleFilter === "semua" || roleFilter === "kasir") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        JP
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Joko Prasetyo</div>
                        <div className="text-xs text-gray-400">Staf Kasir</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">joko@mieberkah.com</div>
                    <div className="text-xs text-gray-400">0813-8899-0011</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                       Kasir
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800"> Mie Berkah</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 6: Budi Santoso (Owner Burger Bites) */}
              {(roleFilter === "semua" || roleFilter === "owner") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                        BS
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Budi Santoso</div>
                        <div className="text-xs text-gray-400">Pemilik Usaha</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">budi@burgerbites.com</div>
                    <div className="text-xs text-gray-400">0812-3456-7890</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                       Owner
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800"> Burger Bites</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 7: Ibu Wahyuni (Owner Mie Berkah) */}
              {(roleFilter === "semua" || roleFilter === "owner") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                        IW
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Ibu Wahyuni</div>
                        <div className="text-xs text-gray-400">Pemilik Usaha</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">wahyuni@mieberkah.com</div>
                    <div className="text-xs text-gray-400">0813-7890-1234</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                       Owner
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800"> Mie Berkah</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 8: Hendra Wijaya (Owner Snack Corner) */}
              {(roleFilter === "semua" || roleFilter === "owner") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                        HW
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Hendra Wijaya</div>
                        <div className="text-xs text-gray-400">Pemilik Usaha</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">hendra@snackcorner.com</div>
                    <div className="text-xs text-gray-400">0856-1122-3344</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                       Owner
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800"> Snack Corner</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 9: Doni Saputra (Kasir Es & Segar) */}
              {(roleFilter === "semua" || roleFilter === "kasir") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        DS
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Doni Saputra</div>
                        <div className="text-xs text-gray-400">Staf Kasir</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">doni@essegar.com</div>
                    <div className="text-xs text-gray-400">0877-3322-1100</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                       Kasir
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800"> Es &amp; Segar</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )}

              {/* User 10: Putri Anggraini (Siswa) */}
              {(roleFilter === "semua" || roleFilter === "siswa") && (
                <tr className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                        PA
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Putri Anggraini</div>
                        <div className="text-xs text-gray-400">NISN: 0069921473</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800">putri.a@student.id</div>
                    <div className="text-xs text-gray-400">0819-2233-4455</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                       Siswa
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Kelas XII OTKP 3
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline px-2 py-1"
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
                    <option value="Burger Bites"> Burger Bites (Blok A-01)</option>
                    <option value="Mie Berkah"> Mie Berkah (Blok A-02)</option>
                    <option value="Snack Corner"> Snack Corner (Blok B-01)</option>
                    <option value="Es & Segar"> Es &amp; Segar (Blok B-02)</option>
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
