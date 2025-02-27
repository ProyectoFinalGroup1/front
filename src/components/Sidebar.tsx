"use client"
import { Home, MessageSquare, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Inicio", icon: Home, href: "/" },
    { label: "Obituarios", icon: MessageSquare, href: "/dashboard/user/obituarios" },
    { label: "Donaciones", icon: DollarSign, href: "/dashboard/user/donaciones" }
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Panel de Usuario</h2>
      <nav className="flex-1">
        {menuItems.map(({ label, icon: Icon, href }) => (
          <Link key={label} href={href} className={`flex items-center p-3 rounded-lg transition-colors ${pathname === href ? "bg-gray-700" : "hover:bg-gray-800"}`}>
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
