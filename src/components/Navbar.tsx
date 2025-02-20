import Link from "next/link";

import React from "react";


const Navbar = () => {
  return (
    <header className="inset-x-0 top-0 z-30 w-full py-3 backdrop-blur-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <nav className="flex-1 flex justify-center gap-10">
            <Link
              aria-current="page"
              className="text-lg font-bold text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900 "
              href="#"
            >
              Inicio
            </Link>
            <Link
              className="text-lg font-bold text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900"
              href="#"
            >
              Nuestra Empresa
            </Link>
            <Link
              className="text-lg font-bold  text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900"
              href="#"
            >
              Obituarios
            </Link>
            <Link
              className="text-lg font-bold text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900"
              href="#"
            >
              Virgen Ma. De San Nicolás
            </Link>
          </nav>
          <div className="flex items-center">
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-green-800 px-4 py-2 text-lg font-bold text-white shadow-sm transition-all duration-150 hover:bg-green-500  hover:text-gray-900"
              href="/login"
            >
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
