import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">JajanYuk</h1>

      <p className="mt-3 text-gray-500">
        Sistem Pemesanan Makanan Kantin Sekolah
      </p>

      <Link
        href="/pelanggan/dashboard"
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
      >
        Masuk ke JajanYuk
      </Link>
    </main>
  );
}
