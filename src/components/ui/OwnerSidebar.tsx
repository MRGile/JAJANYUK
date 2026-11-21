import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Package,
  ReceiptText,
} from "lucide-react";
import PortalSidebar from "@/components/ui/PortalSidebar";

const items = [
  { label: "Dashboard", href: "/owner", icon: LayoutDashboard },
  {
    label: "Laporan Keuangan",
    href: "/owner/laporan",
    icon: ChartNoAxesCombined,
  },
  { label: "Riwayat Transaksi", href: "/owner/transaksi", icon: ReceiptText },
  { label: "Manajemen Produk", href: "/owner/produk", icon: Package },
];

export default function OwnerSidebar() {
  return (
    <PortalSidebar
      homeHref="/owner"
      items={items}
      profileHref="/owner/profil"
      profileName="Owner Kantin"
      profileDescription="Pengaturan Profil"
    />
  );
}
