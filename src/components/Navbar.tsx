'use client'
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Iconos de menú

const Navbar = () => {
  const { userData } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Ocultar Navbar en estas rutas estáticas
  const hiddenRoutes = [
    "/dashboard/user/donaciones",
    "/dashboard/user/obituarios",
    "/dashboard/user/misdatos",
    "/dashboard/admin/usuarios",
    "/dashboard/admin/inhumados",
    "/dashboard/admin/mensajes",
    "/dashboard/admin/mensajesVirgen",
    "/dashboard/admin/donaciones",
    "/dashboard/admin/inhumados/altaInhumado", 
  ];

  // Ocultar Navbar en rutas dinámicas
  const dynamicRoutes = [
    /^\/dashboard\/admin\/usuarios\/detalle\/[a-f0-9-]+$/,
    /^\/dashboard\/admin\/usuarios\/editar\/[a-f0-9-]+$/,
    /^\/dashboard\/admin\/inhumados\/detalle\/[a-f0-9-]+$/,
    /^\/dashboard\/admin\/inhumados\/editar\/[a-f0-9-]+$/
  ];
  
  // Verificar si la ruta actual coincide con alguna de las rutas ocultas
  const isDynamicRoute = dynamicRoutes.some(pattern => pattern.test(pathname));

  if (hiddenRoutes.includes(pathname) || isDynamicRoute) return null;

  return (
    <header className="absolute inset-x-0 top-0 z-30 w-full py-2 bg-white bg-opacity-30 shadow-md">
      <div className="px-4 flex items-center justify-between">
        
        {/* Botón de menú en móviles */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menú de navegación */}
        <nav className={`absolute md:static top-12 left-0 w-full bg-white bg-opacity-90 md:bg-transparent p-2 md:p-0 flex flex-col md:flex-row md:items-center justify-between md:justify-evenly transition-all duration-300 ${isOpen ? "block" : "hidden md:flex"}`}>
          <Link className="text-lg font-bold text-gray-800 rounded-xl px-4 py-1 transition-all duration-200 hover:bg-green-800 hover:text-white text-shadow-md stroke-black" href="/">Inicio</Link>
          <Link className="text-lg font-bold text-gray-800 rounded-xl px-4 py-1 transition-all duration-200 hover:bg-green-800 hover:text-white text-shadow-md stroke-black" href="/nuestraempresa">Nuestra Empresa</Link>
          <Link className="text-lg font-bold text-gray-800 rounded-xl px-4 py-1 transition-all duration-200 hover:bg-green-800 hover:text-white text-shadow-md stroke-black" href="/obituarios">Obituarios</Link>
          <Link className="text-lg font-bold text-gray-800 rounded-xl px-4 py-1 transition-all duration-200 hover:bg-green-800 hover:text-white text-shadow-md stroke-black" href="/virgenmaria">Virgen María De San Nicolás</Link>
        </nav>

        {/* Botón de perfil o login */}
        <div className="flex items-center">
          {userData?.token ? (
            userData?.user?.isAdmin ? (
              <Link className="inline-flex items-center justify-center rounded-lg bg-green-800 px-3 py-1 text-md font-bold text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900 text-shadow-md stroke-black whitespace-nowrap" href="/dashboard/admin">Perfil Admin.</Link>
            ) : (
              <Link className="inline-flex items-center justify-center rounded-xl bg-green-800 px-3 py-1 text-lg font-bold text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900 text-shadow-md stroke-black" href="/dashboard/user">Perfil</Link>
            )
          ) : (
            <Link className="inline-flex items-center justify-center rounded-xl bg-green-800 px-3 py-1 text-lg font-bold text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900 text-shadow-md stroke-black" href="/login">Ingresar</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;



