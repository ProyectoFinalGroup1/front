'use client';
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Estado para el modo oscuro (inicialmente null para evitar problemas en SSR)
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Leer localStorage solo en el cliente
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
  }, []);

  // Guardar cambios en localStorage cuando darkMode cambie
  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem("darkMode", darkMode.toString());
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`flex-1 p-6 transition-all ${
          darkMode ? "bg-gray-900 text-blue-400" : "bg-gray-100 text-black"
        }`}
      >
        {/* Botón de Modo Claro/Oscuro con el texto al lado */}
        <div className="flex justify-end items-center mb-4 space-x-2">
          <span className="font-medium">
            {darkMode ? "Modo Oscuro 🌙" : "Modo Claro 🌞"}
          </span>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`relative w-14 h-7 rounded-full transition-all ${
              darkMode ? "bg-gray-600" : "bg-yellow-300"
            }`}
          >
            <span
              className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>
        {/* Contenido de la página */}
        {children}
      </main>
    </div>
  );
};

export default UserDashboardLayout;







