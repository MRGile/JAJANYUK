
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditProfilPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("jajanyuk-profile");

    if (saved) {
      try {
        const profile = JSON.parse(saved);

        setNama(profile.nama || "");
        setKelas(profile.kelas || "");
        setEmail(profile.email || "");
      } catch {
        setMessage("Data profil tidak dapat dibaca.");
      }
    }

    setLoaded(true);
  }, []);

  const saveProfile = () => {
    setMessage("");

    if (!nama.trim() || !kelas.trim()) {
      setMessage("Nama dan kelas wajib diisi.");
      return;
    }

    const profile = {
      nama: nama.trim(),
      kelas: kelas.trim(),
      email: email.trim(),
    };

    try {
      localStorage.setItem(
        "jajanyuk-profile",
        JSON.stringify(profile)
      );

      router.push("/pelanggan/profil");
    } catch {
      setMessage("Profil gagal disimpan. Silakan coba lagi.");
    }
  };

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] p-8 text-center text-[#806D5D]">
        Memuat profil...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-10 text-[#493326]">
      {/* Header */}
      <header className="border-b border-[#EFE5D9] bg-white px-5 py-5">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/pelanggan/profil"
            className="text-sm font-medium text-[#A18B78] transition hover:text-[#493326]"
          >
            ← Kembali ke Profil
          </Link>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D58B55]">
              Pengaturan Akun
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Edit Profil
            </h1>

            <p className="mt-1 text-sm text-[#9A8878]">
              Perbarui informasi pribadi akun JajanYuk kamu.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-5 py-7">
        {/* Form */}
        <div className="rounded-3xl border border-[#EFE5D9] bg-white p-6 shadow-sm">
          {/* Identitas */}
          <div className="mb-7 flex items-center gap-4 border-b border-[#F1EAE2] pb-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FAE9D8] text-2xl font-bold text-[#D98243]">
              {nama.trim().charAt(0).toUpperCase() || "S"}
            </div>

            <div>
              <h2 className="font-bold">Informasi Akun</h2>

              <p className="mt-1 text-xs text-[#9A8878]">
                Pastikan data yang dimasukkan sudah benar.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Nama */}
            <div>
              <label
                htmlFor="nama"
                className="mb-2 block text-sm font-semibold"
              >
                Nama Lengkap
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-xl border border-[#E9D9C8] bg-[#FFFEFC] px-4 py-3 text-sm outline-none transition placeholder:text-[#B7A99B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/15"
              />
            </div>

            {/* Kelas */}
            <div>
              <label
                htmlFor="kelas"
                className="mb-2 block text-sm font-semibold"
              >
                Kelas
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="kelas"
                type="text"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Contoh: XI RPL 1"
                className="w-full rounded-xl border border-[#E9D9C8] bg-[#FFFEFC] px-4 py-3 text-sm outline-none transition placeholder:text-[#B7A99B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/15"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full rounded-xl border border-[#E9D9C8] bg-[#FFFEFC] px-4 py-3 text-sm outline-none transition placeholder:text-[#B7A99B] focus:border-[#E99557] focus:ring-2 focus:ring-[#E99557]/15"
              />

              <p className="mt-2 text-xs text-[#A18B78]">
                Email bersifat opsional.
              </p>
            </div>
          </div>

          {/* Pesan Validasi */}
          {message && (
            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">{message}</p>
            </div>
          )}

          {/* Tombol */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
            <Link
              href="/pelanggan/profil"
              className="flex-1 rounded-xl border border-[#E9D9C8] bg-white px-4 py-3 text-center text-sm font-semibold text-[#806D5D] transition hover:bg-[#FAF7F2]"
            >
              Batal
            </Link>

            <button
              type="button"
              onClick={saveProfile}
              className="flex-1 rounded-xl bg-[#E99557] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D98243]"
            >
              Simpan Profil
            </button>
          </div>
        </div>

        {/* Informasi */}
        <div className="mt-5 rounded-2xl bg-[#F0E8DE] p-5">
          <p className="text-sm font-bold text-[#493326]">
            Informasi
          </p>

          <p className="mt-1 text-xs leading-6 text-[#806D5D]">
            Nama dan kelas wajib diisi agar informasi pemesanan
            dapat tercatat dengan benar.
          </p>
        </div>
      </section>
    </main>
  );
}
