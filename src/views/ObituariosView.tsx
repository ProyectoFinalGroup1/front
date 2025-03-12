'use client'
import InhumadosList from '@/components/InhumadosList';
import React, { useState } from 'react';

const Obituarios = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center px-4 py-8 md:px-8"
      style={{ backgroundImage: 'url(/images/fondo8.png)' }}
    >
      <div className="mt-12 bg-black bg-opacity-50 p-4 md:p-6 rounded-2xl shadow-lg max-w-lg md:max-w-4xl text-center w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">OBITUARIOS</h1>

        {/* Input de búsqueda */}
        <div className="w-full flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 md:p-3 rounded-lg text-black text-sm md:text-base"
          />
        </div>

        {/* Contenedor de resultados */}
        <div className="bg-white bg-opacity-10 p-4 md:p-6 rounded-xl shadow-md w-full mt-4 md:mt-6">
          <InhumadosList searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default Obituarios;






















