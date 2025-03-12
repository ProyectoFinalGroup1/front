"use client"
import { Home, Users, BookOpenText, Mail, HeartHandshake, Heart, Cross } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutButton from "./LogOutButton";

const AdminSidebar = () => {
  const pathname = usePathname();

 

  const menuItems = [
    { label: "Inicio", icon: Home, href: "/" }, 
    { label: "Usuarios", icon: Users, href: "/dashboard/admin/usuarios" }, 
    { label: "Inhumados", icon: BookOpenText, href: "/dashboard/admin/inhumados" }, 
    { label: "Vinculación", icon: Cross, href: "/dashboard/admin/userInhumado" }, 
    { label: "Mensajes Inhumados", icon: Mail, href: "/dashboard/admin/mensajes" }, 
    { label: "Plegarias a la Virgen", icon: Heart, href: "/dashboard/admin/mensajesVirgen" }, // Alternativa a HandsPraying
    { label: "Donaciones", icon: HeartHandshake, href: "/dashboard/admin/donaciones" }, 
  ];
  

  return (
    <aside 
    className="w-64 min-h-screen bg-clip-relleno text-white p-5 flex flex-col"
    style={{
      backgroundImage: "url(/images/flores.webp)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed" // Mantiene la imagen fija al hacer scroll
    }}>
      <h2 className="text-xl font-bold mb-6">Panel de Administrador</h2>
      <nav className="flex-1">
        {menuItems.map(({ label, icon: Icon, href }) => (
          <Link key={label} href={href} className={`flex items-center p-3 rounded-lg transition-colors ${pathname === href ? "bg-gray-700" : "hover:bg-gray-800"}`}>
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col mt-4">
        <LogOutButton />
      </div>
    </aside>
  );
};

export default AdminSidebar;
