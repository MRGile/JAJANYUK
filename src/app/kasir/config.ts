
export type KasirAccount = {
  id: string;
  nama: string;
  tenantId: string;
  role: "kasir";
};

export const kasirAktif: KasirAccount = {
  id: "KSR001",
  nama: "Kasir Tenant 2",
  tenantId: "2",
  role: "kasir",
};

export const daftarKasir: KasirAccount[] = [
  {
    id: "KSR001",
    nama: "Kasir Tenant 1",
    tenantId: "1",
    role: "kasir",
  },
  {
    id: "KSR002",
    nama: "Kasir Tenant 2",
    tenantId: "2",
    role: "kasir",
  },
  {
    id: "KSR003",
    nama: "Kasir Tenant 3",
    tenantId: "3",
    role: "kasir",
  },
  {
    id: "KSR004",
    nama: "Kasir Tenant 4",
    tenantId: "4",
    role: "kasir",
  },
];
