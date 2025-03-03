import React from 'react';

const NuestraEmpresaView = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-8
                    bg-[url('/images/fondo3.png')] bg-cover bg-center bg-fixed" >
      <div className="p-6 rounded-2xl max-w-2xl
                      bg-white bg-opacity-70 shadow-lg
                      text-center">

        <h1 className="text-4xl font-bold to-pink-400 mb-4">Nuestra Empresa</h1>
        <p className="text-lg text-gray-800">
          Somos una compañía comprometida con la innovación y la excelencia. Nuestro objetivo es ofrecer soluciones de calidad con un enfoque sustentable y vanguardista.
        </p>
      
      </div>
    
    </div>
  );
};

export default NuestraEmpresaView;
