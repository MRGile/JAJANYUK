import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import PortalSidebar from "@/components/ui/PortalSidebar";

const items = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Manajemen Tenant", href: "/admin/tenant", icon: Store },
  { label: "Manajemen Pengguna", href: "/admin/pengguna", icon: Users },
  { label: "Manajemen Pesanan", href: "/admin/pesanan", icon: ShoppingBag },
  {
    label: "Laporan & Statistik",
    href: "/admin/laporan",
    icon: ChartNoAxesCombined,
  },
];

export default function AdminSidebar() {
  return (
    <PortalSidebar
      homeHref="/admin"
      items={items}
      profileHref="/admin/profil"
      profileName="Admin Kantin"
      profileDescription="Profil Administrator"
    />
  );
}
