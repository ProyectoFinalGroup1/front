'use client'
import InhumadosList from '@/components/InhumadosList';
import React, { useState } from 'react';

const Obituarios = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-700 to-green-500 text-white flex flex-col items-center justify-center p-8">
      <div className="mt-12 bg-black bg-opacity-50 p-6 rounded-2xl shadow-lg max-w-4xl text-center w-full">
        <h1 className="text-4xl font-bold text-white mb-6">OBITUARIOS</h1>

      
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-lg text-black mb-4"
        />

        <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-md w-full">
          <InhumadosList searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default Obituarios;
























// import InhumadosList from '@/components/InhumadosList';
// import React from 'react';

// const Obituarios = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-700 to-green-500 text-white flex flex-col items-center justify-center p-8">
//       <div className="mt-12 bg-black bg-opacity-50 p-6 rounded-2xl shadow-lg max-w-4xl text-center w-full">
//         <h1 className="text-4xl font-bold text-fuchsia-400 mb-6">Obituarios</h1>
//         <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-md w-full">
//           <InhumadosList />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Obituarios;


