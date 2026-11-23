
"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  price: string;
  cost: string | null;
  stock: number;
  trackStock: boolean | null;
  imageUrl: string | null;
  available: boolean;
};

type ProductForm = {
  name: string;
  category: string;
  description: string;
  price: string;
  cost: string;
  stock: string;
};

const blankForm: ProductForm = {
  name: "",
  category: "Makanan",
  description: "",
  price: "",
  cost: "",
  stock: "",
};

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function OwnerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("semua");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(blankForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadProducts() {
    try {
      const response = await fetch("/api/owner/products", {
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal memuat produk.");
      }

      setProducts(result.data || []);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Gagal memuat produk."
      );
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  const visible = useMemo(() => {
    return products.filter((item) => {
      const matchQuery = `${item.name} ${item.category || ""}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchCategory =
        category === "semua" || item.category === category;

      return matchQuery && matchCategory;
    });
  }, [products, query, category]);

  const categories = useMemo(
    () => [...new Set(products.map((item) => item.category).filter(Boolean))],
    [products]
  );

  function openAdd() {
    setEditing(null);
    setForm(blankForm);
    setPhoto(null);
    setPreview("");
    setMessage("");
    setModal(true);
  }

  function openEdit(item: Product) {
    setEditing(item.id);
    setForm({
      name: item.name,
      category: item.category || "Makanan",
      description: item.description || "",
      price: String(item.price),
      cost: item.cost || "",
      stock: item.trackStock ? String(item.stock) : "",
    });
    setPhoto(null);
    setPreview(item.imageUrl || "");
    setMessage("");
    setModal(true);
  }

  function selectPhoto(file?: File) {
    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowed.includes(file.type)) {
      setMessage("Gunakan foto JPG, PNG, WEBP, atau AVIF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Ukuran foto maksimal 5 MB.");
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      let imageUrl = preview.startsWith("https://") ? preview : null;

      if (photo) {
        const uploadForm = new FormData();
        uploadForm.append("file", photo);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error || "Upload foto gagal.");
        }

        imageUrl = uploadResult.url;
      }

      const payload = {
        ...form,
        price: Number(form.price),
        cost: form.cost === "" ? null : Number(form.cost),
        stock: form.stock === "" ? null : Number(form.stock),
        imageUrl,
      };

      const response = await fetch(
        editing
          ? `/api/owner/products/${editing}`
          : "/api/owner/products",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan produk.");
      }

      setModal(false);
      setPhoto(null);
      setPreview("");
      setMessage("Produk berhasil disimpan.");
      await loadProducts();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Gagal menyimpan produk."
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: Product) {
    if (!window.confirm(`Hapus produk ${item.name}?`)) return;

    try {
      const response = await fetch(
        `/api/owner/products/${item.id}`,
        { method: "DELETE" }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus produk.");
      }

      setMessage("Produk berhasil dihapus.");
      await loadProducts();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Gagal menghapus produk."
      );
    }
  }

  if (!loaded) {
    return <p className="rounded-xl bg-white p-6">Memuat produk...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Manajemen Produk
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Kelola menu makanan dan minuman tenant kamu.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-600"
        >
          Tambah Produk
        </button>
      </div>

      {message && (
        <p
          role="status"
          className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-slate-800"
        >
          {message}
        </p>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama produk..."
            className="rounded-lg border border-gray-300 px-3 py-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2"
          >
            <option value="semua">Semua kategori</option>
            {categories.map((item) => (
              <option key={item} value={item!}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <p className="font-semibold text-slate-800">
              Belum ada produk
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Tambahkan produk pertama tenant kamu.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Stok</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {visible.map((item) => (
                  <tr key={item.id}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500">
                            Foto
                          </div>
                        )}

                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="max-w-xs truncate text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">{item.category || "-"}</td>
                    <td className="p-3">{rupiah(Number(item.price))}</td>
                    <td className="p-3">
                      {item.trackStock ? item.stock : "Tanpa batas"}
                    </td>
                    <td className="p-3">
                      {item.available ? "Tersedia" : "Habis"}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => openEdit(item)}
                        className="mr-3 font-semibold text-amber-800 underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(item)}
                        className="font-semibold text-rose-700 underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 id="product-title" className="text-lg font-bold">
                {editing ? "Edit Produk" : "Tambah Produk"}
              </h2>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="rounded-lg px-3 py-1 hover:bg-gray-100"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Nama produk
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>

              <label className="text-sm font-medium">
                Kategori
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                >
                  <option>Makanan</option>
                  <option>Minuman</option>
                  <option>Camilan</option>
                  <option>Lainnya</option>
                </select>
              </label>

              <label className="text-sm font-medium sm:col-span-2">
                Deskripsi
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  rows={3}
                />
              </label>

              <label className="text-sm font-medium">
                Harga jual
                <input
                  required
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>

              <label className="text-sm font-medium">
                Harga modal
                <input
                  type="number"
                  min="0"
                  value={form.cost}
                  onChange={(e) =>
                    setForm({ ...form, cost: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>

              <label className="text-sm font-medium sm:col-span-2">
                Stok
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                  placeholder="Kosongkan jika tidak memakai stok"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">
                  Foto produk
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={(e) => selectPhoto(e.target.files?.[0])}
                    className="mt-2 block w-full text-sm"
                  />
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Format JPG, PNG, WEBP, atau AVIF. Maksimal 5 MB.
                </p>

                {preview && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs text-gray-500">
                      Pratinjau foto
                    </p>
                    <img
                      src={preview}
                      alt="Pratinjau produk"
                      className="h-36 w-36 rounded-xl border border-gray-200 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-bold text-slate-950 disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Produk"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
