import React from 'react';

const NuestraEmpresaView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-500 text-black flex flex-col items-center justify-center p-8">
      <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg max-w-2xl text-center">
        <h1 className="text-4xl font-bold to-pink-400 mb-4">Nuestra Empresa</h1>
        <p className="text-lg text-gray-800">
          Somos una compañía comprometida con la innovación y la excelencia. Nuestro objetivo es ofrecer soluciones de calidad con un enfoque sustentable y vanguardista.
        </p>
      </div>
    </div>
  );
};

export default NuestraEmpresaView;
