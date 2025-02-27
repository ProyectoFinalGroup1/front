'use client'
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import LogOutButton from "./LogOutButton";

const Navbar = () => {
  const { userData } = useAuth();
  return (
    <header className="absolute inset-x-0 top-0 z-30 w-full py-3 bg-white bg-opacity-30 shadow-md">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <nav className="flex-1 flex justify-center gap-10">
            <Link
              aria-current="page"
              className="text-lg font-bold text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_black]"
              href="/"
            >
              Inicio
            </Link>
            <Link
              className="text-lg font-bold text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_black]"
              href="/nuestraempresa"
            >
              Nuestra Empresa
            </Link>
            <Link
              className="text-lg font-bold text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_black]"
              href="/obituarios"
            >
              Obituarios
            </Link>
            <Link
              className="text-lg font-bold text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-500 hover:text-gray-900 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_black]"
              href="/virgenmaria"
            >
              Virgen María De San Nicolás
            </Link>
          </nav>
          <div className="flex items-center">
            {
              userData?.token ? (
                <LogOutButton/>
              ) : (
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-green-800 px-4 py-2 text-lg font-bold text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_black]"
                  href="/login"
                >
                  Ingresar
                </Link>
              )
            }
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;