"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const destinations: Record<string, string> = {
  admin: "/admin",
  owner: "/owner",
  kasir: "/kasir",
  pelanggan: "/pelanggan/dashboard",
};

export default function MasukPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login gagal.");
      router.replace(destinations[result.data.role] || "/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Login gagal.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-5 py-10 text-[#493326]">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-[#EEE5DA] bg-white p-7 shadow-sm sm:p-9">
        <Link href="/" className="text-2xl font-black">Jajan<span className="text-[#E99557]">Yuk.</span></Link>
        <h1 className="mt-8 text-2xl font-extrabold">Masuk</h1>
        <p className="mt-2 text-sm text-[#8D7969]">Gunakan akun yang terdaftar di database.</p>
        <label className="mt-6 block text-sm font-semibold">Email
          <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E9DED2] px-4 py-3 outline-none focus:border-[#E99557]" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Password
          <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E9DED2] px-4 py-3 outline-none focus:border-[#E99557]" />
        </label>
        {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
        <button disabled={submitting} className="mt-6 w-full rounded-xl bg-[#493326] px-4 py-3 font-bold text-white transition hover:bg-[#624735] disabled:opacity-60">
          {submitting ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </main>
  );
}
