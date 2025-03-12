'use client'
// import { useState } from 'react';
import React from 'react'
import AdminPublicacionesView from '../../views/AdminPublicacionesView';


const page = () => {
  return (
  
    <AdminPublicacionesView />
    
  )
}

export default page;


// const Page = () => {
//   const [openSection, setOpenSection] = useState<string | null>(null);

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-6">Gestión de Publicaciones</h1>
//       {/* Sección Obituario */}
//       <div className="w-full max-w-md rounded-lg shadow-md p-4">
//         <h2
//           className="text-xl font-semibold cursor-pointer flex justify-between items-center"
//           onClick={() => toggleSection('obituario')}
//         >
//           Obituario
//           <span>{openSection === 'obituario' ? '▲' : '▼'}</span>
//         </h2>
//         {openSection === 'obituario' && <AdminPublicacionesView />}
        
//       </div>
//     </div>
//   );
// };
