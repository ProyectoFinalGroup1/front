'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
     
      {/* Hero Section */}
      <div 
        className="relative flex-1 flex flex-col items-center justify-center text-center text-white px-6 pt-24"
        style={{ backgroundImage: "url('/images/fondo.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}
      >
      
        {/* Contenido */}
  <div className="relative flex flex-col items-center justify-end h-screen px-6 pb-16">
  <div className="z-10 max-w-2xl text-center bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
    <p className="text-xl font-medium leading-relaxed text-gray-900">
      Un momento triste e inevitable nos hace sentir desamparados.
    </p>
    <p className="text-xl font-medium leading-relaxed text-gray-900 mt-2">
      Por eso en Valle de Paz contamos con servicio de atención durante las 24hs del día.
    </p>
    <span className="block text-2xl font-semibold text-blue-600 mt-4">
      Llamando al 0800-333-8255 (VALLE) 
    </span>
  </div>
</div>



      </div>
    </div>
  );
}



// import React from 'react'

// const HomeViews = () => {
//   return (
//     <div>HomeViews</div>
//   )
// }

// export default HomeViews