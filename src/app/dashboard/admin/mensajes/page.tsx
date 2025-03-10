'use client'
import { useState } from 'react';
import React from 'react'
import AdminVirgenView from '../../views/AdminVirgenView'


const Page = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 py-20">
      <h1 className="text-2xl font-bold mb-6">Gestión de mensajes</h1>

      {/* Sección Plegarias a la Virgen */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4">
        <h2
          className="text-xl font-semibold cursor-pointer flex justify-between items-center"
          onClick={() => toggleSection('virgen')}
        >
          Plegarias a la Virgen
          <span>{openSection === 'virgen' ? '▲' : '▼'}</span>
        </h2>
        {openSection === 'virgen' && <AdminVirgenView />}
      </div>

      {/* Sección Obituario */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2
          className="text-xl font-semibold cursor-pointer flex justify-between items-center"
          onClick={() => toggleSection('obituario')}
        >
          Obituario
          <span>{openSection === 'obituario' ? '▲' : '▼'}</span>
        </h2>
        {openSection === 'obituario' && <p>Mensajes de obituario aquí...</p>}
      </div>
    </div>
  );
};

export default Page;