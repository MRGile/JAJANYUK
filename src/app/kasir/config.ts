
export type KasirAccount = {
  id: string;
  nama: string;
  tenantId: string;
  role: "kasir";
};

export const kasirAktif: KasirAccount = {
  id: "",
  nama: "Kasir",
  tenantId: "",
  role: "kasir",
};

export const daftarKasir: KasirAccount[] = [];
