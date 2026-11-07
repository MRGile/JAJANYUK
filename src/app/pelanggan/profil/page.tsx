
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Profile = {
  nama: string;
  kelas: string;
  email: string;
};

export default function ProfilPage() {
  const pathname = usePathname();

  const [profile, setProfile] = useState<Profile>({
    nama: "Nama Siswa",
    kelas: "Belum diisi",
    email: "Belum diisi",
  });

  useEffect(() => {
    const saved = localStorage.getItem("jajanyuk-profile");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setProfile({
          nama: parsed.nama || "Nama Siswa",
          kelas: parsed.kelas || "Belum diisi",
          email: parsed.email || "Belum diisi",
        });
      } catch {
        // Gunakan profil awal jika data tidak valid.
      }
    }
  }, []);

  const initial = profile.nama.trim().charAt(0).toUpperCase() || "S";

  const navItems = [
    {
      label: "Beranda",
      href: "/pelanggan/dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="m3 10 9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 9v11h14V9M9 20v-7h6v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Tenant",
      href: "/pelanggan/tenant",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 10h18l-2-7H5l-2 7Z" strokeLinejoin="round" />
          <path d="M5 10v11h14V10M9 21v-7h6v7M3 10c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Keranjang",
      href: "/pelanggan/keranjang",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </svg>
      ),
    },
    {
      label: "Pesanan",
      href: "/pelanggan/pesanan",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 5h12M8 12h12M8 19h12" strokeLinecap="round" />
          <path d="M3 5h.01M3 12h.01M3 19h.01" strokeLinecap="round" strokeWidth="3" />
        </svg>
      ),
    },
    {
      label: "Profil",
      href: "/pelanggan/profil",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#493326]">
      {/* Header */}
      <header className="border-b border-[#EFE5D9] bg-white px-5 py-5">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/pelanggan/dashboard"
            className="text-sm font-medium text-[#A18B78] transition hover:text-[#493326]"
          >
            ← Kembali ke Beranda
          </Link>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D58B55]">
              Akun Pelanggan
            </p>

            <h1 className="mt-2 text-2xl font-bold">Profil Saya</h1>

            <p className="mt-1 text-sm text-[#9A8878]">
              Kelola informasi akun JajanYuk kamu.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl space-y-5 px-5 py-7">
        {/* Kartu Profil */}
        <div className="overflow-hidden rounded-3xl bg-[#493326] shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/20 bg-[#E99557] text-3xl font-bold text-white">
                {initial}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-white">
                  {profile.nama}
                </h2>

                <p className="mt-1 text-sm text-[#E6D5C5]">
                  {profile.kelas}
                </p>

                <span className="mt-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-[#F4E7DA]">
                  Pelanggan JajanYuk
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white/10 px-6 py-4">
            <p className="text-sm text-[#E6D5C5]">
              Informasi akun kamu
            </p>

            <Link
              href="/pelanggan/profil/edit"
              className="rounded-xl bg-[#E99557] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#D98243]"
            >
              Edit Profil
            </Link>
          </div>
        </div>

        {/* Informasi Pribadi */}
        <div className="rounded-3xl border border-[#EFE5D9] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-base font-bold">Informasi Pribadi</h2>

            <p className="mt-1 text-sm text-[#9A8878]">
              Data identitas akun pelanggan.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <div className="border-b border-[#F1EAE2] pb-4">
              <p className="text-xs font-medium text-[#A18B78]">
                Nama Lengkap
              </p>
              <p className="mt-2 text-sm font-semibold">{profile.nama}</p>
            </div>

            <div className="border-b border-[#F1EAE2] pb-4">
              <p className="text-xs font-medium text-[#A18B78]">Kelas</p>
              <p className="mt-2 text-sm font-semibold">{profile.kelas}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#A18B78]">Email</p>
              <p className="mt-2 break-all text-sm font-semibold">
                {profile.email}
              </p>
            </div>
          </div>

          <Link
            href="/pelanggan/profil/edit"
            className="mt-6 block rounded-xl border border-[#E9D9C8] bg-[#FAF7F2] py-3 text-center text-sm font-semibold text-[#806D5D] transition hover:bg-[#FAF1E7]"
          >
            Ubah Informasi Profil
          </Link>
        </div>

        {/* Menu Akun */}
        <div className="rounded-3xl border border-[#EFE5D9] bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold">Menu Akun</h2>

          <p className="mt-1 text-sm text-[#9A8878]">
            Akses informasi aktivitas akun kamu.
          </p>

          <div className="mt-5 divide-y divide-[#F1EAE2]">
            <Link
              href="/pelanggan/riwayat"
              className="flex items-center justify-between py-4 transition hover:text-[#D98243]"
            >
              <div>
                <p className="text-sm font-semibold">Riwayat Pesanan</p>
                <p className="mt-1 text-xs text-[#A18B78]">
                  Lihat pesanan yang sudah selesai atau ditolak.
                </p>
              </div>
              <span className="text-lg text-[#D98243]">→</span>
            </Link>

            <Link
              href="/pelanggan/keranjang"
              className="flex items-center justify-between py-4 transition hover:text-[#D98243]"
            >
              <div>
                <p className="text-sm font-semibold">Keranjang Saya</p>
                <p className="mt-1 text-xs text-[#A18B78]">
                  Lihat menu yang ingin kamu pesan.
                </p>
              </div>
              <span className="text-lg text-[#D98243]">→</span>
            </Link>
          </div>
        </div>

        {/* Informasi Aplikasi */}
        <div className="rounded-2xl bg-[#F0E8DE] p-5">
          <p className="text-sm font-bold text-[#493326]">JajanYuk</p>

          <p className="mt-1 text-xs leading-5 text-[#806D5D]">
            Sistem pemesanan kantin sekolah yang membantu proses pemesanan
            menjadi lebih mudah dan praktis.
          </p>
        </div>
      </section>

      {/* Navigasi Bawah */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#EFE5D9] bg-white/95 px-2 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl justify-around">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/pelanggan/dashboard" &&
                pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex min-w-0 flex-col items-center gap-1 text-[11px] transition ${
                  active
                    ? "font-bold text-[#D98243]"
                    : "text-[#A18B78] hover:text-[#493326]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
