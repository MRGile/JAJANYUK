
"use client";

import Link from "next/link";
import { kasirAktif } from "../config";

export default function ProfilKasirPage() {
  const initials = kasirAktif.nama
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin keluar dari halaman kasir?"
    );

    if (yakin) {
      alert("Fitur logout akan diaktifkan setelah sistem autentikasi dibuat.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-6 pb-28 sm:px-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-7">
          <p className="text-sm text-[#A18B78]">
            JajanYuk / Profil
          </p>

          <h1 className="mt-2 text-2xl font-extrabold text-[#493326] sm:text-3xl">
            Profil Kasir
          </h1>

          <p className="mt-2 text-sm text-[#A18B78]">
            Informasi akun dan tenant yang sedang kamu kelola.
          </p>
        </div>

        {/* Kartu Profil */}
        <section className="overflow-hidden rounded-2xl border border-[#EFE5D9] bg-white">
          <div className="bg-[#493326] px-6 py-8 text-white sm:px-8">
            <p className="text-sm text-[#E5CDB8]">
              Akun Kasir JajanYuk
            </p>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E99557] text-2xl font-extrabold text-white">
                {initials}
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {kasirAktif.nama}
                </h2>

                <p className="mt-1 text-sm text-[#E5CDB8]">
                  ID: {kasirAktif.id}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  Akun Kasir Aktif
                </span>
              </div>
            </div>
          </div>

          {/* Informasi Akun */}
          <div className="p-5 sm:p-8">
            <h3 className="mb-5 font-bold text-[#493326]">
              Informasi Akun
            </h3>

            <div className="space-y-5">
              <div className="flex flex-col justify-between gap-1 border-b border-[#F3ECE4] pb-4 sm:flex-row">
                <p className="text-sm text-[#A18B78]">
                  Nama Kasir
                </p>
                <p className="text-sm font-semibold text-[#493326]">
                  {kasirAktif.nama}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-1 border-b border-[#F3ECE4] pb-4 sm:flex-row">
                <p className="text-sm text-[#A18B78]">
                  ID Kasir
                </p>
                <p className="text-sm font-semibold text-[#493326]">
                  {kasirAktif.id}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-1 border-b border-[#F3ECE4] pb-4 sm:flex-row">
                <p className="text-sm text-[#A18B78]">
                  Role
                </p>
                <p className="text-sm font-semibold capitalize text-[#493326]">
                  {kasirAktif.role}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-1 border-b border-[#F3ECE4] pb-4 sm:flex-row">
                <p className="text-sm text-[#A18B78]">
                  Status Akun
                </p>
                <span className="w-fit rounded-full bg-[#E5F3E9] px-3 py-1 text-xs font-semibold text-[#39754B]">
                  Aktif
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Tenant */}
        <section className="mt-6 rounded-2xl border border-[#EFE5D9] bg-white p-5 sm:p-8">
          <h3 className="font-bold text-[#493326]">
            Tenant yang Dikelola
          </h3>

          <p className="mt-1 text-sm text-[#A18B78]">
            Informasi tenant tempat kamu bertugas.
          </p>

          <div className="mt-5 rounded-xl bg-[#FAF7F2] p-5">
            <p className="text-xs text-[#A18B78]">
              Tenant Aktif
            </p>

            <h4 className="mt-2 text-xl font-extrabold text-[#493326]">
              Tenant {kasirAktif.tenantId}
            </h4>

            <p className="mt-2 text-sm leading-relaxed text-[#8D7969]">
              Kamu hanya bertugas mengelola pesanan dari tenant ini.
              Pesanan tenant lain tidak ditampilkan pada akunmu.
            </p>
          </div>
        </section>

        {/* Hak Akses */}
        <section className="mt-6 rounded-2xl border border-[#EFE5D9] bg-white p-5 sm:p-8">
          <h3 className="font-bold text-[#493326]">
            Hak Akses Kasir
          </h3>

          <p className="mt-1 text-sm text-[#A18B78]">
            Fitur yang tersedia untuk akun kasir.
          </p>

          <div className="mt-5 space-y-3">
            {[
              "Melihat pesanan tenant sendiri",
              "Mengonfirmasi pesanan pelanggan",
              "Menolak pesanan beserta alasan",
              "Mengubah status proses pesanan",
              "Menambahkan catatan pesanan",
              "Melihat riwayat transaksi tenant",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5F3E9] text-xs font-bold text-[#39754B]">
                  ✓
                </span>

                <p className="text-sm text-[#72543E]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tombol Aksi */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/kasir"
            className="flex flex-1 items-center justify-center rounded-xl bg-[#493326] px-5 py-3 font-semibold text-white transition hover:bg-[#604331]"
          >
            Kembali ke Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="flex flex-1 items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
          >
            Keluar dari Akun
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-[#B7A596]">
          JajanYuk · Panel Kasir
        </p>
      </div>
    </div>
  );
}
